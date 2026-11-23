import{b as ne,s as R,p as me}from"./scramble-GtI9-QmC.js";/* empty css            *//* empty css                   */import{A as he}from"./image-fi06kI0a.js";import{a as X,p as J,g as L,S as I,i as _e,b as fe,d as G}from"./cursor-DxAx9OWq.js";import{L as ve}from"./lenis-9qxpAu3p.js";import{c as z,s as j,w as E,p as N,a as ge,t as ye,r as $e,b as ke}from"./content-CBJzVLUT.js";import{A as oe}from"./engine-EGzP4374.js";import{r as we}from"./scenes-Dnl_Gz_b.js";const c=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),T=e=>String(e).padStart(2,"0"),O=(e,t="")=>e.map(s=>`<span class="line ${t}"><span>${c(s)}</span></span>`).join("");function be(e){return z[e].nav.map((t,s)=>`<a href="#${t.id}" data-nav="${t.id}"><span class="nav__idx">${T(s+1)}</span><span data-scramble>${t.label}</span></a>`).join("")}function Se(e){const t=z[e],s=t.nav[0];return`
  <section class="hero" id="top" data-section>
    <div class="hero__inner">
      <p class="kicker" data-reveal><span class="kicker__dot"></span>${c(t.heroKicker)}</p>
      <h1 class="hero__title" data-reveal="lines">${O(t.heroLines)}</h1>
      <p class="hero__sub" data-reveal>${c(t.heroSub)}</p>
      <div class="hero__cta" data-reveal>
        <a class="btn btn--solid" href="#${s.id}" data-nav="${s.id}"><span data-scramble>${e==="pro"?"看看作品":"读点文字"}</span><span class="btn__arrow">↓</span></a>
        <a class="btn" href="#contact" data-nav="contact"><span data-scramble>${e==="pro"?"聊聊合作":"打个招呼"}</span><span class="btn__arrow">↗</span></a>
      </div>
    </div>
    ${X(t.heroNote,0,"hero__note")}
    <div class="hero__foot">
      <span class="mono">30.27°N 120.15°E · ${j.city}</span>
      <span class="hero__scroll mono"><span class="hero__scroll-line"></span>向下滚动</span>
      <span class="mono" data-clock>--:--:--</span>
    </div>
  </section>`}function xe(e){const t=z[e],s=t.chapters.length;return`
  <section class="story" id="story" style="--chapters:${s}" data-section>
    <div class="story__sticky">
      <div class="story__head">
        <span class="kicker"><span class="kicker__dot"></span>${c(t.storyLabel)}</span>
        <span class="mono story__count"><span data-story-idx>01</span> / ${T(s)}</span>
      </div>
      <div class="story__year mono" data-story-year>${t.chapters[0].year}</div>
      <div class="story__text">
        <h2 class="story__title" data-story-title>${c(t.chapters[0].title)}</h2>
        <p class="story__body" data-story-body>${c(t.chapters[0].body)}</p>
      </div>
      <ol class="story__rail">
        ${t.chapters.map((a,o)=>`<li class="${o===0?"is-on":""}"><span class="mono">${a.year}</span></li>`).join("")}
      </ol>
      ${X(t.chapters[0].note,1,"story__note")}
    </div>
  </section>`}function Le(e){const s=(e==="pro"?["小而完整","small & complete","从草图到上线","sketch → ship","404 不是错误","not found, still building"]:["也许找不到","maybe not found","也没关系","and that's okay","慢慢发生","let it unfold"]).map(a=>`<span>${c(a)}</span><span class="tape__sep">✳</span>`).join("");return`<div class="tape" aria-hidden="true"><div class="tape__track">${s}${s}${s}</div></div>`}function Ee(e,t){return`
  <li class="work__row" data-reveal style="--i:${t}">
    <a href="#/work/${e.slug}" data-work="${e.slug}" data-cursor="打开">
      <span class="work__idx mono">${T(t+1)}</span>
      <span class="work__title"><span data-scramble>${c(e.title)}</span></span>
      <span class="work__desc">${c(e.desc)}</span>
      <span class="work__meta mono">${c(e.kind)} · ${e.year}</span>
      <span class="work__arrow" aria-hidden="true">→</span>
    </a>
  </li>`}function Me(){return`
  <section class="section work" id="work" data-section>
    <div class="sec-head">
      <p class="kicker" data-reveal><span class="kicker__dot"></span>精选作品 · 2024—2026</p>
      <h2 class="sec-title" data-reveal="lines">${O(["作品"])}<em class="sec-title__en">selected work</em></h2>
      <p class="sec-lead" data-reveal>开源工具、小 App、设计练习。都是一个人从头做到尾的东西。</p>
    </div>
    <ol class="work__list">${E.map(Ee).join("")}</ol>
    <div class="work__preview" aria-hidden="true"><canvas></canvas><span class="work__preview-tag mono"></span></div>
    ${X(`把光标放在某一行上
字符会变成它的样子`,2,"work__note")}
  </section>`}function qe(e,t){return`
  <li class="post-row" data-reveal style="--i:${t}">
    <a href="#/post/${e.slug}" data-cursor="阅读" ${e.en?'lang="en"':""}>
      <span class="post-row__date mono">${e.date}</span>
      <span class="post-row__title ${e.en?"is-en":""}">${c(e.title)}</span>
      <span class="post-row__min mono">${e.min} ${e.en?"min":"分钟"}</span>
    </a>
  </li>`}function Te(e){const t=N[e];return`
  <section class="section writing" id="writing" data-section>
    <div class="sec-head">
      <p class="kicker" data-reveal><span class="kicker__dot"></span>${e==="pro"?"文章 · 关于做东西":"文字 · 慢慢写"}</p>
      <h2 class="sec-title" data-reveal="lines">${O([e==="pro"?"文章":"文字"])}<em class="sec-title__en">${e==="pro"?"notes":"writing"}</em></h2>
    </div>
    <ol class="post-list">${t.map(qe).join("")}</ol>
  </section>`}function Ae(){return`
  <section class="section photos" id="photos" data-section>
    <div class="sec-head">
      <p class="kicker" data-reveal><span class="kicker__dot"></span>照片 · 大部分都糊了</p>
      <h2 class="sec-title" data-reveal="lines">${O(["照片"])}<em class="sec-title__en">photographs</em></h2>
      <p class="sec-lead" data-reveal>先以字符的样子出现。把光标移上去，照片会在那一小圈里显影。</p>
    </div>
    <div class="photos__grid">
      ${ge.map((e,t)=>`
        <figure class="photo" data-reveal style="--i:${t}; --ratio:${e.ratio}">
          <canvas class="photo__canvas" data-scene="${e.scene}" data-cursor="显影"></canvas>
          <figcaption><span>${c(e.caption)}</span><span class="mono">${c(e.place)} · ${T(t+1)}</span></figcaption>
        </figure>`).join("")}
    </div>
    ${X("示意图，等真照片",1,"photos__note")}
  </section>`}function Ce(e){const t=ke[e],s=e==="pro"?ye.map(a=>`<div class="about__group"><h3 class="mono">${c(a.group)}</h3><ul>${a.items.map(o=>`<li>${c(o)}</li>`).join("")}</ul></div>`).join(""):`<div class="about__group about__group--wide"><h3 class="mono">在读 / 常去</h3><ul class="reading">${$e.map(a=>`<li>${a.href?`<a href="${a.href}" target="_blank" rel="noopener">`:"<span>"}<span class="reading__type mono">${c(a.type)}</span><span>${c(a.title)}</span><span class="reading__by">${c(a.by)}</span>${a.href?"</a>":"</span>"}</li>`).join("")}</ul></div>`;return`
  <section class="section about" id="about" data-section>
    <p class="kicker" data-reveal><span class="kicker__dot"></span>关于</p>
    <div class="about__grid">
      <h2 class="about__lines" data-reveal="lines">${O(t.lines)}</h2>
      <div class="about__body">
        ${t.body.map(a=>`<p data-reveal>${c(a)}</p>`).join("")}
        <div class="about__now" data-reveal>
          <h3 class="mono"><span class="pulse"></span>现在</h3>
          <ul>${t.now.map(a=>`<li>${c(a)}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <div class="about__side" data-reveal>${s}</div>
  </section>`}function Pe(e){const t=z[e];return`
  <section class="contact" id="contact" data-section>
    <p class="kicker" data-reveal><span class="kicker__dot"></span>${c(t.contactKicker)}</p>
    <h2 class="contact__title" data-reveal="lines">${O(t.contactLines)}</h2>
    <p class="contact__sub" data-reveal>${c(t.contactSub)}</p>
    <div class="contact__actions" data-reveal>
      <button class="mail" data-copy="${j.email}" data-cursor="复制">
        <span class="mail__label mono">写信</span>
        <span class="mail__addr" data-mail>${j.email}</span>
        <span class="mail__icon" aria-hidden="true">⧉</span>
      </button>
      <ul class="contact__links">
        ${j.links.map(s=>`<li><a href="${s.href}" ${s.href.startsWith("http")?'target="_blank" rel="noopener"':""}><span data-scramble>${s.label}</span> ↗</a></li>`).join("")}
      </ul>
    </div>
    <footer class="foot">
      <span class="mono">© 2026 ${t.brand}</span>
      <span class="mono foot__loading">还在加载中<span class="foot__caret"></span></span>
      <span class="mono"><span data-clock>--:--:--</span> · ${j.city}</span>
      <a class="mono foot__top" href="#top" data-nav="top">回到顶部 ↑</a>
    </footer>
  </section>`}function je(e){return[Se(e),xe(e),Le(e),e==="pro"?Me():"",Te(e),e==="life"?Ae():"",Ce(e),Pe(e)].join("")}function Re(e,t){const s=E[(t+1)%E.length],a=[["角色",e.role],["时间",e.year],["技术栈",e.stack],["状态",e.status]];return`
  <article class="case">
    <div class="sheet__bar">
      <span class="mono">作品 ${T(t+1)} / ${T(E.length)}</span>
      <button class="sheet__close" data-close data-cursor="关闭"><span class="mono">Esc</span> 关闭 ✕</button>
    </div>
    <header class="case__head">
      <div class="case__intro">
        <p class="kicker"><span class="kicker__dot"></span>${c(e.kind)} · ${e.year}</p>
        <h1 class="case__title">${c(e.title)}</h1>
        <p class="case__desc">${c(e.desc)}</p>
        ${e.link?`<a class="btn btn--solid" href="${e.link}" target="_blank" rel="noopener"><span data-scramble>访问项目</span><span class="btn__arrow">↗</span></a>`:'<span class="mono case__nolink">暂无公开链接</span>'}
      </div>
      <div class="case__obj" data-cursor="拖动"><canvas></canvas></div>
    </header>
    <dl class="case__facts">${a.map(([o,r])=>`<div><dt class="mono">${o}</dt><dd>${c(r)}</dd></div>`).join("")}</dl>
    <div class="case__body">
      <section><h2 class="mono">01 · 背景</h2><p>${c(e.bg)}</p></section>
      <section><h2 class="mono">02 · 过程</h2><p>${c(e.process)}</p></section>
    </div>
    <div class="case__shots">
      ${e.scenes.map(o=>`<figure style="--ratio:${o.ratio??"4/3"}"><canvas data-scene="${o.scene}" data-cursor="显影"></canvas><figcaption class="mono">${c(o.caption)}</figcaption></figure>`).join("")}
    </div>
    <div class="case__body">
      <section><h2 class="mono">03 · 结果</h2><p>${c(e.result)}</p></section>
    </div>
    <a class="case__next" href="#/work/${s.slug}" data-cursor="下一个">
      <span class="mono">下一个</span>
      <span class="case__next-title">${c(s.title)} <span class="btn__arrow">→</span></span>
    </a>
  </article>`}function Ie(e,t){const s=N[t],a=s.indexOf(e),o=s[a-1],r=s[a+1],p=e.body.map(d=>d.t==="h"?`<h2>${c(d.text)}</h2>`:d.t==="q"?`<blockquote><p>${c(d.text)}</p><cite class="mono">— ${c(d.by)}</cite></blockquote>`:`<p>${c(d.text)}</p>`).join("");return`
  <article class="article" ${e.en?'lang="en"':""}>
    <div class="sheet__bar">
      <span class="mono">${t==="pro"?"文章":"文字"} ${T(a+1)} / ${T(s.length)}</span>
      <button class="sheet__close" data-close data-cursor="关闭"><span class="mono">Esc</span> 关闭 ✕</button>
    </div>
    <header class="article__head">
      <p class="mono">${e.date} · ${e.min} ${e.en?"min read":"分钟"}</p>
      <h1 class="article__title ${e.en?"is-en":""}">${c(e.title)}</h1>
    </header>
    <div class="article__body">${p}</div>
    <nav class="article__nav">
      ${o?`<a href="#/post/${o.slug}"><span class="mono">← 上一篇</span><span>${c(o.title)}</span></a>`:"<span></span>"}
      ${r?`<a href="#/post/${r.slug}" class="is-next"><span class="mono">下一篇 →</span><span>${c(r.title)}</span></a>`:"<span></span>"}
    </nav>
  </article>`}const te="01#%*+=-:;<>/\\|maybe404";function re(e){if(e.reduced)return Promise.resolve(e.onCovered());const t=document.createElement("canvas");t.className="wipe",document.body.appendChild(t);const s=Math.min(devicePixelRatio||1,2),a=innerWidth,o=innerHeight;t.width=a*s,t.height=o*s;const r=t.getContext("2d");r.scale(s,s);const p=a<700?12:14,d=p*.6*2,i=p*1.4,u=Math.ceil(a/d),m=Math.ceil(o/i),w=new Float32Array(u*m),M=e.direction??1;for(let g=0;g<m;g++)for(let n=0;n<u;n++){const l=M>0?n/u:1-n/u;w[g*u+n]=l*.62+Math.random()*.3+Math.sin(g*.4)*.03}r.font=`500 ${p}px "JetBrains Mono", monospace`,r.textBaseline="middle";const S=(g,n)=>new Promise(l=>{const v=performance.now(),h=_=>{const x=Math.min(1,(_-v)/g);r.clearRect(0,0,a,o);for(let y=0;y<w.length;y++){const A=w[y],F=n?x*1.1>A:x*1.1<A,P=y%u*d,W=Math.floor(y/u)*i;F&&(r.fillStyle=e.bg,r.fillRect(P,W,d+.5,i+.5));const B=Math.abs(x*1.1-A);B<.06&&(r.fillStyle=B<.02?e.accent:e.ink,r.fillText(te[(y*7+Math.floor(_/60))%te.length],P+2,W+i/2))}x<1?requestAnimationFrame(h):l()};requestAnimationFrame(h)});return(async()=>{e.skipCover?(r.fillStyle=e.bg,r.fillRect(0,0,a,o)):await S(620,!0),await e.onCovered(),await new Promise(g=>setTimeout(g,60)),await S(760,!1),t.remove()})()}function He(e){const t=document.querySelector(".work__list"),s=document.querySelector(".work__preview");if(!t||!s||!matchMedia("(hover: hover) and (pointer: fine)").matches)return()=>{};const a=s.querySelector("canvas"),o=s.querySelector(".work__preview-tag");let r=null,p=0,d=0,i=0,u=0,m=0,w=!1;const M=()=>r||(r=new oe({canvas:a,count:4200,fontSize:8,palette:J(),autoRotate:.5,reduced:e},E[0].shape),r.setFrame(160,112,92,!0),r),S=()=>{i+=(p-i)*.16,u+=(d-u)*.16;const n=p-i;s.style.transform=`translate(${i+28}px, ${u-115}px) rotate(${Math.max(-8,Math.min(8,n*.08))}deg)`,(w||Math.abs(p-i)>.5)&&(m=requestAnimationFrame(S))},g=[...t.querySelectorAll("a[data-work]")];return g.forEach(n=>{n.addEventListener("mouseenter",()=>{const l=E.find(h=>h.slug===n.dataset.work);M().morphTo(l.shape,1.1),o.textContent=`${l.kind} · ${l.year}`,g.forEach(h=>h.classList.toggle("is-hover",h===n))})}),t.addEventListener("mouseenter",n=>{p=i=n.clientX,d=u=n.clientY,w=!0,t.classList.add("is-hovering"),s.classList.add("is-on");const l=M();e?l.renderOnce():l.start(),cancelAnimationFrame(m),S()}),t.addEventListener("mousemove",n=>{p=n.clientX,d=n.clientY}),t.addEventListener("mouseleave",()=>{w=!1,t.classList.remove("is-hovering"),g.forEach(n=>n.classList.remove("is-hover")),s.classList.remove("is-on"),setTimeout(()=>{w||r==null||r.stop()},400)}),()=>{r==null||r.destroy(),cancelAnimationFrame(m)}}function ce(e,t){const s=[],a=document.documentElement.dataset.mode==="pro",o=new IntersectionObserver(i=>{i.forEach(u=>{if(!u.isIntersecting)return;const m=r.get(u.target);m==null||m.playIntro(),o.unobserve(u.target)})},{threshold:.25}),r=new Map;e.querySelectorAll("canvas[data-scene]").forEach(i=>{const u=i.dataset.scene,m=i.getBoundingClientRect(),w=Math.max(320,Math.round(m.width*1.5)),M=Math.max(240,Math.round(m.height/Math.max(1,m.width)*w)),S=new he({canvas:i,source:we(u,w,M),palette:J(),dark:a,reduced:t,fontSize:m.width<360?7:8});s.push(S),r.set(i,S),o.observe(i)});let p=0;const d=()=>{clearTimeout(p),p=window.setTimeout(()=>s.forEach(i=>i.resize()),200)};return addEventListener("resize",d),()=>{o.disconnect(),removeEventListener("resize",d),s.forEach(i=>i.destroy())}}function ze(e){const t=document.querySelector(".sheet"),s=t.querySelector(".sheet__scroll");let a=[],o=!1,r=null,p=null,d="";const i=n=>{if(!n)return"inset(45% 30% 45% 30% round 18px)";const l=innerWidth,v=innerHeight;return`inset(${Math.max(0,n.top)}px ${Math.max(0,l-n.right)}px ${Math.max(0,v-n.bottom)}px ${Math.max(0,n.left)}px round 12px)`},u=()=>{a.forEach(n=>n()),a=[]},m=(n,l)=>{const v=e.getMode();if(u(),n==="work"){const h=E.findIndex(_=>_.slug===l);if(h<0)return!1;s.innerHTML=Re(E[h],h),document.title=`${E[h].title} — maybe404`,requestAnimationFrame(()=>{const _=s.querySelector(".case__obj canvas"),x=innerWidth<860,y=new oe({canvas:_,count:x?6e3:1e4,fontSize:x?8:10,palette:J(),interactive:!0,autoRotate:.3,reduced:e.reduced},E[h].shape),A=()=>{y.resize();const b=_.getBoundingClientRect();y.setFrame(b.width/2,b.height/2,Math.min(b.width*.4,b.height*.58),!0)};A();const F=_.parentElement;let P=!1;const W=b=>{const ee=_.getBoundingClientRect();return[b.clientX-ee.left,b.clientY-ee.top]},B=b=>{(b.pointerType==="mouse"||P)&&y.pointer(...W(b))},ue=b=>{P=!0,y.startDrag(...W(b))},Q=()=>{P=!1,y.endDrag()};F.addEventListener("pointermove",B),F.addEventListener("pointerdown",ue),F.addEventListener("pointerleave",()=>y.pointerLeave()),addEventListener("pointerup",Q),addEventListener("resize",A),e.reduced?y.renderOnce():y.start(),a.push(()=>{y.destroy(),removeEventListener("pointerup",Q),removeEventListener("resize",A)}),a.push(ce(s,e.reduced))})}else{const _=N[v].find(x=>x.slug===l);if(!_)return!1;s.innerHTML=Ie(_,v),document.title=`${_.title} — ${v==="pro"?"maybe404":"maybe"}`}return ne(s,e.reduced),s.scrollTop=0,!0},w=(n,l)=>{var h;const v=`${n}/${l}`;if(!(o&&v===d)){if(!m(n,l)){history.replaceState(null,"",location.pathname+location.search);return}if(d=v,o){e.reduced||L.fromTo(s,{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease:"expo.out"});return}o=!0,p=document.activeElement,(h=e.lenis)==null||h.stop(),document.documentElement.classList.add("sheet-open"),t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),e.reduced?L.set(t,{clipPath:"inset(0px 0px 0px 0px round 0px)"}):L.fromTo(t,{clipPath:i(r)},{clipPath:"inset(0px 0px 0px 0px round 0px)",duration:.9,ease:"expo.inOut"}),e.reduced||L.fromTo(s.children,{y:60,opacity:0},{y:0,opacity:1,duration:1,ease:"expo.out",delay:.35}),setTimeout(()=>{var _;return(_=t.querySelector("[data-close]"))==null?void 0:_.focus({preventScroll:!0})},50)}},M=()=>{if(!o)return;o=!1,d="";const n=()=>{var l;t.classList.remove("is-open"),t.setAttribute("aria-hidden","true"),u(),s.innerHTML="",(l=e.lenis)==null||l.start(),document.documentElement.classList.remove("sheet-open"),p==null||p.focus({preventScroll:!0})};document.title=document.documentElement.dataset.mode==="pro"?"maybe404 — 独立开发者，做小而完整的东西":"maybe — 也许找不到，也没关系",e.reduced?n():L.to(t,{clipPath:i(r),duration:.7,ease:"expo.inOut",onComplete:n})},S=()=>{history.pushState(null,"",location.pathname+location.search),g()},g=()=>{const n=location.hash.match(/^#\/(work|post)\/([\w-]+)/);n?w(n[1],n[2]):M()};return document.addEventListener("click",n=>{const l=n.target.closest('a[href^="#/"]');l&&!t.contains(l)&&(r=l.getBoundingClientRect()),n.target.closest("[data-close]")&&(n.preventDefault(),S())}),addEventListener("keydown",n=>{if(!o)return;if(n.key==="Escape"){S();return}const l=d.match(/^(work|post)\/(.+)$/);if(!l||n.key!=="ArrowRight"&&n.key!=="ArrowLeft")return;const v=l[1]==="work"?E:N[e.getMode()],_=(v.findIndex(x=>x.slug===l[2])+(n.key==="ArrowRight"?1:-1)+v.length)%v.length;location.hash=`#/${l[1]}/${v[_].slug}`}),addEventListener("hashchange",g),{route:g,close:M,isOpen:()=>o}}L.registerPlugin(I);const q=document.documentElement,$=matchMedia("(prefers-reduced-motion: reduce)").matches;let k=q.dataset.mode==="pro"?"pro":"life";const H=document.querySelector("#main"),ie=document.querySelector(".nav__links"),Oe=document.querySelector(".nav"),Fe=document.querySelector(".nav__pct"),le=document.querySelector("[data-brand]"),Y=document.querySelector(".toast");let f=null;$||(f=new ve({lerp:.1,wheelMultiplier:.9}),f.on("scroll",I.update),L.ticker.add(e=>f.raf(e*1e3)),L.ticker.lagSmoothing(0));const We=e=>{const t=typeof e=="string"?e==="top"?0:document.getElementById(e):e;t!==null&&(f?f.scrollTo(t,{duration:1.4,easing:s=>1-Math.pow(1-s,4)}):typeof t=="number"?window.scrollTo({top:t}):t.scrollIntoView())};let V=[],C,D=0,de=!0;function pe(){var t;V.forEach(s=>s()),V=[],I.getAll().forEach(s=>s.kill());const e=z[k];q.dataset.mode=k,document.title=e.title,(t=document.querySelector('meta[name="theme-color"]'))==null||t.setAttribute("content",getComputedStyle(q).getPropertyValue("--bg").trim()),le.textContent=e.brand,ie.innerHTML=be(k),H.innerHTML=je(k),document.querySelectorAll("[data-set-mode]").forEach(s=>s.setAttribute("aria-checked",String(s.dataset.setMode===k))),ne(document,$),Ve(),C.mount(k),V.push(He($)),V.push(ce(H,$)),Be(),Z(),I.refresh()}function Ve(){const e=new IntersectionObserver(s=>{s.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),a.target.classList.contains("hero__title")&&G(document.querySelector(".hero__note"),$),e.unobserve(a.target))})},{rootMargin:"0px 0px -8% 0px",threshold:.12});H.querySelectorAll("[data-reveal]").forEach(s=>{de&&s.closest(".hero")||e.observe(s)});const t=new IntersectionObserver(s=>s.forEach(a=>{a.isIntersecting&&(G(a.target,$),t.unobserve(a.target))}),{threshold:.6});H.querySelectorAll(".work__note, .photos__note").forEach(s=>t.observe(s)),V.push(()=>{e.disconnect(),t.disconnect()})}function Be(){H.querySelectorAll("section[id]").forEach(e=>{I.create({trigger:e,start:"top 50%",end:"bottom 50%",onToggle:t=>{t.isActive&&ie.querySelectorAll("a").forEach(s=>s.classList.toggle("is-active",s.dataset.nav===e.id))}})})}function Z(){const e=document.documentElement.scrollHeight-innerHeight,t=f?f.scroll:scrollY;Fe.textContent=`${String(Math.round(t/Math.max(1,e)*100)).padStart(3,"0")}%`,Oe.classList.toggle("is-scrolled",t>innerHeight*.6)}const De=()=>document.querySelector(".tape__track");L.ticker.add(()=>{const e=De();if(!e||$)return;const t=f?f.velocity:0;D-=.6+Math.abs(t)*.25;const s=e.scrollWidth/3;-D>s&&(D+=s),e.style.transform=`translate3d(${D}px,0,0)`,f&&Math.abs(t)>.5&&(C==null||C.obj.kick(t*.0012))});f==null||f.on("scroll",Z);addEventListener("scroll",()=>{f||Z()},{passive:!0});let U=!1;async function K(e){if(e===k||U)return;U=!0;const t=document.querySelector(".toggle");t.classList.remove("is-moving"),t.offsetWidth,t.classList.add("is-moving"),q.dataset.mode=e;const s=getComputedStyle(q),a={bg:s.getPropertyValue("--bg").trim(),ink:s.getPropertyValue("--ink").trim(),accent:s.getPropertyValue("--accent").trim()};q.dataset.mode=k,document.querySelectorAll("[data-set-mode]").forEach(r=>r.setAttribute("aria-checked",String(r.dataset.setMode===e)));const o=t.querySelector(".toggle__knob");o.style.transform=e==="pro"?"translateX(100%)":"translateX(0)",await re({...a,reduced:$,direction:e==="pro"?1:-1,onCovered:()=>{o.style.transform="",k=e;try{localStorage.setItem("maybe-mode",k)}catch{}const r=new URL(location.href);r.searchParams.set("mode",k),r.hash="",history.replaceState(null,"",r),f==null||f.scrollTo(0,{immediate:!0}),window.scrollTo(0,0),q.dataset.mode=k,C.setPalette(),pe(),R(le,z[k].brand,{reduced:$})}}),U=!1}document.addEventListener("click",e=>{var r;const t=e.target,s=t.closest("[data-set-mode]");if(s){K(s.dataset.setMode);return}const a=t.closest("a[data-nav], .nav__brand");if(a){e.preventDefault(),We(a.dataset.nav??"top");return}const o=t.closest("[data-copy]");if(o){const p=o.dataset.copy,d=()=>{Ne("邮箱已复制");const i=o.querySelector("[data-mail]");i&&R(i,"已复制 ✓",{reduced:$}).then(()=>setTimeout(()=>i&&R(i,p,{reduced:$}),1200))};(r=navigator.clipboard)==null||r.writeText(p).then(d,()=>{location.href=`mailto:${p}`})}});var ae;(ae=document.querySelector(".toggle"))==null||ae.addEventListener("keydown",e=>{const t=e.key;t==="ArrowLeft"&&K("life"),t==="ArrowRight"&&K("pro")});let se=0;function Ne(e){Y.textContent=e,Y.classList.add("is-on"),clearTimeout(se),se=window.setTimeout(()=>Y.classList.remove("is-on"),1800)}const Xe=new Intl.DateTimeFormat("zh-CN",{timeZone:j.tz,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1});setInterval(()=>document.querySelectorAll("[data-clock]").forEach(e=>e.textContent=Xe.format(new Date)),1e3);async function Ye(e){const t=document.querySelector(".loader");if(q.classList.contains("seen")||$){t.remove();return}const a=t.querySelector(".loader__num"),o=t.querySelector(".loader__status"),r=t.querySelector(".loader__bar span"),p=t.querySelector(".loader__count"),d={v:0},i=()=>{const m=Math.round(d.v);a.textContent=String(m).padStart(3,"0"),r.style.width=`${Math.min(100,m)}%`};await L.to(d,{v:100,duration:1.1,ease:"power2.inOut",onUpdate:i}),await e,R(o,"100%…还没找到",{duration:400}),p.classList.add("is-over"),await L.to(d,{v:404,duration:.7,ease:"steps(9)",onUpdate:i}),await R(o,"404 · 没找到 maybe",{duration:500}),await new Promise(m=>setTimeout(m,350)),await R(o,"也没关系，进来坐坐。",{duration:500}),await new Promise(m=>setTimeout(m,450));try{sessionStorage.setItem("maybe-seen","1")}catch{}const u=getComputedStyle(q);await re({bg:u.getPropertyValue("--bg").trim(),ink:u.getPropertyValue("--ink").trim(),accent:u.getPropertyValue("--accent").trim(),skipCover:!0,onCovered:()=>{t.remove()}})}async function Ue(){_e($);const e=Promise.race([me(),new Promise(o=>setTimeout(o,2500))]),t=Ye(e);C=new fe(k,$),e.then(()=>C.setReady()),pe(),ze({getMode:()=>k,lenis:f,reduced:$}).route(),await t,de=!1,H.querySelectorAll(".hero [data-reveal]").forEach(o=>o.classList.add("in")),G(document.querySelector(".hero__note"),$);let a=0;addEventListener("resize",()=>{clearTimeout(a),a=window.setTimeout(()=>I.refresh(),200)})}Ue();
