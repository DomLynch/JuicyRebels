import test from 'node:test';
import assert from 'node:assert/strict';
import { GardenMission, readGarden, purchase } from '../src/garden.js';

test('garden save tolerates malformed data and filters unknown purchases', () => {
  assert.deepEqual(readGarden('bad'), {seeds:0,wins:0,owned:[]});
  assert.deepEqual(readGarden('{"seeds":-20,"wins":2,"owned":["flowers","fake","flowers"]}'), {seeds:0,wins:2,owned:['flowers']});
});
test('three cleared waves pay once and replay starts a fresh mission', () => {
  const m=new GardenMission();m.start();
  for(let wave=0;wave<3;wave++) {for(let i=0;i<4;i++)m.hit(i,1000);assert.ok(m.completeWave());}
  assert.equal(m.phase,'won');assert.equal(m.rescued,12);assert.equal(m.garden.wins,1);
  const seeds=m.garden.seeds;assert.equal(m.completeWave(),false);assert.equal(m.garden.seeds,seeds);
  m.start();assert.equal(m.wave,1);assert.equal(m.rescued,0);assert.equal(m.hp,100);
});
test('timeout and enemy contact lose without rewards', () => {
  const m=new GardenMission();m.start();m.remaining=0.01;m.tick(0.05,0,3);assert.equal(m.phase,'lost');assert.equal(m.garden.seeds,0);
  m.start();m.hp=1;m.tick(0.05,m.mobs[0].x,m.mobs[0].z);assert.equal(m.phase,'lost');assert.equal(m.completeWave(),false);
});
test('purchases are affordable, single-use and survive serialized save', () => {
  const g={seeds:25,wins:2,owned:[]};assert.equal(purchase(g,'outfit'),false);assert.equal(purchase(g,'flowers'),true);assert.equal(g.seeds,10);
  assert.equal(purchase(g,'flowers'),false);assert.equal(purchase(g,'fake'),false);assert.deepEqual(readGarden(JSON.stringify(g)),g);
});
test('next adventure requires two wins and enemy motion has three patterns', () => {
  const m=new GardenMission();assert.equal(m.start(1),false);m.start();
  const before=m.mobs.map(t=>({x:t.x,z:t.z}));m.tick(0.05,0,3);
  for(let i=0;i<3;i++)assert.ok(Math.hypot(m.mobs[i].x-before[i].x,m.mobs[i].z-before[i].z)>0);
  assert.equal(new Set(m.mobs.map(t=>t.type)).size,3);m.garden.wins=2;assert.equal(m.start(1),true);assert.equal(m.adventure,1);assert.equal(m.mobs[0].hp,75);
});
