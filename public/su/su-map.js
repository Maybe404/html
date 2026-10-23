// 「溯」星图（画布 · 伪 3D）。
// 关系：轨道 = 归属；星云 = 同主题；远近 = 相关度；点选时出现星座线，信号沿线流动表示方向。
// 趋势：彗尾 = 正在发酵的事件；脉冲 = 近 3 天升温的实体。
// 交互：左键拖动平移，右键 / Shift 拖动旋转，滚轮以鼠标为中心缩放，鼠标附近自动显示更多标注。
const TAU = Math.PI * 2;
const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
const mixHex = (a, b, t) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), c = s => Math.round(((A >> s) & 255) + (((B >> s) & 255) - ((A >> s) & 255)) * t); return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1); };
const hash = s => { s = String(s); let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };
const OWN = new Set(['开发', '子公司']), NOT_CREW = new Set(['前成员', '联合创始', '提出']);
const NEB_D = ['#7f9be0', '#d08aa8', '#73bf9f', '#d9a066', '#a48ed8', '#62b6c6', '#cf7666', '#b0bd62', '#93a3b8'];
const NEB_L = ['#3d5fb0', '#a2466f', '#2f7f5f', '#a36424', '#6a4fa8', '#1f7c8c', '#a3402f', '#6c7a1f', '#566479'];
const STAR_T = ['#fff1d6', '#ffd9a8', '#dbe5ff', '#ffe7c4', '#fff8ec'];
const vn = (x, y, s) => { const h = (i, j) => hash(s + ':' + i + ',' + j), xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); return (h(xi, yi) * (1 - u) + h(xi + 1, yi) * u) * (1 - v) + (h(xi, yi + 1) * (1 - u) + h(xi + 1, yi + 1) * u) * v; };
function cloud(seed) { const S = 128, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d'), img = g.createImageData(S, S), d = img.data; for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { let n = 0, a = .5, f = 3 / S; for (let o = 0; o < 4; o++) { n += a * vn(x * f, y * f, seed + o); a *= .5; f *= 2; } const u = x / S - .5, v = y / S - .5, r = Math.sqrt(u * u + v * v) * 2, al = Math.max(0, (n / .94 - .32) * 1.9) * Math.max(0, 1 - r * r); const i = (y * S + x) * 4; d[i] = d[i + 1] = d[i + 2] = 255; d[i + 3] = Math.min(255, al * 255); } g.putImageData(img, 0, 0); return c; }

export class Graph3D {
  constructor(canvas, h = {}) {
    this.c = canvas; this.ctx = canvas.getContext('2d'); this.h = h;
    this.nodes = []; this.links = []; this.byId = new Map(); this.adj = new Map(); this.free = []; this.order = []; this.sprs = [];
    this.sel = null; this.hover = null; this.focus = null; this.focusRoot = null; this.follow = null; this.lines = false; this.alpha = 0; this.mouse = null; this.zA = null; this.panHome = false;
    this.cam = { yaw: .5, pitch: .46, zoom: .72, tz: .72, px: 0, py: 0 }; this.tgt = { x: 0, y: 0, z: 0 }; this.look = { x: 0, y: 0, z: 0 };
    this.spin = .00014; this.dpr = Math.min(2, window.devicePixelRatio || 1); this.drag = null; this.t0 = performance.now(); this._t = 0;
    this.stars = Array.from({ length: 420 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * Math.random() * 1.6 + .25, a: Math.random() * .55 + .1, p: Math.random() * .8 + .2, t: Math.floor(Math.random() * 5) }));
    this.clouds = [cloud('a'), cloud('b'), cloud('c')]; this.tinted = new Map();
    this.setTheme('dark'); this._bind(); this.resize(); this._loop = this._loop.bind(this); this._raf = requestAnimationFrame(this._loop);
  }
  setTheme(name) { const d = name !== 'light'; this.tinted.clear(); this.theme = { dark: d, ink: d ? '#e9e4d8' : '#1f1d19', muted: d ? '#8b8578' : '#7a746a', rock: d ? '#9a9488' : '#6f695f', brass: d ? '#c9a961' : '#8a6a1c', verm: d ? '#d9876a' : '#b86a4e', halo: d ? 'rgba(15,16,20,.88)' : 'rgba(236,232,222,.92)', star: d ? '233,228,216' : '31,29,25', ring: d ? 'rgba(233,228,216,.07)' : 'rgba(31,29,25,.1)', ringHi: d ? 'rgba(201,169,97,.62)' : 'rgba(138,106,28,.7)', all: d ? 'rgba(233,228,216,.08)' : 'rgba(31,29,25,.1)', shade: d ? 'rgba(0,0,0,.42)' : 'rgba(0,0,0,.2)', neb: d ? NEB_D : NEB_L, type: d ? { P: '#d9c98c', M: '#8fc3bd', H: '#cf95b9', L: '#9d94c4' } : { P: '#a0781f', M: '#2f7a7a', H: '#a3457e', L: '#5e5494' } }; }
  setMode() { } setClusters() { }
  setLines(v) { this.lines = !!v; }
  _tint(k, col) { const key = k + col; if (this.tinted.has(key)) return this.tinted.get(key); const s = this.clouds[k], c = document.createElement('canvas'); c.width = s.width; c.height = s.height; const g = c.getContext('2d'); g.drawImage(s, 0, 0); g.globalCompositeOperation = 'source-in'; g.fillStyle = col; g.fillRect(0, 0, c.width, c.height); this.tinted.set(key, c); return c; }
  setData(nodes, links) {
    const old = this.byId, rnd = s => (Math.random() - .5) * s;
    this.nodes = nodes.map(n => { const o = old.get(n.id); return Object.assign({}, n, { x: o ? o.x : rnd(700), y: o ? o.y : rnd(120), z: o ? o.z : rnd(700), vx: 0, vy: 0, vz: 0, sx: 0, sy: 0, sz: 0, s: 1, sr: 1, sa: 1, par: null, o: null, ext: 16, kids: [], mem: [], band: hash(n.id + 'b') < .55, tint: STAR_T[Math.floor(hash(n.id + 'c') * 5)], rock: [0, 1, 2, 3, 4, 5].map(i => .65 + .55 * hash(n.id + i)) }); });
    this.byId = new Map(this.nodes.map(n => [n.id, n]));
    this.links = links.filter(l => this.byId.has(l.a) && this.byId.has(l.b)).map(l => { const A = this.byId.get(l.a), B = this.byId.get(l.b); return { a: l.a, b: l.b, rel: l.rel, A, B, own: OWN.has(l.rel) && A.type === 'C' && (B.type === 'P' || B.type === 'M'), crew: A.type === 'H' && B.type === 'C' && !NOT_CREW.has(l.rel), mem: l.rel === '属于', ev: A.type === 'E' || B.type === 'E', bind: false }; });
    this.adj = new Map(); for (const n of this.nodes) this.adj.set(n.id, new Set()); for (const l of this.links) { this.adj.get(l.a).add(l.b); this.adj.get(l.b).add(l.a); }
    let hue = 0; for (const n of this.nodes) if (n.type === 'T') n.hue = hue++;
    for (const l of this.links) if (l.own && !l.B.par) { l.B.par = l.A; l.bind = true; }
    for (const l of this.links) if (l.crew && !l.A.par) { l.A.par = l.B; l.bind = true; }
    for (const n of this.nodes) if (n.type === 'E') { const nb = [...this.adj.get(n.id)].map(i => this.byId.get(i)); n.par = nb.find(q => q.type === 'P' || q.type === 'M') || nb.find(q => q.type === 'C') || nb[0] || null; for (const l of this.links) if ((l.A === n && l.B === n.par) || (l.B === n && l.A === n.par)) l.bind = true; }
    for (const n of this.nodes) if (n.par) n.par.kids.push(n);
    for (const p of this.nodes) {
      const ks = p.kids.filter(k => k.type !== 'E').sort((a, b) => (a.type === 'H') - (b.type === 'H') || b.size - a.size);
      let r = 18 + p.size * 1.6;
      ks.forEach((k, i) => { if (i) r += k.type === 'H' && ks[i - 1].type !== 'H' ? 15 : 9; k.o = { r, inc: (hash(k.id) - .5) * (k.type === 'H' ? 1.1 : .45), node: hash(k.id + 'n') * TAU, a0: hash(k.id + 'a') * TAU, sp: .0042 / Math.sqrt(r) * (hash(k.id + 's') > .15 ? 1 : -1) }; });
      const es = p.kids.filter(k => k.type === 'E'), er0 = (2.2 + p.size * 1.1) * (p.type === 'C' ? 1.4 : 1) + 5;
      es.forEach((k, i) => { const r2 = er0 + (i % 5) * 3 + Math.floor(i / 5) * 1.1 + (k.hot ? 12 : 0); k.o = { r: r2, inc: (hash(k.id) - .5) * 1.5, node: hash(k.id + 'n') * TAU, a0: hash(k.id + 'a') * TAU, sp: .012 / Math.sqrt(r2) }; });
      p.ext = Math.max(16, ks.length ? r + 12 : 0, es.length ? er0 + 24 : 0);
    }
    const depth = n => n.par ? 1 + depth(n.par) : 0, root = n => { while (n.par) n = n.par; return n; };
    this.order = this.nodes.slice().sort((a, b) => depth(a) - depth(b)); this.free = this.nodes.filter(n => !n.par);
    this.sprs = []; for (const l of this.links) { if (l.bind || l.ev) continue; const A = root(l.A), B = root(l.B); if (A !== B) this.sprs.push({ A, B, k: l.mem ? .006 : l.rel === '竞品' ? .003 : .002, L: l.mem ? 26 : 60 }); }
    this.alpha = old.size ? .35 : 1; for (let i = 0; i < (old.size ? 80 : 520); i++) this.step();
    if (!old.size || this._needFit) this.fit();
    if (this.sel && !this.byId.has(this.sel)) { this.sel = null; this.follow = null; }
    if (this.focusRoot) { if (this.byId.has(this.focusRoot)) this.focus = this._focusSet(this.focusRoot); else { this.focus = null; this.focusRoot = null; } }
  }
  fit() { if (!this.W) { this._needFit = true; return; } this._needFit = false; let R = 120; for (const p of this.free) R = Math.max(R, Math.hypot(p.x, p.z) + p.ext * .6); const z = Math.min(this.W, this.H) * .5 * 1250 / (R * 700) * .72; this.cam.tz = this.cam.zoom = Math.min(2, Math.max(.25, z)); this.fitZoom = this.cam.tz; }
  _focusSet(id) { const s = new Set([id]); for (const b of this.adj.get(id) || []) s.add(b); for (const i of [...s]) { const n = this.byId.get(i); if (!n) continue; for (const k of n.kids) s.add(k.id); if (n.par) s.add(n.par.id); } return s; }
  select(id, fly = true) {
    this.sel = id; this.follow = fly ? id : null; this.zA = null; const n = id ? this.byId.get(id) : null;
    if (!id) { this.tgt = { x: 0, y: 0, z: 0 }; this.panHome = true; if (this.fitZoom) this.cam.tz = this.fitZoom; }
    else if (fly && n) { this.panHome = true; this.cam.tz = Math.max(this.cam.tz, n.type === 'C' ? 1.5 : n.type === 'E' ? 2.6 : n.type === 'T' ? 1.1 : 2); }
    this.h.onSelect && this.h.onSelect(id);
  }
  focusOn(id) { this.focusRoot = id; this.focus = this._focusSet(id); this.select(id, true); }
  clearFocus() { this.focus = null; this.focusRoot = null; }
  zoomBy(f) { this.cam.tz = Math.min(8, Math.max(.25, this.cam.tz * f)); }
  zoomAt(x, y, f) { this.touched = performance.now(); if (this.follow) this.follow = null; this.tgt = { x: this.look.x, y: this.look.y, z: this.look.z }; this.panHome = false; this.zA = { x: x - this.W / 2, y: y - this.H / 2 }; this.zoomBy(f); }
  resize() { const r = this.c.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return; this.c.width = Math.round(r.width * this.dpr); this.c.height = Math.round(r.height * this.dpr); this.W = r.width; this.H = r.height; if (this._needFit) this.fit(); }
  destroy() { cancelAnimationFrame(this._raf); for (const [t, f] of this._ev) this.c.removeEventListener(t, f); }
  _bind() {
    const c = this.c, ev = this._ev = [], on = (t, f, o) => { c.addEventListener(t, f, o); ev.push([t, f]); };
    const pos = e => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    on('pointerdown', e => { const [x, y] = pos(e); this.touched = performance.now(); this.drag = { x, y, sx: x, sy: y, moved: false, rot: e.button === 2 || e.shiftKey || e.altKey }; c.setPointerCapture(e.pointerId); });
    on('pointermove', e => { const [x, y] = pos(e); this.mouse = { x, y };
      if (this.drag) { const dx = x - this.drag.x, dy = y - this.drag.y; if (Math.abs(x - this.drag.sx) + Math.abs(y - this.drag.sy) > 4) { this.drag.moved = true; c.style.cursor = this.drag.rot ? 'grabbing' : 'grabbing'; } if (this.drag.rot) { this.cam.yaw += dx * .005; this.cam.pitch = Math.min(1.35, Math.max(-1.35, this.cam.pitch + dy * .005)); } else { this.cam.px += dx; this.cam.py += dy; this.panHome = false; this.zA = null; } this.drag.x = x; this.drag.y = y; }
      else { const p = this.pick(x, y), id = p ? p.id : null; if (id !== this.hover) { this.hover = id; c.style.cursor = id ? 'pointer' : 'grab'; } this.h.onHover && this.h.onHover(id, x, y); } });
    on('pointerup', e => { if (!this.drag) return; const moved = this.drag.moved; this.drag = null; c.style.cursor = this.hover ? 'pointer' : 'grab'; if (!moved && e.button === 0) { const [x, y] = pos(e), p = this.pick(x, y); this.select(p ? p.id : null, !!p); } });
    on('pointerleave', () => { this.hover = null; this.mouse = null; this.h.onHover && this.h.onHover(null, 0, 0); });
    on('dblclick', e => { const [x, y] = pos(e), p = this.pick(x, y); if (p) { this.focusOn(p.id); this.h.onOpen && this.h.onOpen(p.id); } });
    on('contextmenu', e => e.preventDefault());
    on('wheel', e => { e.preventDefault(); const [x, y] = pos(e); this.zoomAt(x, y, Math.exp(-e.deltaY * .0016)); }, { passive: false });
    c.style.cursor = 'grab'; c.style.touchAction = 'none';
  }
  pick(mx, my) { let best = null, bd = 1e9; for (const p of this.nodes) { if (this.focus && !this.focus.has(p.id)) continue; if (p.type === 'T' && !p.mem.length) continue; const d = Math.hypot(p.sx - mx, p.sy - my) + (p.type === 'T' ? 8 : 0), r = p.type === 'T' ? 30 : Math.max(8, p.sr * (p.type === 'C' ? 1.5 : 1) + 5); if (d < r && d < bd) { bd = d; best = p; } } return best; }
  step() {
    const a = this.alpha, F = this.free, n = F.length;
    for (let i = 0; i < n; i++) { const p = F[i]; for (let j = i + 1; j < n; j++) { const q = F[j]; let dx = p.x - q.x, dy = p.y - q.y, dz = p.z - q.z; const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + .01, min = p.ext + q.ext + 70; let f = a * 9000 / (d * d + 900); if (d < min) f += (min - d) * .08; dx /= d; dy /= d; dz /= d; p.vx += dx * f; p.vy += dy * f; p.vz += dz * f; q.vx -= dx * f; q.vy -= dy * f; q.vz -= dz * f; } }
    for (const s of this.sprs) { const p = s.A, q = s.B, dx = q.x - p.x, dy = q.y - p.y, dz = q.z - p.z, d = Math.sqrt(dx * dx + dy * dy + dz * dz) + .01, f = a * (d - (p.ext + q.ext + s.L)) * s.k / d; p.vx += dx * f; p.vy += dy * f; p.vz += dz * f; q.vx -= dx * f; q.vy -= dy * f; q.vz -= dz * f; }
    for (const p of F) { p.vx -= p.x * .0005 * a; p.vy -= p.y * .004 * a; p.vz -= p.z * .0005 * a; p.vx *= .8; p.vy *= .8; p.vz *= .8; p.x += p.vx; p.y += p.vy; p.z += p.vz; }
    this.alpha *= .986;
  }
  _pt(n, th) { const o = n.o, p = n.par, x = Math.cos(th) * o.r, z0 = Math.sin(th) * o.r, y = z0 * Math.sin(o.inc), z = z0 * Math.cos(o.inc), cN = Math.cos(o.node), sN = Math.sin(o.node); return [p.x + x * cN - z * sN, p.y + y, p.z + x * sN + z * cN]; }
  _orbit(t) { for (const n of this.order) if (n.par && n.o) { const q = this._pt(n, n.o.a0 + t * n.o.sp); n.x = q[0]; n.y = q[1]; n.z = q[2]; } }
  _loop() { if (this.W && !this.paused) this._render(); this._raf = requestAnimationFrame(this._loop); }
  _sky(now) {
    const { ctx, W, H, cam } = this, th = this.theme;
    if (th.dark) { const g = ctx.createRadialGradient(W * .5, H * .55, 0, W * .5, H * .55, Math.max(W, H) * .75); g.addColorStop(0, 'rgba(46,50,68,.34)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
    for (const s of this.stars) { const x = ((s.x + cam.yaw * .03 * s.p + cam.px * .00006 * s.p) % 1 + 1) % 1 * W, y = ((s.y + cam.pitch * .02 * s.p + cam.py * .00006 * s.p) % 1 + 1) % 1 * H, a = s.a * (.65 + .35 * Math.sin(now * .001 * s.p + s.x * 20)); ctx.fillStyle = th.dark ? hexA(STAR_T[s.t], a.toFixed(3)) : `rgba(${th.star},${(a * .4).toFixed(3)})`; ctx.beginPath(); ctx.arc(x, y, s.r, 0, TAU); ctx.fill(); }
  }
  _ring(n) { const P = this._proj; for (let i = 0; i <= 48; i++) { const q = this._pt(n, i / 48 * TAU), r = P(q[0], q[1], q[2]); i ? this.ctx.lineTo(r[0], r[1]) : this.ctx.moveTo(r[0], r[1]); } }
  _trail(p, col, a) { const { ctx } = this, o = p.o, P = this._proj, th0 = o.a0 + this._t * o.sp, N = 20; let prev = [p.sx, p.sy]; for (let i = 1; i <= N; i++) { const q = this._pt(p, th0 - Math.sign(o.sp) * i * .1), r = P(q[0], q[1], q[2]), k = 1 - i / N; ctx.globalAlpha = a * k * .85; ctx.strokeStyle = col; ctx.lineWidth = Math.max(.5, p.sr * 1.4 * k); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(r[0], r[1]); ctx.stroke(); prev = r; } }
  _ringHalf(x, y, r, col, a, back) { const { ctx } = this; ctx.globalAlpha = a * .85; for (const [k, w, al] of [[2.15, 1.4, .75], [1.75, 2.2, .35]]) { ctx.strokeStyle = hexA(col, al); ctx.lineWidth = w; ctx.beginPath(); ctx.ellipse(x, y, r * k, r * k * .3, -.42, back ? Math.PI : 0, back ? TAU : Math.PI); ctx.stroke(); } ctx.globalAlpha = a; }
  _body(p, a, now) {
    const { ctx } = this, th = this.theme, r = p.sr, x = p.sx, y = p.sy; ctx.globalAlpha = a;
    if (p.type === 'C') {
      const col = th.dark ? p.tint : th.ink, g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.8); g.addColorStop(0, hexA(col, th.dark ? .85 : .45)); g.addColorStop(.22, hexA(col, th.dark ? .24 : .1)); g.addColorStop(1, hexA(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3.8, 0, TAU); ctx.fill();
      if (r > 2.5) { ctx.save(); ctx.translate(x, y); ctx.rotate(now * .00005 + hash(p.id) * 6); for (let i = 0; i < 7; i++) { const ang = i / 7 * TAU, len = r * (2.4 + 1.2 * hash(p.id + i)), gr = ctx.createLinearGradient(0, 0, Math.cos(ang) * len, Math.sin(ang) * len); gr.addColorStop(0, hexA(col, .28)); gr.addColorStop(1, hexA(col, 0)); ctx.strokeStyle = gr; ctx.lineWidth = r * .32; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(Math.cos(ang) * r * .6, Math.sin(ang) * r * .6); ctx.lineTo(Math.cos(ang) * len, Math.sin(ang) * len); ctx.stroke(); } ctx.restore(); }
      const core = ctx.createRadialGradient(x - r * .2, y - r * .2, 0, x, y, r * .9); core.addColorStop(0, th.dark ? '#ffffff' : mixHex(col, '#ffffff', .3)); core.addColorStop(1, col); ctx.fillStyle = core; ctx.beginPath(); ctx.arc(x, y, r * .85, 0, TAU); ctx.fill();
      ctx.strokeStyle = hexA(col, .35); ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x - r * 3.2, y); ctx.lineTo(x + r * 3.2, y); ctx.moveTo(x, y - r * 3.2); ctx.lineTo(x, y + r * 3.2); ctx.stroke();
    } else if (p.type === 'P' || p.type === 'M') {
      const col = th.type[p.type];
      if (p.type === 'M') this._ringHalf(x, y, r, col, a, true);
      const g = ctx.createRadialGradient(x - r * .42, y - r * .45, r * .08, x, y, r * 1.05); g.addColorStop(0, mixHex(col, '#ffffff', .45)); g.addColorStop(.55, col); g.addColorStop(1, mixHex(col, '#000000', .5)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      if (p.band && r > 3) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); for (let k = 0; k < 5; k++) { const yy = y - r + (k + .5) * (r * 2 / 5) + Math.sin(now * .0004 + k + hash(p.id) * 9) * r * .05; ctx.fillStyle = k % 2 ? 'rgba(0,0,0,.09)' : 'rgba(255,255,255,.08)'; ctx.fillRect(x - r, yy - r * .1, r * 2, r * (.12 + .08 * hash(p.id + k))); } ctx.restore(); }
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); ctx.fillStyle = th.shade; ctx.beginPath(); ctx.arc(x + r * .55, y + r * .4, r * 1.02, 0, TAU); ctx.fill(); ctx.restore();
      ctx.strokeStyle = hexA(mixHex(col, '#ffffff', .5), .35); ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(x, y, r + .4, Math.PI * 1.05, Math.PI * 1.7); ctx.stroke();
      if (p.type === 'M') this._ringHalf(x, y, r, col, a, false);
    } else if (p.type === 'H') { const col = th.type.H, g = ctx.createRadialGradient(x - r * .3, y - r * .3, 0, x, y, r * .85); g.addColorStop(0, mixHex(col, '#ffffff', .4)); g.addColorStop(1, mixHex(col, '#000000', .35)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * .8, 0, TAU); ctx.fill(); }
    else if (p.type === 'L') { ctx.strokeStyle = th.type.L; ctx.lineWidth = 1; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.arc(x, y, r + 3, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = th.type.L; ctx.beginPath(); ctx.arc(x, y, r * .5, 0, TAU); ctx.fill(); }
    else if (p.type === 'E') {
      const col = p.first ? th.brass : p.hot ? th.verm : th.rock;
      if (p.hot && p.o) { this._trail(p, col, a); ctx.globalAlpha = a * .6; const gg = ctx.createRadialGradient(x, y, 0, x, y, r * 4); gg.addColorStop(0, hexA(col, .5)); gg.addColorStop(1, hexA(col, 0)); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, r * 4, 0, TAU); ctx.fill(); }
      ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); const rot = this._t * .01 + p.rock[0] * 6; for (let i = 0; i < 6; i++) { const ang = i / 6 * TAU + rot, rr = r * .85 * p.rock[i]; i ? ctx.lineTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr) : ctx.moveTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr); } ctx.closePath(); ctx.fill();
      if (p.first) { ctx.strokeStyle = th.brass; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, TAU); ctx.stroke(); }
    }
    if (p.rising && p.type !== 'E') { const ph = (now / 2600 + hash(p.id)) % 1; ctx.globalAlpha = a * (1 - ph) * .7; ctx.strokeStyle = th.verm; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r * (p.type === 'C' ? 1.3 : 1) + 3 + ph * 18, 0, TAU); ctx.stroke(); }
  }
  _render() {
    const { ctx, cam, W, H } = this, th = this.theme, now = performance.now(), t = this._t = (now - this.t0) / 16;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    if (!this.drag && !this.sel && !this.mouse && !(this.touched && now - this.touched < 8000)) cam.yaw += this.spin;
    if (this.alpha > .004) this.step();
    this._orbit(t);
    if (this.follow) { const p = this.byId.get(this.follow); if (p) this.tgt = { x: p.x, y: p.y, z: p.z }; }
    this.look.x += (this.tgt.x - this.look.x) * .06; this.look.y += (this.tgt.y - this.look.y) * .06; this.look.z += (this.tgt.z - this.look.z) * .06;
    const z0 = cam.zoom; cam.zoom += (cam.tz - cam.zoom) * .12;
    if (this.zA) { const k = cam.zoom / z0; cam.px = this.zA.x - (this.zA.x - cam.px) * k; cam.py = this.zA.y - (this.zA.y - cam.py) * k; if (Math.abs(cam.tz - cam.zoom) < cam.tz * .002) this.zA = null; }
    if (this.panHome) { const hx = this.sel ? -Math.min(190, this.W * .2) : 0; cam.px += (hx - cam.px) * .1; cam.py *= .9; if (Math.abs(cam.px - hx) + Math.abs(cam.py) < .5) { cam.px = hx; cam.py = 0; this.panHome = false; } }
    this._sky(now);
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch), Dd = 1250, F = 700, Z = cam.zoom / .72;
    const proj = this._proj = (x, y, z) => { x -= this.look.x; y -= this.look.y; z -= this.look.z; const x1 = x * cy - z * sy, z1 = x * sy + z * cy, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, s = F / Math.max(60, Dd + z2) * Z; return [W / 2 + x1 * s + cam.px, H / 2 + y1 * s + cam.py, z2, s]; };
    for (const p of this.nodes) { const q = proj(p.x, p.y, p.z); p.sx = q[0]; p.sy = q[1]; p.sz = q[2]; p.s = q[3]; p.sr = Math.max(1.2, (2.2 + p.size * 1.1) * q[3] * (p.type === 'H' || p.type === 'L' ? .7 : 1)); p.sa = Math.min(1, Math.max(.2, 1 - (q[2] + 400) / 950)); }
    const vis = this.focus, shown = p => !vis || vis.has(p.id);
    for (const T of this.nodes) { if (T.type !== 'T') continue; T.mem = [...this.adj.get(T.id)].map(i => this.byId.get(i)).filter(m => m && m.type !== 'E' && shown(m)); if (T.mem.length) { let x = 0, y = 0, s = 0; for (const m of T.mem) { x += m.sx; y += m.sy; s += m.s; } T.sx = x / T.mem.length; T.sy = y / T.mem.length; T.s = s / T.mem.length; } }
    const sel = this.sel ? this.byId.get(this.sel) : null, hov = this.hover ? this.byId.get(this.hover) : null, root = sel || hov;
    const selAdj = sel ? this.adj.get(sel.id) : null, rel = p => !sel || p === sel || selAdj.has(p.id);
    // 星云（噪声云团）
    ctx.save(); ctx.globalCompositeOperation = th.dark ? 'lighter' : 'source-over';
    for (const T of this.nodes) { if (T.type !== 'T' || !shown(T) || !T.mem.length) continue; const col = th.neb[T.hue % th.neb.length], al = (th.dark ? .34 : .26) * (rel(T) ? (sel === T ? 1.6 : 1) : .18);
      T.mem.forEach((m, i) => { const R = 62 * m.s * (.85 + hash(T.id + m.id) * .4), img = this._tint(i % 3, col); ctx.globalAlpha = al; ctx.drawImage(img, m.sx - R, m.sy - R * .8, R * 2, R * 1.6); });
      const R = 110 * T.s; ctx.globalAlpha = al * .8; ctx.drawImage(this._tint(T.hue % 3, col), T.sx - R, T.sy - R * .75, R * 2, R * 1.5); }
    ctx.restore();
    // 鼠标附近的光斑
    if (this.mouse && !this.drag) { const m = this.mouse, g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 140); g.addColorStop(0, th.dark ? 'rgba(233,228,216,.05)' : 'rgba(31,29,25,.035)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(m.x - 140, m.y - 140, 280, 280); }
    // 轨道
    const hiR = []; ctx.globalAlpha = 1; ctx.lineWidth = 1; ctx.strokeStyle = th.ring; ctx.beginPath();
    for (const n of this.nodes) { if (!n.o || n.type === 'E' || !shown(n) || !shown(n.par)) continue; if (root && (n === root || n.par === root)) { hiR.push(n); continue; } if (sel) continue; this._ring(n); }
    ctx.stroke(); if (hiR.length) { ctx.strokeStyle = th.ringHi; ctx.beginPath(); for (const n of hiR) this._ring(n); ctx.stroke(); }
    if (this.lines) { ctx.strokeStyle = th.all; ctx.beginPath(); for (const l of this.links) { if (l.bind || l.ev || l.mem || !shown(l.A) || !shown(l.B)) continue; ctx.moveTo(l.A.sx, l.A.sy); ctx.lineTo(l.B.sx, l.B.sy); } ctx.stroke(); }
    const cons = [];
    if (root) for (const l of this.links) { if (l.A !== root && l.B !== root) continue; const o = l.A === root ? l.B : l.A; if (!shown(o) || (o.type === 'T' && !o.mem.length)) continue; if (root.type !== 'E' && (o.type === 'E' || l.bind)) continue; cons.push([l, o]); }
    if (cons.length) {
      ctx.save(); ctx.setLineDash([2, 5]); ctx.strokeStyle = th.ringHi; ctx.lineWidth = 1; ctx.beginPath(); for (const [, o] of cons) { ctx.moveTo(root.sx, root.sy); ctx.lineTo(o.sx, o.sy); } ctx.stroke(); ctx.restore();
      for (const [l, o] of cons) { const out = l.A === root; for (let k = 0; k < 2; k++) { let f = (now / 1800 + k * .5 + hash(o.id)) % 1; if (!out) f = 1 - f; const x = root.sx + (o.sx - root.sx) * f, y = root.sy + (o.sy - root.sy) * f, al = Math.sin(f * Math.PI); ctx.globalAlpha = al; const g = ctx.createRadialGradient(x, y, 0, x, y, 5); g.addColorStop(0, hexA(th.brass, .95)); g.addColorStop(1, hexA(th.brass, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); } }
    }
    const ns = this.nodes.filter(p => p.type !== 'T' && shown(p)).sort((a, b) => b.sz - a.sz);
    for (const p of ns) { let a = p.sa; if (sel && !rel(p)) a *= .14; this._body(p, a, now); if (p === sel || p === hov) { ctx.globalAlpha = Math.max(a, .6); ctx.strokeStyle = th.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.sx, p.sy, p.sr * (p.type === 'C' ? 1.3 : 1) + 6 + (p === sel ? Math.sin(now / 300) * 1.2 : 0), 0, TAU); ctx.stroke(); } }
    // 标签：优先级 + 避让；鼠标附近放宽
    ctx.textBaseline = 'middle';
    const boxes = [], free = (x, y, w, h) => { for (const b of boxes) if (x < b[0] + b[2] && x + w > b[0] && y < b[1] + b[3] && y + h > b[1]) return false; boxes.push([x, y, w, h]); return true; };
    const ls = 'letterSpacing' in ctx; ctx.textAlign = 'center'; ctx.font = '500 10.5px "IBM Plex Mono", monospace'; if (ls) ctx.letterSpacing = '2.5px';
    for (const T of this.nodes) { if (T.type !== 'T' || !shown(T) || !T.mem.length) continue; const txt = T.label.toUpperCase(), w = ctx.measureText(txt).width, ly = T.sy - 44 * T.s, must = T === sel || T === hov || (sel && selAdj.has(T.id)); if (!free(T.sx - w / 2 - 4, ly - 8, w + 8, 16) && !must) continue; ctx.globalAlpha = rel(T) ? (T === sel || T === hov ? 1 : .85) : .18; ctx.fillStyle = th.neb[T.hue % th.neb.length]; ctx.fillText(txt, T.sx, ly); }
    if (ls) ctx.letterSpacing = '0px'; ctx.textAlign = 'left';
    const lm = 4.4 / Math.sqrt(cam.zoom), M = this.mouse, cand = [];
    for (const p of ns) {
      const isSel = p === sel, isNb = sel && selAdj.has(p.id), isHov = p === hov, near = M && !this.drag && Math.hypot(p.sx - M.x, p.sy - M.y) < 130;
      const want = isSel || isHov || isNb || near || (!sel && ((p.type === 'C' && p.sa > .22) || ((p.type === 'P' || p.type === 'M') && (p.size >= lm || cam.zoom > 1.35) && p.sa > .3) || ((p.type === 'H' || p.type === 'L') && cam.zoom > 2) || (p.type === 'E' && cam.zoom > 3.2)));
      if (want) cand.push([p, isSel || isHov ? 0 : isNb ? 1 : near ? 1.5 : p.type === 'C' ? 2 : 3, isSel, isNb, near]);
    }
    cand.sort((a, b) => a[1] - b[1] || b[0].size - a[0].size);
    for (const [p, pri, isSel, isNb, near] of cand) {
      const fs = isSel ? 14 : p.type === 'C' ? 12.5 : p.type === 'E' ? 11 : 11.5; ctx.font = `${isSel || p.type === 'C' ? 600 : 400} ${fs}px "Noto Sans SC", "PingFang SC", sans-serif`;
      const ox = p.sr * (p.type === 'C' ? 1.5 : p.type === 'M' ? 2.3 : 1) + 7, w = ctx.measureText(p.label).width;
      if (!free(p.sx + ox - 2, p.sy - fs / 2 - 2, w + 4, fs + 4) && pri > 0) continue;
      ctx.globalAlpha = sel && !isSel && !isNb ? (near ? .55 : .3) : Math.max(near ? .9 : .6, p.sa);
      const col = p.type === 'C' ? th.ink : p.type === 'E' ? (p.first ? th.brass : p.hot ? th.verm : th.muted) : th.type[p.type] || th.ink;
      ctx.lineWidth = 3; ctx.strokeStyle = th.halo; ctx.strokeText(p.label, p.sx + ox, p.sy); ctx.fillStyle = isSel ? th.ink : col; ctx.fillText(p.label, p.sx + ox, p.sy);
    }
    if (root && cons.length) { ctx.font = '400 10px "IBM Plex Mono", monospace'; ctx.globalAlpha = .95; for (const [l, o] of cons) { if (o.type === 'E') continue; const mx = (root.sx + o.sx) / 2, my = (root.sy + o.sy) / 2, rw = ctx.measureText(l.rel).width; if (!free(mx + 2, my - 7, rw + 4, 14)) continue; ctx.lineWidth = 3; ctx.strokeStyle = th.halo; ctx.strokeText(l.rel, mx + 4, my); ctx.fillStyle = th.brass; ctx.fillText(l.rel, mx + 4, my); } }
    ctx.globalAlpha = 1;
  }
}
