import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
await mkdir('artifacts/juicy',{recursive:true});
const server=spawn(process.execPath,['server.mjs'],{env:{...process.env,PORT:'4188'},stdio:'pipe'});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
let browser;
const receipts=[],errors=[];
try {
 browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true,args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const ctx=await browser.newContext({viewport:{width:1100,height:760},hasTouch:true,deviceScaleFactor:1,recordVideo:{dir:'artifacts/juicy/video',size:{width:1100,height:760}}});
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const url=process.env.JUICY_TEST_URL||'http://127.0.0.1:4188/';
 await page.goto(url,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__juicy);
 const snap=()=>page.evaluate(()=>window.__juicy.snapshot());
 const advance=async seconds=>{const end=(await snap()).simTime+seconds;await page.waitForFunction(t=>window.__juicy.snapshot().simTime>=t||!window.__juicy.snapshot().started,end,{timeout:20000});};
 const center=async id=>{const b=await page.locator(id).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
 const cdp=await ctx.newCDPSession(page);
 const touch=async(type,points=[])=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([id,x,y])=>({id,x,y,radiusX:4,radiusY:4,force:1}))});
 const shotSamples=[];
 const observe=()=>page.evaluate(()=>{window.__samples=[];window.__observe=()=>{const s=window.__juicy.snapshot();if(s.started)window.__samples.push({hp:s.hp,wave:s.wave,hits:s.hits,shots:s.shots,weapon:s.weapon,level:s.effects.level,recoil:s.effects.recoil,hold:s.effects.hold,particles:s.effects.activeParticles,camera:s.effects.cameraAmplitude,drawCalls:s.drawCalls});window.__observer=requestAnimationFrame(window.__observe);};window.__observer=requestAnimationFrame(window.__observe);});
 await observe();
 assert.equal(await page.title(),'Juicy Rebels — A little garden adventure');assert.equal((await snap()).phase,'garden');assert.equal(await page.locator('#next-adventure').isEnabled(),false);
 await page.screenshot({path:'artifacts/juicy/01-home.png'});
 receipts.push('New branding/metadata/icon/manifest and garden menu render; next adventure starts locked');
 await page.locator('#play').click();await advance(.15);
 // Reload is triggered through a real depleted magazine and two simultaneous fingers.
 let move=await center('#move'),fire=await center('#fire-right');
 await touch('touchStart',[[1,move.x,move.y],[2,fire.x,fire.y]]);await advance(.4);await touch('touchEnd',[]);
 assert.ok((await snap()).shots>0);await page.locator('#reload').click();assert.ok((await snap()).reloading>0);await advance(1.45);assert.equal((await snap()).ammo,30);
 await page.locator('#swap').click();await advance(.3);assert.equal((await snap()).weapon,'PISTOL');
 // Aim from the actual rendered target locations; no mission-state injection.
 async function fightDesktop() {
   await page.keyboard.down('Space');
   for(let i=0;i<550;i++) {
     const s=await snap();if(!s.started)break;
     const live=s.targets.filter(t=>t.hp>0).sort((a,b)=>Math.hypot(a.x-s.x,a.z-s.z)-Math.hypot(b.x-s.x,b.z-s.z));
     if(live[0]) await page.mouse.move(live[0].screenX,live[0].screenY);
     await advance(.12);
     if(i===15){await page.screenshot({path:'artifacts/juicy/02-desktop-fight.png'});await page.locator('#swap').click();}
   }
   await page.keyboard.up('Space');
   assert.equal((await snap()).phase,'won','desktop wins through actual aim/fire');
 }
 await fightDesktop();let s=await snap();assert.equal(s.garden.wins,1);assert.equal(s.rescued,12);assert.ok(s.garden.seeds>=20);
 const earned=s.garden.seeds;await page.waitForTimeout(350);assert.equal((await snap()).garden.seeds,earned);
 await page.screenshot({path:'artifacts/juicy/03-victory.png'});
 receipts.push('Actual desktop aim/fire with Blueberry and Peach clears 3 waves/12 creatures; real reload; victory rewards once');
 await page.locator('#buy-flowers').click();assert.equal((await snap()).appearance.flowers,true);const seeds=(await snap()).garden.seeds;
 shotSamples.push(...await page.evaluate(()=>window.__samples));await page.reload();await page.waitForFunction(()=>window.__juicy);await observe();s=await snap();assert.equal(s.garden.seeds,seeds);assert.equal(s.garden.wins,1);assert.equal(s.appearance.flowers,true);
 receipts.push('Earned seeds buy visible wildflowers; exact seeds, win and appearance persist after page reload');
 await page.setViewportSize({width:844,height:390});await page.locator('#play').click();await advance(.15);
 move=await center('#move');fire=await center('#fire-right');const radius=await page.locator('#move').evaluate(e=>e.getBoundingClientRect().width*.37);
 const start=await snap();
 await touch('touchStart',[[1,move.x,move.y],[2,fire.x,fire.y]]);
 for(let i=0;i<700;i++) {
   s=await snap();if(!s.started)break;
   const live=s.targets.filter(t=>t.hp>0).sort((a,b)=>Math.hypot(a.x-s.x,a.z-s.z)-Math.hypot(b.x-s.x,b.z-s.z));
   if(live[0]) {
     const t=live[0],dx=t.x-s.x,dz=t.z-s.z,d=Math.hypot(dx,dz),x=dx/d,z=dz/d;
     const sx=x*Math.cos(s.cameraYaw)-z*Math.sin(s.cameraYaw),sy=(x*Math.sin(s.cameraYaw)+z*Math.cos(s.cameraYaw))*s.verticalScale,len=Math.hypot(sx,sy);
     const strength=d>2.5?.16:.025,r=radius*(.13+.87*strength);
     await touch('touchMove',[[1,move.x+sx/len*r,move.y+sy/len*r],[2,fire.x,fire.y]]);
   }
   await advance(.1);
   if(i===20)await page.screenshot({path:'artifacts/juicy/04-two-finger-fight.png'});
 }
 await touch('touchEnd',[]);s=await snap();assert.equal(s.phase,'won','two-finger left aim + FIRE clears actual mission');assert.ok(Math.hypot(s.x-start.x,s.z-start.z)>.2);assert.equal(s.fireCount,0);assert.equal(s.moveHeld,false);assert.equal(s.garden.wins,2);assert.equal(await page.locator('#next-adventure').isEnabled(),true);
 assert.ok(Math.abs(s.bodyYaw-s.legsYaw)<1e-5&&Math.abs(s.bodyYaw-s.torsoYaw)<1e-5);
 receipts.push('Rendered two-finger movement/targeting and held FIRE wins; full-body facing; independent release; second adventure unlocks after 2 wins');
 await page.locator('#buy-lantern').click();assert.equal((await snap()).appearance.lantern,true);
 await page.locator('#next-adventure').click();await advance(.2);assert.equal((await snap()).adventure,1);assert.equal((await snap()).mobs[0].maxHp,75);
 await fightDesktop();s=await snap();assert.equal(s.garden.wins,3);
 await page.locator('#buy-outfit').click();assert.equal((await snap()).appearance.outfit,true);
 shotSamples.push(...await page.evaluate(()=>window.__samples));await page.reload();await page.waitForFunction(()=>window.__juicy);await observe();s=await snap();assert.deepEqual(s.appearance,{flowers:true,lantern:true,outfit:true});
 await page.screenshot({path:'artifacts/juicy/05-grown-garden.png'});
 receipts.push('Peach Grove launches with tougher creatures and bonus seeds; lantern and berry outfit purchased with earned seeds, visibly saved after reload');
 // Losing through actual idle contact, with no test-only setters.
 await page.locator('#play').click();await advance(.15);const wins=(await snap()).garden.wins,lossSeeds=(await snap()).garden.seeds;
 for(let i=0;i<650&&(await snap()).started;i++)await advance(.1);
 s=await snap();assert.equal(s.phase,'lost');assert.equal(s.hp,0);assert.equal(s.garden.wins,wins);assert.equal(s.garden.seeds,lossSeeds);
 await page.screenshot({path:'artifacts/juicy/06-loss.png'});await page.locator('#play').click();await advance(.2);assert.equal((await snap()).hp,100);assert.equal((await snap()).wave,1);
 receipts.push('Real enemy contact causes loss with no rewards; retry starts fresh health, time and wave');
 // High/Off impact and both weapon cadences, with real firing.
 await page.keyboard.down('Space');for(let i=0;i<25;i++){s=await snap();const t=s.targets.find(t=>t.hp>0);if(t)await page.mouse.move(t.screenX,t.screenY);await advance(.08);}await page.keyboard.up('Space');
 await page.locator('#effects').click();await page.locator('#effects').click();assert.equal((await snap()).effects.level,'off');await page.keyboard.down('Space');await advance(.3);await page.keyboard.up('Space');s=await snap();assert.equal(s.effects.recoil,0);assert.equal(s.effects.activeParticles,0);assert.equal(s.effects.cameraAmplitude,0);
 await page.locator('#effects').click();assert.equal((await snap()).effects.level,'high');
 const samples=[...shotSamples,...await page.evaluate(()=>window.__samples)];
 await writeFile('artifacts/juicy/impact-samples.json',JSON.stringify(samples,null,2));
 console.log(JSON.stringify({maxCamera:Math.max(...samples.map(s=>s.camera)),maxParticles:Math.max(...samples.map(s=>s.particles))}));
 assert.ok(samples.some(s=>s.level==='high'&&s.recoil>.5));assert.ok(samples.some(s=>s.level==='high'&&s.hold>0&&s.particles>0&&s.camera>3));assert.ok(samples.every(s=>s.particles<=48&&s.camera<=8+1e-9));
 await writeFile('artifacts/juicy/impact-samples.json',JSON.stringify(samples,null,2));
 receipts.push('Universal High recoil/impact hold/burst/camera observed during real hits; Off zeros them; fixed 48-particle capacity');
 for(const [name,width,height] of [['portrait',390,844],['tablet',1024,768],['landscape',844,390]]) {
   await page.setViewportSize({width,height});await page.waitForTimeout(150);s=await snap();assert.equal(s.fireCount,0);assert.equal(s.moveHeld,false);
   for(const id of ['#move','#fire-right','#reload','#swap','#assist','#effects','#sound']) {const b=await page.locator(id).boundingBox();assert.ok(b&&b.x>=0&&b.y>=0&&b.x+b.width<=width+1&&b.y+b.height<=height+1,id+' fits '+name);}
   await page.screenshot({path:`artifacts/juicy/07-${name}.png`});
 }
 receipts.push('Portrait/landscape/tablet controls fit; resize cancels held input');
 const blocked=await browser.newContext({viewport:{width:390,height:844}});
 await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage disabled');}});});
 const bp=await blocked.newPage();bp.on('pageerror',e=>errors.push(e.message));await bp.goto(url);await bp.waitForFunction(()=>window.__juicy);assert.equal(await bp.evaluate(()=>window.__juicy.snapshot().storageAvailable),false);assert.match(await bp.locator('#save-note').textContent(),/cannot save/);await bp.locator('#play').click();await bp.waitForFunction(()=>window.__juicy.snapshot().started);await blocked.close();
 receipts.push('Unavailable local storage shows warning and still starts gameplay');
 assert.deepEqual(errors,[]);
 await writeFile('artifacts/juicy/browser-result.json',JSON.stringify({pass:true,receipts,errors,snapshot:await snap(),maxDrawCalls:Math.max(...samples.map(s=>s.drawCalls))},null,2));console.log(JSON.stringify({pass:true,receipts},null,2));await ctx.close();
} finally {if(browser)await browser.close();server.kill();}
