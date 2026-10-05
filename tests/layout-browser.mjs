import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
await mkdir('artifacts/layout',{recursive:true});
const server=spawn(process.execPath,['server.mjs'],{env:{...process.env,PORT:'4189'},stdio:'pipe'});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
let browser;
const errors=[],results=[];
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox','--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const ctx=await browser.newContext({viewport:{width:844,height:390},hasTouch:true,isMobile:true});
 const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto(process.env.JUICY_TEST_URL||'http://127.0.0.1:4189/');await page.waitForFunction(()=>window.__juicy);
 const cdp=await ctx.newCDPSession(page);
 const card=await page.locator('.garden-card').boundingBox(),x=card.x+card.width*.8,y=card.y+card.height-25;
 assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).touchAction),'pan-y');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x,y}]});
 for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x,y:y-i*20}]});await page.waitForTimeout(35);}
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(300);
 await page.screenshot({path:'artifacts/layout/swipe-diagnostic.png'});
 console.log(JSON.stringify(await page.locator('.garden-card').evaluate(e=>({scrollTop:e.scrollTop,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,action:getComputedStyle(e).touchAction}))));
 assert.ok(await page.locator('.garden-card').evaluate(e=>e.scrollTop)>50,'actual finger swipe scrolls garden menu');
 await page.screenshot({path:'artifacts/layout/menu-scrolled.png'});results.push('Actual touch swipe scrolls short landscape menu to shop');
 for(const [name,width,height] of [['portrait',390,844],['landscape',844,390],['tablet',1024,768],['desktop',1100,760]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(200);await page.locator('.garden-card').evaluate(e=>e.scrollTop=0);
  const b=await page.locator('.garden-card').boundingBox();assert.ok(b.x>=0&&b.y>=0&&b.x+b.width<=width+1&&b.y+b.height<=height+1);
  await page.screenshot({path:`artifacts/layout/home-${name}.png`});
  await page.locator('#play').click();await page.waitForFunction(()=>window.__juicy.snapshot().started);
  assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).touchAction),'none');
  for(const id of ['#move','#fire-right','#reload','#swap','#assist','#effects','#sound','#reset']){const q=await page.locator(id).boundingBox();assert.ok(q&&q.x>=0&&q.y>=0&&q.x+q.width<=width+1&&q.y+q.height<=height+1,id+' fits '+name);}
  await page.screenshot({path:`artifacts/layout/play-${name}.png`});await page.locator('#reset').click();
 }
 assert.deepEqual(errors,[]);results.push('Home card and gameplay controls fit portrait/landscape/tablet/desktop; gameplay disables native gestures; no console errors');
 await writeFile('artifacts/layout/result.json',JSON.stringify({pass:true,results,errors},null,2));console.log(JSON.stringify({pass:true,results}));await ctx.close();
}finally{if(browser)await browser.close();server.kill();}
