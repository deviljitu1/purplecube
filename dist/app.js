/* All interactions stay in the browser. Contact comes from the supplied HTML prototype. */
const CONTACT_NUMBER = '919111190181';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$('#year').textContent = new Date().getFullYear();
$$('.button[data-enquiry], #personal-enquiry, #whatsapp-link').forEach(button=>{
  const icon=document.createElement('img');icon.src='assets/whatsapp.svg';icon.alt='';icon.width=24;icon.height=24;
  $('span',button).replaceChildren(icon);
});

// A small, dependency-free mesh renderer. The objects are illustrative concepts.
const TAU = Math.PI * 2;
function surface(fn, nu = 48, nv = 36, color = '#b485df') {
  const faces = [];
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const u = i / nu, v = j / nv;
    faces.push({ points: [fn(u, v), fn(u + 1 / nu, v), fn(u + 1 / nu, v + 1 / nv), fn(u, v + 1 / nv)], color, band: j % 2 ? 0.97 : 1 });
  }
  return faces;
}
function sphere(x, y, z, rx, ry, rz, color) {
  return surface((u, v) => { const a = u * TAU, b = v * Math.PI; return [x + Math.cos(a) * Math.sin(b) * rx, y + Math.cos(b) * ry, z + Math.sin(a) * Math.sin(b) * rz]; }, 24, 16, color);
}
function box(x, y, z, w, h, d, color) {
  const p = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(([a,b,c]) => [x+a*w/2,y+b*h/2,z+c*d/2]);
  return [[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[1,5,6,2],[0,3,7,4]].map(ids => ({points:ids.map(i=>p[i]),color,band:1}));
}
function vase(color = '#b485df', small = false) {
  return surface((u,v) => {
    const a = u * TAU, y = (v-.5)*2.65;
    const base = .38 + .43*Math.pow(Math.sin(v*Math.PI),1.3) + .20*Math.pow(v,6);
    const r = base + .065*Math.sin(a*12 + v*4.3);
    return [r*Math.cos(a),y,r*Math.sin(a)];
  }, small ? 48 : 84, small ? 38 : 64, color).concat(surface((u,v) => {
    const a=u*TAU, r=(.58+.065*Math.sin(a*12+4.3))*(1-v*.13);
    return [r*Math.cos(a),1.325-v*.15,r*Math.sin(a)];
  },48,4,'#76518f'));
}
function knot(color='#cea3d7', small=false) {
  return surface((u,v)=>{
    const t=u*TAU, a=v*TAU;
    const centre=q=>[(1+.27*Math.cos(3*q))*Math.cos(2*q), (1+.27*Math.cos(3*q))*Math.sin(2*q), .4*Math.sin(3*q)];
    const p=centre(t), next=centre(t+.001);
    let tangent=next.map((n,i)=>n-p[i]); const length=Math.hypot(...tangent); tangent=tangent.map(n=>n/length);
    let n=[-tangent[1],tangent[0],0];const nl=Math.hypot(...n); n=n.map(x=>x/nl);
    const b=[tangent[1]*n[2]-tangent[2]*n[1],tangent[2]*n[0]-tangent[0]*n[2],tangent[0]*n[1]-tangent[1]*n[0]];
    return p.map((x,i)=>x+.22*(Math.cos(a)*n[i]+Math.sin(a)*b[i]));
  },small?64:100,small?12:20,color);
}
function architecture(color='#b9b6cf') {
  let faces=box(0,-1,0,2.6,.15,1.8,color);
  for(let i=0;i<4;i++) {
    const x=(i-1.5)*.51, h= .8 + (i===1?1.45:i===2?1.05:.2);
    faces.push(...box(x,-.9+h/2,0,.43,h,.8,color));
    for(let k=0;k<Math.floor(h/.19);k++)faces.push(...box(x,-.82+k*.19,.406,.34,.035,.012,'#625470'));
  }
  return faces;
}
function penStand(){return surface((u,v)=>{const a=u*TAU,r=.68+.025*Math.cos(a*20);return[r*Math.cos(a),(v-.5)*1.65,r*Math.sin(a)];},48,38,'#91a59a').concat(surface((u,v)=>{const a=u*TAU,r=.66-v*.11;return[r*Math.cos(a),.825-v*.3,r*Math.sin(a)];},48,4,'#586a61'));}
function organiser(){let f=box(0,-.6,0,2.1,.15,1.2,'#d9bb99');f.push(...box(-.7,-.1,0,.13,1.1,1.2,'#d9bb99'),...box(.2,-.1,0,.13,1.1,1.2,'#d9bb99'),...box(-.25,-.1,-.55,1,1.1,.1,'#d9bb99'),...box(-.25,-.1,.55,1,1.1,.1,'#d9bb99'),...box(.7,-.4,.55,.8,.4,.1,'#c5a989'),...box(1,-.4,0,.1,.4,1.2,'#c5a989'));return f;}
function miniature(color='#d3b8ce'){return [...sphere(0,.75,0,.45,.48,.44,color),...sphere(0,-.25,0,.47,.65,.32,color),...sphere(-.51,-.25,0,.15,.43,.18,color),...sphere(.51,-.25,0,.15,.43,.18,color),...box(-.23,-.95,.03,.32,.5,.4,color),...box(.23,-.95,.03,.32,.5,.4,color),...box(0,-1.25,0,1.5,.12,1.1,'#80708b')];}
function ganpati(){const c='#d2b28d';let f=[...sphere(0,-.3,0,.63,.65,.48,c),...sphere(0,.52,.02,.4,.43,.4,c),...sphere(-.48,.4,0,.3,.4,.14,c),...sphere(.48,.4,0,.3,.4,.14,c),...sphere(-.54,-.78,.2,.43,.2,.31,c),...sphere(.54,-.78,.2,.43,.2,.31,c)];for(let i=0;i<8;i++)f.push(...sphere(.12*Math.sin(i*.4),.43-i*.1,.39+i*.03,.13-i*.007,.14,.12,c));f.push(...box(0,-1,0,1.8,.13,1.2,'#9f7b60'));return f;}
const rgbCache=new Map();
function rgb(hex){if(!rgbCache.has(hex))rgbCache.set(hex,hex.replace('#','').match(/../g).map(n=>parseInt(n,16)));return rgbCache.get(hex);}
function drawMesh(canvas,faces,yaw,scale=1,opacity=1){
  const ctx=canvas.getContext('2d');const w=canvas.width,h=canvas.height;
  if(!w||!h)return;
  ctx.clearRect(0,0,w,h); ctx.globalAlpha=opacity;
  const base=Math.min(w,h)*.285*scale;
  const shadow=ctx.createRadialGradient(w*.5,h*.82,0,w*.5,h*.82,base*1.2);
  shadow.addColorStop(0,'#00000075');shadow.addColorStop(1,'#00000000');
  ctx.save();ctx.translate(0,h*.82);ctx.scale(1,.2);ctx.translate(0,-h*.82);ctx.fillStyle=shadow;ctx.fillRect(0,0,w,h*3);ctx.restore();
  const cy=Math.cos(yaw),sy=Math.sin(yaw),tilt=.24,ct=Math.cos(tilt),st=Math.sin(tilt);
  const rotate=([x,y,z])=>{const xx=x*cy+z*sy,zz=-x*sy+z*cy;return [xx,y*ct-zz*st,y*st+zz*ct];};
  const polygons=faces.map(face=>{const pts=face.points.map(rotate);return{...face,pts,z:pts.reduce((s,p)=>s+p[2],0)/pts.length};}).sort((a,b)=>a.z-b.z);
  for(const face of polygons){
    const p=face.pts,a=p[1].map((n,i)=>n-p[0][i]),b=p[2].map((n,i)=>n-p[0][i]);
    let normal=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
    const nl=Math.hypot(...normal)||1;normal=normal.map(n=>n/nl);
    if(normal[2]<0)normal=normal.map(n=>-n);
    const light=Math.max(0,normal[0]*-.55+normal[1]*.65+normal[2]*.6);
    const rim=Math.pow(Math.max(0,1-normal[2]),3)*.16;
    const shine=Math.pow(light,18)*.28;
    const shade=(.34+light*.62+rim+shine)*face.band;
    const color=rgb(face.color).map(n=>Math.min(255,Math.round(n*shade+shine*65)));
    ctx.fillStyle=`rgb(${color.join(',')})`;ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.55;
    ctx.beginPath();p.forEach(([x,y,z],i)=>{const perspective=5/(5-z*.24);const px=w/2+x*base*perspective,py=h*.49-y*base*perspective;i?ctx.lineTo(px,py):ctx.moveTo(px,py);});ctx.closePath();ctx.fill();ctx.stroke();
  }
  ctx.globalAlpha=1;
}
function sizeCanvas(canvas){const r=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,1.5);canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);}
const staticScenes=[];
function addScene(canvas,faces,yaw=-.45,scale=1){const scene={canvas,faces,yaw,scale};staticScenes.push(scene);sizeCanvas(canvas);drawMesh(canvas,faces,yaw,scale);return scene;}
const products=[
  {name:'Sculptural vases',category:'space',desc:'A little statement for your space',model:()=>vase('#b79bcc',true)},
  {name:'Pen stands',category:'desk',desc:'A home for your everyday tools',model:penStand},
  {name:'Ganpati idols',category:'space',desc:'Tradition, in a new dimension',model:ganpati},
  {name:'Fidgets & playful things',category:'play',desc:'Curiosity you can hold',model:()=>knot('#a4bba4',true)},
  {name:'Desk organisers',category:'desk',desc:'A little order. A lot of character.',model:organiser},
  {name:'Personalised miniatures',category:'models',desc:'Small scale. Big personality.',model:miniature},
  {name:'Architectural models',category:'models',desc:'Your vision, made tangible',model:architecture}
];
products.forEach((product,index)=>{
  const card=document.createElement('article');card.className='product-card';card.dataset.category=product.category;
  card.innerHTML=`<div class="product-visual"><span class="product-number">OBJECT / 0${index+1}</span><span class="product-badge">CONCEPT</span><canvas aria-label="${product.name} concept render"></canvas><button class="product-arrow" aria-label="Enquire about ${product.name}">↗</button></div><div class="product-info"><div><h3>${product.name}</h3><p>${product.desc}</p></div><span>↗</span></div>`;
  $('#product-grid').append(card);addScene($('canvas',card),product.model(),-.5,.92);
  $('button',card).addEventListener('click',()=>openEnquiry(`Hi Purple Cube! I'm interested in ${product.name.toLowerCase()}. Could you share available designs, sizes, colours and pricing?`));
});
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  $$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button);});
  $$('.product-card').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);
  redrawStatic();
}));
addScene($('#corporate-canvas'),architecture('#b4a7c7'),-.65,1.05);
const miniatureScene=addScene($('#miniature-canvas'),miniature('#b289cc'),-.35,1);
function redrawStatic(){staticScenes.forEach(scene=>{if(scene.canvas.getBoundingClientRect().width){sizeCanvas(scene.canvas);drawMesh(scene.canvas,scene.faces,scene.yaw,scene.scale);}});}

// Slides crossfade both the copy and the rendered object; manual control remains available.
const heroObjects=$$('.hero-cube');
let slide=0,oldSlide=0,paused=reducedMotion.matches,lastAdvance=performance.now(),heroVisible=true;
function setSlide(next){
  next=(next+3)%3;if(next===slide)return;oldSlide=slide;slide=next;lastAdvance=performance.now();
  $$('.slide-copy').forEach((el,i)=>{el.classList.toggle('leaving',i===oldSlide);el.classList.toggle('active',i===slide);el.inert=i!==slide;el.setAttribute('aria-hidden',i!==slide);});
  $$('.slide-tabs button').forEach((b,i)=>{b.classList.toggle('active',i===slide);b.setAttribute('aria-pressed',i===slide);});
  $('.slide-current').textContent=`0${slide+1}`;
  heroObjects.forEach((object,i)=>{object.classList.toggle('current-object',i===slide);object.classList.toggle('outgoing-object',i===oldSlide);object.setAttribute('aria-hidden',i!==slide);});
}
$$('.slide-tabs button').forEach((b,i)=>b.addEventListener('click',()=>setSlide(i)));
$('#previous-slide').addEventListener('click',()=>setSlide(slide-1));$('#next-slide').addEventListener('click',()=>setSlide(slide+1));
function syncPause(){const b=$('#pause-slides');b.textContent=paused?'▷':'Ⅱ';b.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');}
$('#pause-slides').addEventListener('click',()=>{paused=!paused;lastAdvance=performance.now();syncPause();});syncPause();
$('.hero-art').addEventListener('pointermove',e=>{if(reducedMotion.matches)return;const r=e.currentTarget.getBoundingClientRect();$('.cube-stage').style.setProperty('--parallax-x',`${((e.clientX-r.left)/r.width-.5)*16}px`);$('.cube-stage').style.setProperty('--parallax-y',`${((e.clientY-r.top)/r.height-.5)*16}px`);});
$('.hero-art').addEventListener('pointerleave',()=>{ $('.cube-stage').style.setProperty('--parallax-x','0px');$('.cube-stage').style.setProperty('--parallax-y','0px');});
new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;if(heroVisible)lastAdvance=performance.now();}).observe($('.hero'));
document.addEventListener('visibilitychange',()=>lastAdvance=performance.now());
reducedMotion.addEventListener('change',()=>{paused=reducedMotion.matches;syncPause();});
setInterval(()=>{if(!heroVisible||document.hidden||paused||reducedMotion.matches)return;if(performance.now()-lastAdvance>5000)setSlide(slide+1);},250);
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(redrawStatic,150);});

const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#navigation').classList.toggle('open',open);});
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#navigation').classList.remove('open');}
$$('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

// Personalisation preview: no files, upload controls, storage or submission endpoint.
let selectedColor='Purple',personalMode='name';
$('#custom-name').addEventListener('input',e=>$('#name-preview').textContent=e.target.value.trim()||'YOUR NAME');
$$('.swatch').forEach(b=>b.addEventListener('click',()=>{selectedColor=b.getAttribute('aria-label');$$('.swatch').forEach(s=>{s.classList.toggle('selected',s===b);s.setAttribute('aria-pressed',s===b);});$('.name-tag').style.setProperty('--tag',b.dataset.color);$('#name-preview').style.color=selectedColor==='Purple'?'#fff':'#392340';}));
$('#custom-size').addEventListener('change',e=>{const size={Small:'.85',Medium:'1',Large:'1.1'}[e.target.value];$('.name-tag').style.scale=size;});
$$('[data-personal]').forEach(b=>b.addEventListener('click',()=>{personalMode=b.dataset.personal;$$('[data-personal]').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',t===b);});$('#name-options').hidden=personalMode!=='name';$('#miniature-options').hidden=personalMode==='name';$('#keychain-scene').hidden=personalMode!=='name';$('#miniature-preview').hidden=personalMode==='name';if(personalMode==='miniature')redrawStatic();}));
$('#miniature-type').addEventListener('change',e=>{const solo=miniature('#b289cc');miniatureScene.faces=e.target.value.startsWith('Solo')?solo:[...solo.map(f=>({...f,points:f.points.map(([x,y,z])=>[x*.7-.52,y*.7,z*.7])})),...solo.map(f=>({...f,color:'#d4a4b9',points:f.points.map(([x,y,z])=>[x*.7+.52,y*.7,z*.7])}))];redrawStatic();});
$('#personal-enquiry').addEventListener('click',()=>openEnquiry(personalMode==='name'?`Hi Purple Cube! I'd like a personalised name keepsake.\nName: ${$('#custom-name').value.trim()||'[please add name]'}\nColour: ${selectedColor}\nSize preference: ${$('#custom-size').value}\nPlease share available dimensions, design options and pricing.`:`Hi Purple Cube! I'm interested in a ${$('#miniature-type').value.toLowerCase()}. Could we discuss the style, size, photo requirements and pricing?`));
const dialog=$('#enquiry-dialog');let enquiryTrigger;
function updateWhatsApp(){const message=$('#enquiry-message').value.trim();$('#whatsapp-link').href=`https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message||'Hi Purple Cube! I would like to discuss a project.')}`;}
function openEnquiry(message){enquiryTrigger=document.activeElement;$('#enquiry-message').value=message;updateWhatsApp();dialog.showModal();document.body.classList.add('modal-open');$('.dialog-close').focus();}
$$('[data-enquiry]').forEach(b=>b.addEventListener('click',()=>openEnquiry(b.dataset.enquiry)));
$('#enquiry-message').addEventListener('input',updateWhatsApp);$('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');enquiryTrigger?.focus();});
