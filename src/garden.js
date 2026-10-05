export const CREATURES = {
  hopper: { name: 'Berry bandit', hp: 50, speed: 1.35, damage: 8, color: '#ba78db' },
  snail: { name: 'Jam snail', hp: 100, speed: 0.55, damage: 12, color: '#e8a054' },
  skitter: { name: 'Leaf rascal', hp: 75, speed: 1.1, damage: 7, color: '#73bca0' },
};
export const SHOP = [
  { id: 'flowers', name: 'Wildflower patch', cost: 15, kind: 'plant' },
  { id: 'lantern', name: 'Peach lantern', cost: 25, kind: 'decoration' },
  { id: 'outfit', name: 'Berry jacket', cost: 30, kind: 'outfit' },
];
export function readGarden(raw) {
  try {
    const value = JSON.parse(raw);
    return { seeds: Math.max(0, Math.min(99999, Math.floor(Number(value.seeds) || 0))),
      wins: Math.max(0, Math.min(9999, Math.floor(Number(value.wins) || 0))),
      owned: SHOP.filter(item => Array.isArray(value.owned) && value.owned.includes(item.id)).map(item => item.id) };
  } catch { return { seeds: 0, wins: 0, owned: [] }; }
}
export function purchase(garden, id) {
  const item = SHOP.find(item => item.id === id);
  if (!item || garden.owned.includes(id) || garden.seeds < item.cost) return false;
  garden.seeds -= item.cost; garden.owned.push(id); return true;
}
export class GardenMission {
  constructor(garden = readGarden(null)) { this.garden = garden; this.phase = 'garden'; this.mobs = []; this.adventure = 0; this.run = 0; }
  start(adventure = 0) {
    if (adventure > 0 && this.garden.wins < 2) return false;
    this.adventure = adventure > 0 ? 1 : 0; this.run++; this.phase = 'playing'; this.remaining = 90;
    this.hp = 100; this.wave = 0; this.rescued = 0; this.reward = 0; this.spawnWave(); return true;
  }
  spawnWave() {
    this.wave++;
    const types = ['hopper', 'snail', 'skitter', this.wave % 2 ? 'hopper' : 'skitter'];
    const positions = [[-4,-5],[4,-5],[-6,2],[6,2]];
    this.mobs = types.map((type,i) => ({ id: `${this.run}-${this.wave}-${i}`, type, ...CREATURES[type],
      x: positions[i][0], z: positions[i][1], maxHp: CREATURES[type].hp, attack: 0, age: i * 0.7, hp: CREATURES[type].hp + (this.adventure ? 25 : 0) }));
    for (const mob of this.mobs) mob.maxHp = mob.hp;
  }
  tick(dt, px, pz) {
    if (this.phase !== 'playing') return;
    dt = Math.max(0, Math.min(dt, 0.05)); this.remaining = Math.max(0, this.remaining - dt);
    if (!this.remaining) { this.phase = 'lost'; return; }
    for (const mob of this.mobs) {
      if (mob.hp <= 0) continue;
      mob.age += dt; mob.attack = Math.max(0, mob.attack - dt);
      const dx = px - mob.x, dz = pz - mob.z, d = Math.hypot(dx,dz), speed = mob.speed * (this.adventure ? 1.15 : 1);
      if (d > 1) {
        let vx = dx / d, vz = dz / d;
        if (mob.type === 'hopper') { const hop = Math.sin(mob.age * 5) > -0.2 ? 1.6 : 0.2; vx *= hop; vz *= hop; }
        if (mob.type === 'skitter') { const side = Math.sin(mob.age * 2.7) * 0.8; vx += -dz / d * side; vz += dx / d * side; }
        mob.x = Math.max(-12, Math.min(12, mob.x + vx * speed * dt)); mob.z = Math.max(-12, Math.min(12, mob.z + vz * speed * dt));
      } else if (!mob.attack) { this.hp = Math.max(0, this.hp - mob.damage); mob.attack = 1.1; }
    }
    if (!this.hp) this.phase = 'lost';
  }
  hit(index, damage) {
    const mob = this.mobs[index];
    if (this.phase !== 'playing' || !mob || mob.hp <= 0) return null;
    mob.hp = Math.max(0, mob.hp - Math.max(0, damage));
    if (!mob.hp) this.rescued++;
    return { killed: !mob.hp, x: mob.x, z: mob.z };
  }
  completeWave() {
    if (this.phase !== 'playing' || this.mobs.some(mob => mob.hp > 0)) return false;
    if (this.wave < 3) { this.spawnWave(); return true; }
    this.phase = 'won'; this.reward = 20 + (this.adventure ? 10 : 0) + Math.floor(this.remaining / 10);
    this.garden.seeds = Math.min(99999, this.garden.seeds + this.reward); this.garden.wins = Math.min(9999, this.garden.wins + 1); return true;
  }
  home() { this.phase = 'garden'; this.mobs = []; }
}
