// 「溯」v10 视图模型 · 日报 + 首次（首屏即核心，下滑是更多数据）
import { firstCat } from './su-v9a.js';
const FCAT = ['发布', '改变', '突破', '研发', '发明', '退出'];
const FCOL = { 发布: ['var(--accentSoft)', 'var(--accent)'], 改变: ['var(--violetSoft)', 'var(--violet)'], 突破: ['var(--firstSoft)', 'var(--first)'], 研发: ['var(--warnSoft)', 'var(--warn)'], 发明: ['var(--okSoft)', 'var(--ok)'], 退出: ['var(--hotSoft)', 'var(--hot)'] };
const WK = '日一二三四五六', hh = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return (h % 1000) / 1000; };
const sod = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }, md = t => { const x = new Date(t); return `${x.getMonth() + 1}/${x.getDate()}`; };
const seg = on => ({ padding: '0 11px', height: 26, lineHeight: '26px', borderRadius: 13, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', background: on ? 'var(--card)' : 'transparent', boxShadow: on ? 'var(--sh)' : 'none', color: on ? 'var(--ink)' : 'var(--muted)', transition: 'all .3s var(--spring)' });

export function buildDaily(D, db, s, app, H) {
  const { fmtBig, fmtTime, DAY, HOUR, SRC } = D, { now, N, badge, kindLabel, stateOf, glyph } = H;
  const off = s.dayOff || 0, scope = s.dScope || 'mine', odd = (s.dFlip || 0) % 2, IN = odd ? 'su-in2' : 'su-in', POP = odd ? 'su-popin2' : 'su-popin';
  const run = app.tasks.filter(t => t.status === 'run'), ms = run.map(t => ({ t, m: D.taskMatch(t) })), tkey = run.map(t => t.id + t.ents.join('') + (t.sls || []).join('')).join('|');
  const inScope = e => scope === 'all' || ms.some(x => x.m(e));
  const dayEv = d => app.memo('dv' + d + scope + tkey, () => db.events.filter(e => e.t >= d && e.t < Math.min(d + DAY, N + 1) && inScope(e)));
  const d0 = sod(N) - off * DAY, d1 = off ? d0 + DAY : N, evs = dayEv(d0);
  const score = e => e.sig * 2 + Math.log10(e.docs + 10) + (e.first ? 1 : 0);
  const top = evs.slice().sort((p, q) => score(q) - score(p)), firsts = evs.filter(e => e.first).sort((p, q) => q.t - p.t), docs = evs.reduce((n, e) => n + e.docs, 0);
  const all = scope === 'all' ? evs : app.memo('dva' + d0, () => db.events.filter(e => e.t >= d0 && e.t < d1));
  const per = ms.map(({ t, m }) => ({ t, es: all.filter(m).sort((p, q) => q.docs - p.docs) })), act = per.filter(x => x.es.length).sort((p, q) => q.es.length - p.es.length);
  const tracksOf = e => ms.filter(x => x.m(e)).map(x => x.t.id), lineOf = e => { const x = ms.find(y => y.m(e)); return x ? x.t.name : app.slName(e.sl); };
  const flip = patch => app.setState(Object.assign({ dFlip: (s.dFlip || 0) + 1, dHov: null, dTrack: null, dN: 40 }, patch));
  const counts = Array.from({ length: 7 }, (_, i) => dayEv(sod(N) - i * DAY).length), cmx = Math.max(1, ...counts);
  const lead = top[0], dd = new Date(d0);
  // 头条
  let L = null;
  if (lead) {
    const ser = D.spreadSeries(lead, N, 36), tot = ser.reduce((a, x) => a + (x || 0), 0) || 1; let cum = 0; const pts = [];
    ser.forEach((x, q) => { if (x == null) return; cum += x; pts.push((q / 35 * 200).toFixed(1) + ',' + (46 - cum / tot * 42).toFixed(1)); });
    const [st, sc] = stateOf(lead), last = ser.filter(x => x != null).slice(-1)[0] || 0;
    L = { kind: kindLabel(lead), badge: badge(lead), state: st, stateStyle: { fontSize: 12, color: sc, display: 'flex', alignItems: 'center', gap: 6 }, time: fmtTime(lead.t, now).split(' ').pop(), line: lineOf(lead), title: lead.title,
      sum: `${lead.by} 首报，随后 ${lead.srcN.toLocaleString()} 个来源跟进${lead.hot ? '，到现在还在发酵' : D.settled(lead, N) ? '，讨论已经平息' : '，仍在扩散'}。`,
      live: app.ce(app.LiveCount, { v: lead.docs, rate: lead.hot && !off ? last / 2250 : 0 }), srcN: lead.srcN.toLocaleString(),
      path: pts.length ? 'M' + pts.join('L') : 'M0,46', pathStyle: { fill: 'none', stroke: lead.hot ? 'var(--hot)' : 'var(--accent)', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 1, strokeDashoffset: s.anim ? 0 : 1, transition: 'stroke-dashoffset 1.4s .2s cubic-bezier(.2,.8,.2,1)' },
      srcs: Object.entries(lead.mix).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t, v], q) => ({ g: SRC[t].g, glyph: glyph(t, 18), name: SRC[t].name, n: fmtBig(v), style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 9px 0 4px', borderRadius: 8, background: 'var(--sub)', fontSize: 11.5, color: 'var(--ink2)', whiteSpace: 'nowrap', animation: `${POP} .45s ${250 + q * 60}ms both var(--spring)` } })),
      open: () => app.openEv(lead.id), ask: ev => { ev.stopPropagation(); app.openAsk(app.evCtx(lead)); }, anim: { display: 'flex', flexDirection: 'column', minHeight: 0, flex: 'none', animation: `${IN} .5s both ease-out` } };
  }
  const pts = [];
  top.slice(1, 3).forEach(e => pts.push({ lead: e.first ? e.first : '另外', text: e.title, meta: fmtBig(e.docs) + ' 篇' + (e.hot ? ' · 发酵中' : ''), open: () => app.openEv(e.id) }));
  if (act[0]) pts.push({ lead: '最热闹的追踪', text: `「${act[0].t.name}」这天 ${act[0].es.length} 件事` + (act[1] ? `，其次是「${act[1].t.name}」${act[1].es.length} 件` : ''), meta: '', open: () => app.openTask(act[0].t.id) });
  const rum = top.find(e => e.kind === 'rum' && e !== lead); if (rum) { const c = D.credOf(rum); pts.push({ lead: '还没证实', text: rum.title, meta: '可信度' + (c < .3 ? '低' : c < .55 ? '中等' : '较高'), open: () => app.openEv(rum.id) }); }
  // 各条线的今天
  const groups = (scope === 'mine' ? act.map(x => ({ id: x.t.id, name: x.t.name, es: x.es, go: () => app.openTask(x.t.id), goLabel: `打开「${x.t.name}」追踪 →` }))
    : (() => { const m = new Map(); for (const e of evs) { const k = e.sl || '_'; if (!m.has(k)) m.set(k, []); m.get(k).push(e); } return [...m.entries()].map(([k, es]) => ({ id: k, name: k === '_' ? '其他' : app.slName(k), es: es.sort((p, q) => q.docs - p.docs), go: k === '_' ? null : () => app.openStory(k), goLabel: '看这条线的来龙去脉 →' })).sort((p, q) => q.es.length - p.es.length); })()).slice(0, 10);
  const gOpen = s.dGrp && groups.some(g => g.id === s.dGrp) ? s.dGrp : groups[0] && groups[0].id;
  const tag = (l, bg, c) => ({ label: l, style: { fontSize: 11, padding: '1px 7px', borderRadius: 6, background: bg, color: c, whiteSpace: 'nowrap', flex: 'none' } });
  const grps = groups.map((g, i) => { const on = g.id === gOpen, hot = g.es.filter(e => e.hot).length, fN = g.es.filter(e => e.first).length, top = g.es[0];
    const tags = []; if (fN) tags.push(tag(fN + ' 次首次', 'var(--firstSoft)', 'var(--first)')); if (hot) tags.push(tag(hot + ' 件发酵中', 'var(--hotSoft)', 'var(--hot)'));
    return { name: g.name, n: String(g.es.length), tags, top: top.title, topMeta: `${fmtTime(top.t, now).split(' ').pop()} · ${fmtBig(top.docs)} 篇`, openTop: ev => { ev.stopPropagation(); app.openEv(top.id); },
      enter: () => { if (app.state.dGrp !== g.id) app.setState({ dGrp: g.id }); },
      more: g.es.slice(1, 5).map(e => ({ time: fmtTime(e.t, now).split(' ').pop(), title: e.title, docs: fmtBig(e.docs), open: ev => { ev.stopPropagation(); app.openEv(e.id); } })),
      rest: g.es.length > 5 ? `还有 ${g.es.length - 5} 件 · ` : '', hasGo: !!g.go, go: ev => { ev.stopPropagation(); g.go && g.go(); }, goLabel: g.goLabel,
      dot: { width: 8, height: 8, borderRadius: '50%', flex: 'none', background: hot ? 'var(--hot)' : 'var(--accent)', boxShadow: on ? `0 0 0 4px ${hot ? 'var(--hotSoft)' : 'var(--accentSoft)'}` : 'none', transition: 'box-shadow .3s' },
      body: { display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', opacity: on ? 1 : 0, transition: 'grid-template-rows .45s var(--spring), opacity .3s' },
      style: { padding: '10px 12px', borderRadius: 14, background: on ? 'var(--sub)' : 'transparent', transition: 'background .3s', animation: `${IN} .45s ${i * 50}ms both ease-out`, flex: 'none' } }; });
  const fullN = s.dN || 40, full = evs.slice().sort((p, q) => q.t - p.t);
  return { dy: {
    title: `${dd.getMonth() + 1} 月 ${dd.getDate()} 日`, wk: '星期' + WK[dd.getDay()] + (off === 0 ? ' · 今天' : off === 1 ? ' · 昨天' : ''), titleStyle: { display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4, animation: `${IN} .45s both ease-out` },
    meta: (off ? '' : '到此刻为止 · ') + `${evs.length} 件事 · ${fmtBig(docs)} 篇原文 · ${firsts.length} 次首次`,
    days: counts.map((c, i) => { const t = sod(N) - i * DAY, x = new Date(t), on = i === off; return { wk: i === 0 ? '今天' : i === 1 ? '昨天' : '周' + WK[x.getDay()], d: String(x.getDate()), go: () => { if (i !== off) flip({ dayOff: i }); }, bar: { height: 3, borderRadius: 2, width: Math.max(10, c / cmx * 100) + '%', background: on ? 'currentColor' : 'var(--accent)', opacity: on ? .7 : .45, transition: 'width .6s var(--spring)' },
      style: { width: 50, height: 62, boxSizing: 'border-box', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '0 8px', cursor: 'pointer', userSelect: 'none', background: on ? 'var(--ink)' : 'var(--card)', color: on ? 'var(--card)' : 'var(--ink)', boxShadow: on ? '0 8px 20px rgba(20,22,30,.18)' : 'var(--sh)', transform: on ? 'translateY(-4px)' : 'none', transition: 'all .4s var(--spring)', animation: `su-in .4s ${(6 - i) * 35}ms backwards ease-out` } }; }).reverse(),
    scopes: [['mine', '我追踪的'], ['all', '全部']].map(([k, l]) => ({ label: l, go: () => { if (k !== scope) flip({ dScope: k }); }, style: seg(scope === k) })),
    hasLead: !!L, lead: L || {}, noLead: !L, quiet: scope === 'mine' ? '这一天你追踪的线都很安静。切到「全部」看看别处。' : '这一天没有收录到事件。',
    points: pts.map((p, i) => Object.assign(p, { n: String(i + 2), hasMeta: !!p.meta, style: { display: 'grid', gridTemplateColumns: '24px minmax(0,1fr)', gap: 10, padding: '8px 10px', margin: '0 -10px', borderRadius: 10, cursor: 'pointer', transition: 'background .2s, transform .35s var(--spring)', animation: `${IN} .45s ${200 + i * 70}ms both ease-out` } })),
    evN: evs.length + ' 件', grps, noGrps: !grps.length, gTitle: scope === 'mine' ? '你追踪的线，这天各发生了什么' : '各条线，这天各发生了什么',
    firstN: String(firsts.length), hasFirsts: firsts.length > 0, noFirsts: !firsts.length,
    firsts: firsts.slice(0, 4).map((e, i) => { const c = firstCat(e), [bg, col] = FCOL[c] || FCOL['突破']; return { cat: '首次' + c, title: e.title, open: () => app.openEv(e.id), dia: { width: 10, height: 10, borderRadius: 2, transform: 'rotate(45deg)', background: col, flex: 'none' }, catStyle: { fontSize: 11, fontWeight: 600, color: col }, style: { flex: '1 1 0', minWidth: 0, padding: '10px 12px', borderRadius: 12, background: bg, cursor: 'pointer', transition: 'transform .4s var(--spring)', animation: `${POP} .5s ${i * 80}ms both var(--spring)` } }; }),
    ask: () => { app.openAsk(null); setTimeout(() => app.ask(`${off ? md(d0) : '今天'}最重要的是什么？`), 200); },
    goFirsts: () => app.go('firsts'),
    fullCap: `这一天的全部 ${evs.length} 件`, full: full.slice(0, fullN).map((e, i) => ({ time: fmtTime(e.t, now).split(' ').pop(), kind: kindLabel(e), badge: badge(e), title: e.title, line: lineOf(e), docs: fmtBig(e.docs) + ' 篇', open: () => app.openEv(e.id), style: { display: 'grid', gridTemplateColumns: '48px auto minmax(0,1fr) auto auto', gap: 12, alignItems: 'center', padding: '10px 14px', borderRadius: 10, cursor: 'pointer', transition: 'background .2s' } })),
    hasMore: full.length > fullN, more: () => app.setState({ dN: fullN + 40 }), moreLabel: `再看 ${Math.min(40, full.length - fullN)} 件`,
  } };
}

const FDESC = { 发布: '第一次推出某个产品或功能', 改变: '第一次调整定价、策略或方向', 突破: '第一次达到某个指标或纪录', 研发: '第一次公开在研项目或研究', 发明: '第一次提出新方法或新形态', 退出: '第一次停止、关闭或离开' };
export function buildFirsts(D, db, s, app, H) {
  const { fmtBig, DAY } = D, { N } = H, scope = s.fScope || 'all', R = s.fRange || 365, cat = s.fCat || null, ent = s.fEnt || null, sort = s.fSort || 'new', T0 = N - R * DAY, lim = s.fN || 60;
  const ms = app.tasks.filter(t => t.status === 'run').map(t => ({ t, m: D.taskMatch(t) }));
  const base = app.memo('fb' + R + scope + ms.map(x => x.t.id).join(), () => db.events.filter(e => e.first && e.t >= T0).map(e => ({ e, c: firstCat(e), tk: ms.find(x => x.m(e)) })).filter(x => scope === 'all' || x.tk));
  const pool = ent ? base.filter(x => x.e.ents.includes(ent)) : base, list0 = pool.filter(x => !cat || x.c === cat);
  const list = sort === 'big' ? list0.slice().sort((p, q) => q.e.docs - p.e.docs) : list0.slice().sort((p, q) => q.e.t - p.e.t);
  const reset = patch => app.setState(Object.assign({ fSel: null, fN: 60 }, patch));
  let groups;
  if (sort === 'ent') { const m = new Map(); for (const x of list) { const k = x.e.ents[0] || '_'; if (!m.has(k)) m.set(k, []); m.get(k).push(x); } groups = [...m.entries()].sort((p, q) => q[1].length - p[1].length).map(([k, its]) => ({ id: k, label: (db.ent.get(k) || {}).name || '未识别主体', n: its.length + ' 次', its })); }
  else groups = [{ id: '', label: '', n: '', its: list }];
  const flat = groups.flatMap(g => g.its), si = Math.max(0, flat.findIndex(x => x.e.id === s.fSel)), sel = flat[si], odd = si % 2, IN = odd ? 'su-in2' : 'su-in';
  let budget = lim; const gOut = [];
  for (const g of groups) { if (budget <= 0) break; const its = g.its.slice(0, budget); budget -= its.length;
    gOut.push({ label: g.label, n: g.n, hasLabel: !!g.label, pick: () => reset({ fEnt: g.id === '_' ? null : g.id, fSort: 'new' }), items: its.map(x => { const d = new Date(x.e.t), [bg, c] = FCOL[x.c], on = sel && sel.e === x.e;
      return { md: `${d.getMonth() + 1}/${d.getDate()}`, yr: String(d.getFullYear()), cat: '首次' + x.c, title: x.e.title, who: x.e.ents.map(id => db.ent.get(id)).filter(Boolean).slice(0, 2).map(e => e.name).join(' · '), docs: fmtBig(x.e.docs) + ' 篇',
        sel: () => app.setState({ fSel: x.e.id }), catStyle: { fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 6, background: bg, color: c, flex: 'none', whiteSpace: 'nowrap' },
        style: { display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '9px 12px', borderRadius: 12, cursor: 'pointer', background: on ? 'var(--sub)' : 'transparent', boxShadow: on ? 'inset 0 0 0 1px var(--line2)' : 'none', transform: on ? 'translateX(4px)' : 'none', transition: 'background .2s, transform .35s var(--spring)' } }; }) }); }
  const tiles = FCAT.map((c, i) => { const its = pool.filter(x => x.c === c), on = cat === c, [bg, col] = FCOL[c], last = its.reduce((m, x) => !m || x.e.t > m.e.t ? x : m, null);
    return { label: '首次' + c, desc: FDESC[c], n: app.ce(app.CountUp, { v: its.length }), last: last ? '最近：' + last.e.title : '这段时间没有', go: () => reset({ fCat: on ? null : c }),
      dia: { width: 9, height: 9, borderRadius: 2, transform: 'rotate(45deg)', background: on ? '#fff' : col, flex: 'none' },
      nStyle: { font: '600 26px/1 var(--sans)', letterSpacing: '-.02em', marginTop: 8, color: on ? '#fff' : col },
      subStyle: { fontSize: 11.5, lineHeight: 1.45, color: on ? 'rgba(255,255,255,.85)' : 'var(--muted)', marginTop: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
      style: { flex: '1 1 0', minWidth: 0, padding: '12px 14px', borderRadius: 16, cursor: 'pointer', userSelect: 'none', background: on ? col : 'var(--card)', color: on ? '#fff' : 'var(--ink)', boxShadow: on ? '0 10px 24px rgba(20,22,30,.16)' : 'var(--sh)', transform: on ? 'translateY(-3px)' : 'none', opacity: cat && !on ? .55 : 1, transition: 'all .4s var(--spring)', animation: `su-in .4s ${i * 45}ms backwards ease-out` } }; });
  let sp = { has: false };
  if (sel) { const e = sel.e, [bg, col] = FCOL[sel.c], ents = e.ents.map(id => db.ent.get(id)).filter(Boolean), e0 = ents[0], d = new Date(e.t);
    const hist = e0 ? app.memo('fh' + e.id, () => db.events.filter(x => x !== e && x.t < e.t && x.t > e.t - 365 * DAY && x.ents.includes(e0.id)).length) : 0;
    const r = k => { let h = 0; for (const c of e.id + k) h = (h * 31 + c.charCodeAt(0)) >>> 0; return (h % 1000) / 1000; }, sim = Math.floor(30 + r('s') * 30) / 100, ago = Math.round((N - e.t) / DAY);
    sp = { has: true, cat: '首次' + sel.c, catStyle: { display: 'inline-flex', alignItems: 'center', gap: 7, height: 26, padding: '0 11px', borderRadius: 13, background: bg, color: col, fontSize: 12, fontWeight: 600 }, dia: { width: 8, height: 8, borderRadius: 2, transform: 'rotate(45deg)', background: col },
      day: String(d.getDate()), ym: `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 · 周${WK[d.getDay()]}`, ago: ago ? ago + ' 天前' : '今天', title: e.title,
      who: ents.slice(0, 4).map(x => ({ name: x.name, go: () => app.selectEntity(x.id) })),
      reason: e0 ? `过去 365 天里，「${e0.name}」有 ${hist} 件相关事件，没有一件属于同类。` : '过去 365 天里没有同类事件。',
      sim: sim.toFixed(2), simFill: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 4, background: col, width: s.anim ? sim * 100 + '%' : '0%', transition: 'width .9s .15s cubic-bezier(.2,.8,.2,1)' },
      src: `${e.by} 首报 · ${e.srcN.toLocaleString()} 个来源跟进 · ${fmtBig(e.docs)} 篇`, track: sel.tk ? `在你的「${sel.tk.t.name}」追踪里` : '不在你的追踪里', trackStyle: { fontSize: 12, color: sel.tk ? 'var(--ok)' : 'var(--muted)' },
      open: () => app.openEv(e.id), ask: () => app.openAsk(app.evCtx(e)), graph: () => e0 && app.selectEntity(e0.id),
      pos: `${si + 1} / ${flat.length}`, newer: () => si > 0 && app.setState({ fSel: flat[si - 1].e.id }), older: () => si < flat.length - 1 && app.setState({ fSel: flat[si + 1].e.id }),
      anim: { display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', paddingRight: 6, scrollbarGutter: 'stable', animation: `${IN} .4s both ease-out` } }; }
  // 主体 × 类型
  const ec = new Map(); for (const x of base) for (const id of x.e.ents.slice(0, 2)) { if (!db.ent.get(id)) continue; if (!ec.has(id)) ec.set(id, Object.fromEntries(FCAT.map(c => [c, 0]))); ec.get(id)[x.c]++; }
  const rows = [...ec.entries()].map(([id, m]) => ({ id, m, tot: FCAT.reduce((n, c) => n + m[c], 0) })).sort((p, q) => q.tot - p.tot).slice(0, 18), cmx = Math.max(1, ...rows.flatMap(r => FCAT.map(c => r.m[c])));
  const toTop = ev => { let n = ev.currentTarget; while (n && !(n.scrollTop > 0)) n = n.parentElement; if (n) n.scrollTo({ top: 0, behavior: 'smooth' }); };
  const entName = ent ? (db.ent.get(ent) || {}).name : '';
  return { fs: {
    total: app.ce(app.CountUp, { v: list.length }), totalCap: `条首次记录 · ${R === 365 ? '近一年' : '近 ' + R + ' 天'}${cat ? ' · 首次' + cat : ''}`,
    scopes: [['all', '全部'], ['mine', '我追踪的']].map(([k, l]) => ({ label: l, go: () => reset({ fScope: k }), style: seg(scope === k) })),
    ranges: [[30, '30 天'], [90, '90 天'], [365, '一年']].map(([k, l]) => ({ label: l, go: () => reset({ fRange: k }), style: seg(R === k) })),
    sorts: [['new', '最新'], ['big', '影响最大'], ['ent', '按主体']].map(([k, l]) => ({ label: l, go: () => reset({ fSort: k }), style: seg(sort === k) })),
    tiles, groups: gOut, hasMore: flat.length > lim, more: () => app.setState({ fN: lim + 60 }), moreLabel: `再看 ${Math.min(60, flat.length - lim)} 条`,
    hasEnt: !!ent, entName, clearEnt: () => reset({ fEnt: null }),
    sp, hasSp: sp.has, noSp: !sp.has, noList: !list.length,
    cats: FCAT.map(c => ({ label: c, style: { textAlign: 'center', fontSize: 11.5, color: FCOL[c][1], fontWeight: 600 } })),
    matrix: rows.map((r, i) => { const e = db.ent.get(r.id); return { name: e.name, type: D.TYPE_NAME[e.type] || '', tot: String(r.tot), go: ev => { reset({ fEnt: r.id, fSort: 'new', fCat: null }); toTop(ev); },
      cells: FCAT.map(c => { const v = r.m[c], [bg, col] = FCOL[c], z = v ? Math.round(10 + v / cmx * 18) : 4; return { v: v ? String(v) : '', title: `${e.name} · 首次${c} ${v} 次`, dot: { width: z, height: z, borderRadius: '50%', background: v ? bg : 'var(--line)', boxShadow: v ? `inset 0 0 0 1.5px ${col}` : 'none', color: col, font: '600 10.5px var(--mono)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .35s var(--spring)', animation: `su-popin .45s ${Math.min(i, 12) * 30}ms both var(--spring)` } }; }),
      style: { display: 'grid', gridTemplateColumns: 'minmax(120px,1.4fr) repeat(6,minmax(0,1fr)) 56px', gap: 8, alignItems: 'center', padding: '8px 14px', borderRadius: 12, cursor: 'pointer', transition: 'background .2s' } }; }),
    matrixCap: `谁的首次最多 · 前 ${rows.length} 个主体`,
  } };
}
