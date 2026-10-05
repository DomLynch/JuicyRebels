import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('artifacts/public',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,headless:true,args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],results=[];
try{
 const ctx=await browser.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true});const page=await ctx.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('https://degree-choice.com/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__juicy);
 assert.equal(await page.title(),'Juicy Rebels — A little garden adventure');
 const meta=await page.evaluate(async()=>await(await fetch('./release.json')).json());assert.equal(meta.release_id,process.env.EXPECTED_RELEASE);
 await page.locator('#play').click();await page.waitForFunction(()=>window.__juicy.snapshot().started);
 const snap=()=>page.evaluate(()=>window.__juicy.snapshot());
 const advance=async seconds=>{const end=(await snap()).simTime+seconds;await page.waitForFunction(t=>window.__juicy.snapshot().simTime>=t||!window.__juicy.snapshot().started,end,{timeout:20000});};
 const center=async id=>{const b=await page.locator(id).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
 const move=await center('#move'),fire=await center('#fire-right'),radius=await page.locator('#move').evaluate(e=>e.getBoundingClientRect().width*.37),cdp=await ctx.newCDPSession(page);
 const touch=async(type,points=[])=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([id,x,y])=>({id,x,y,radiusX:4,radiusY:4,force:1}))});
 await touch('touchStart',[[1,move.x,move.y],[2,fire.x,fire.y]]);
 for(let i=0;i<700;i++){
  const s=await snap();if(!s.started)break;
  const live=s.targets.filter(t=>t.hp>0).sort((a,b)=>Math.hypot(a.x-s.x,a.z-s.z)-Math.hypot(b.x-s.x,b.z-s.z));
  if(live[0]){const t=live[0],dx=t.x-s.x,dz=t.z-s.z,d=Math.hypot(dx,dz),x=dx/d,z=dz/d,sx=x*Math.cos(s.cameraYaw)-z*Math.sin(s.cameraYaw),sy=(x*Math.sin(s.cameraYaw)+z*Math.cos(s.cameraYaw))*s.verticalScale,len=Math.hypot(sx,sy),r=radius*(.13+.87*(d>2.5?.16:.025));await touch('touchMove',[[1,move.x+sx/len*r,move.y+sy/len*r],[2,fire.x,fire.y]]);}
  await advance(.1);
  if(i===15)await page.screenshot({path:'artifacts/public/fight.png'});
 }
 await touch('touchEnd',[]);let s=await snap();assert.equal(s.phase,'won');assert.equal(s.rescued,12);assert.equal(s.garden.wins,1);assert.equal(s.fireCount,0);
 await page.locator('#buy-flowers').click();assert.equal((await snap()).appearance.flowers,true);await page.reload();await page.waitForFunction(()=>window.__juicy);assert.equal((await snap()).appearance.flowers,true);assert.equal((await snap()).garden.wins,1);
 await page.screenshot({path:'artifacts/public/garden.png'});results.push('Exact release opens over public HTTPS; actual two-finger 3-wave victory; earned seeds buy flowers and persist through public reload');
 await page.goto('https://degree-choice.com/?lab=1');await page.waitForFunction(()=>window.__combat?.snapshot().started);assert.equal(await page.title(),'Mobile Combat Prototype');assert.ok(page.url().endsWith('/lab.html'));results.push('Public lab regression route opens correctly');
 await page.goto('https://degree-choice.com/archive/combat-18/');await page.waitForFunction(()=>window.__combat?.snapshot().started);assert.equal(await page.title(),'Mobile Combat Prototype');results.push('Exact original public archive still opens after Juicy activation');
 assert.deepEqual(errors,[]);await writeFile('artifacts/public/result.json',JSON.stringify({pass:true,release:meta,results,errors,mission:s},null,2));console.log(JSON.stringify({pass:true,results}));await ctx.close();
}finally{await browser.close();}
