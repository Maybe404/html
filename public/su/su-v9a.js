// 「溯」v9 视图模型 · 日报 + 首次 · 公共工具 + 首页 + 事件溯源 + 随处问 + 读取状态
export function helpers(D, db, s, app) {
  const { fmtTime, fmtBig, KIND_NAME, SRC } = D, now = Date.now(), N = db.now;
  const pad = n => String(n).padStart(2, '0'), md = t => { const d = new Date(t); return `${d.getMonth() + 1}/${d.getDate()}`; };
  const slName = id => app.slName(id);
  const glyph = (t, sz = 18) => { const c = (SRC[t] || SRC.x).c; return { width: sz, height: sz, borderRadius: Math.round(sz * .3), background: c + '24', color: c, font: `600 ${sz < 20 ? 9 : 10.5}px var(--mono)`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', letterSpacing: '-.02em' }; };
  const KB = { rel: ['var(--accentSoft)', 'var(--accent)'], launch: ['var(--accentSoft)', 'var(--accent)'], upd: ['var(--hover)', 'var(--ink2)'], rum: ['var(--warnSoft)', 'var(--warn)'], fund: ['var(--okSoft)', 'var(--ok)'], coop: ['var(--okSoft)', 'var(--ok)'], rev: ['var(--violetSoft)', 'var(--violet)'], pol: ['var(--hover)', 'var(--ink2)'], hr: ['var(--hover)', 'var(--ink2)'], inc: ['var(--hotSoft)', 'var(--hot)'] };
  const badge = e => { const [bg, c] = e.first ? ['var(--firstSoft)', 'var(--first)'] : KB[e.kind] || KB.upd; return { fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: bg, color: c, flex: 'none', whiteSpace: 'nowrap' }; };
  const kindLabel = e => e.first || KIND_NAME[e.kind];
  const sparkOf = (e, w = 100, h = 28) => { const ser = D.spreadSeries(e, N, 36), mx = Math.max(1, ...ser.filter(v => v != null)); let d = `M0,${h}`, last = 0; ser.forEach((v, i) => { if (v == null) return; last = i; d += `L${(i / 35 * w).toFixed(1)},${(h - v / mx * (h - 3)).toFixed(1)}`; }); return d + `L${(last / 35 * w).toFixed(1)},${h}Z`; };
  const mixBars = e => Object.entries(e.mix).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([t, v]) => ({ style: { flexGrow: v, flexBasis: 0, minWidth: 2, background: SRC[t].c, opacity: .8 } }));
  const stateOf = e => e.hot ? ['发酵中', 'var(--hot)'] : D.settled(e, N) ? ['已平息', 'var(--faint)'] : ['扩散中', 'var(--accent)'];
  const evRow = (e, i = 0) => { const read = !!s.read[e.id], [st, sc] = stateOf(e); return {
    id: e.id, time: fmtTime(e.t, now).replace('今天 ', ''), kind: kindLabel(e), badge: badge(e), title: e.title,
    titleStyle: { fontSize: 14, fontWeight: read ? 400 : 550, color: read ? 'var(--muted)' : 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color .6s' },
    sl: slName(e.sl), by: e.by.split(' · ').slice(1).join(' · ') || e.by, firstG: SRC[e.firstType].g, firstGlyph: glyph(e.firstType, 16),
    docs: fmtBig(e.docs) + ' 篇', types: Object.values(e.mix).filter(v => v > 0).length + ' 类', mix: mixBars(e), spark: sparkOf(e),
    sparkStyle: { fill: e.hot ? 'var(--hot)' : 'var(--accent)', opacity: e.hot ? .5 : .28 }, state: st, stateStyle: { fontSize: 11, color: sc, display: 'flex', alignItems: 'center', gap: 5 },
    rowStyle: { display: 'grid', gridTemplateColumns: '46px minmax(140px,1fr) minmax(0,110px) 64px', gap: 12, alignItems: 'center', padding: '11px 14px', borderRadius: 12, cursor: 'pointer', transition: 'background .2s, transform .3s var(--spring)', animation: `su-in .45s ${Math.min(i, 14) * 35}ms both ease-out` },
    open: () => app.openEv(e.id), ask: ev => { ev && ev.stopPropagation(); app.openAsk(app.evCtx(e)); } }; };
  return { now, N, pad, md, slName, glyph, badge, kindLabel, sparkOf, mixBars, stateOf, evRow };
}

export function buildHome(D, db, s, app, H) {
  const { fmtTime, fmtBig, SCALE, HOUR, DAY, SRC } = D, { now, N, glyph, badge, kindLabel, stateOf } = H;
  const nowM = Math.floor(now / 60000) * 60000, since = s.lastSync || N - DAY, frac = Math.max(.02, (nowM - since) / HOUR) / 24;
  const tasks = app.tasks.filter(t => t.status === 'run'), ms = tasks.map(t => D.taskMatch(t));
  const matched = app.memo('home' + since + ':' + tasks.map(t => t.id + t.ents.join('') + (t.types || []).join('')).join('|'), () => db.events.filter(e => e.t >= since && ms.some(m => m(e))).sort((a, b) => b.t - a.t));
  const score = e => e.sig + (e.first ? .5 : 0) + (e.hot ? .3 : 0);
  let items = matched.filter(e => e.first || e.hot || e.sig >= .62).sort((a, b) => score(b) - score(a));
  if (items.length < 4) items = items.concat(matched.filter(e => !items.includes(e)).sort((a, b) => b.docs - a.docs).slice(0, 4 - items.length));
  items = items.slice(0, 12); app._deckIds = items.map(e => e.id);
  const di = Math.min(s.deckI, items.length), ago = t => { const m = Math.max(1, Math.round((now - t) / 60000)); return m < 60 ? m + ' 分钟前' : m < 1440 ? Math.round(m / 60) + ' 小时前' : Math.round(m / 1440) + ' 天前'; };
  const gMin = Math.round((nowM - since) / 60000), gapTxt = gMin >= 2880 ? `${Math.floor(gMin / 1440)} 天` : gMin >= 60 ? `${Math.floor(gMin / 60)} 小时` : `${gMin} 分钟`;
  const hr = new Date(now).getHours(), hello = hr < 5 ? '夜深了' : hr < 11 ? '早上好' : hr < 14 ? '中午好' : hr < 18 ? '下午好' : '晚上好';
  const conn = ['最值得看的是', '其次，', '另外，', '还有，'];
  const brief = items.slice(0, 3).map((e, k) => {
    const names = e.ents.map(id => db.ent.get(id)).filter(x => x && e.title.includes(x.name)).map(x => x.name).sort((a, b) => b.length - a.length);
    let segs = [{ text: e.title, ent: false }];
    for (const nm of names) segs = segs.flatMap(g => g.ent ? [g] : g.text.split(nm).flatMap((p, q, arr) => q < arr.length - 1 ? [{ text: p, ent: false }, { text: nm, ent: true }] : [{ text: p, ent: false }])).filter(g => g.text);
    const on = k === di;
    return { segs: [{ text: conn[k] + (k ? '' : '：'), ent: false, pre: true }, ...segs].map(g => ({ text: g.text, style: g.ent ? { color: 'var(--accent)', fontWeight: 550 } : g.pre ? { color: 'var(--muted)' } : {} })),
      meta: `（${fmtBig(e.docs)} 篇${e.hot ? '，还在发酵' : ''}）`, metaStyle: { fontSize: 13, color: 'var(--faint)' },
      go: () => app.openEv(e.id), hover: () => { if (app.state.deckI !== k) app.setState({ deckI: k, deckDir: 1 }); },
      style: { cursor: 'pointer', borderRadius: 6, padding: '2px 0', color: on ? 'var(--ink)' : 'var(--ink2)', background: on ? 'var(--accentSoft2)' : 'transparent', transition: 'background .3s, color .3s', animation: `su-fade .6s ${250 + k * 160}ms both ease-out` } };
  });
  const deck = items.map((e, k) => {
    const d = k - di, [st] = stateOf(e), ser = D.spreadSeries(e, N, 36); let cum = 0; const pts = []; const tot = ser.reduce((a, x) => a + (x || 0), 0) || 1;
    ser.forEach((x, q) => { if (x == null) return; cum += x; pts.push([(q / 35 * 200).toFixed(1), (48 - cum / tot * 44).toFixed(1)]); });
    const last = ser.filter(x => x != null).slice(-1)[0] || 0, rate = e.hot && d === 0 ? last / 2250 : 0;
    const tf = d < 0 ? `translateX(${(s.deckDir || 1) * -125}%) rotate(${(s.deckDir || 1) * -8}deg)` : d === 0 ? 'none' : d === 1 ? 'translateY(9px) scale(.965)' : 'translateY(17px) scale(.93)';
    return { kind: kindLabel(e), badge: badge(e), hot: e.hot, sl: app.slName(e.sl), ago: ago(e.t), title: e.title,
      live: app.ce(app.LiveCount, { v: e.docs, rate }), srcN: e.srcN.toLocaleString(), liveCap: e.hot ? ' · 仍在增加' : st === '已平息' ? ' · 已平息' : '',
      line: pts.length ? 'M' + pts.map(p => p.join(',')).join('L') : 'M0,48', lineStyle: { fill: 'none', stroke: e.hot ? 'var(--hot)' : 'var(--accent)', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 1, strokeDashoffset: s.anim ? 0 : 1, transition: 'stroke-dashoffset 1.4s .25s cubic-bezier(.2,.8,.2,1)' },
      srcs: Object.entries(e.mix).filter(([, x]) => x > 0).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t, x], q) => ({ g: SRC[t].g, glyph: glyph(t, 18), name: SRC[t].name, n: fmtBig(x), style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px 0 5px', borderRadius: 9, background: 'var(--sub)', fontSize: 12, color: 'var(--ink2)', opacity: 1, transform: 'none', transition: `opacity .4s ${300 + q * 70}ms, transform .5s ${300 + q * 70}ms var(--spring)` } })),
      by: e.by, chain: d < -1 || d > 3 ? [] : (() => { const docs = D.docsOf(db, e, 0, null, 25).docs, out = [], seen = new Set(); for (const dd of docs) { if (out.length >= 4) break; if (out.length && seen.has(dd.type)) continue; seen.add(dd.type); out.push(dd); } return out; })().map((dd, q) => ({ g: SRC[dd.type].g, glyph: glyph(dd.type, 18), src: dd.src, title: dd.title, rel: dd.first ? '首报' : '+' + ((dd.t - e.t) / HOUR).toFixed(1) + 'h', style: { display: 'flex', alignItems: 'center', gap: 9, height: 28, width: '100%', flex: 'none', boxSizing: 'border-box', opacity: 1, transform: 'none', transition: `opacity .4s ${300 + q * 90}ms, transform .5s ${300 + q * 90}ms var(--spring)` } })),
      inner: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 },
      open: () => app.openEv(e.id), ask: () => app.openAsk(app.evCtx(e)), down: ev => app.deckDown(ev, k),
      style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 18, display: 'flex', flexDirection: 'column', padding: '16px 20px 14px', boxSizing: 'border-box', borderRadius: 20, background: 'var(--card)', boxShadow: d === 0 ? 'var(--shCard)' : '0 0 0 1px var(--line)', transform: tf, transformOrigin: 'center bottom', opacity: d < 0 || d > 2 ? 0 : 1, zIndex: 50 - Math.abs(d), transition: 'transform .5s cubic-bezier(.22,.9,.3,1), opacity .35s ease', willChange: d >= -1 && d <= 3 ? 'transform, opacity' : 'auto', backfaceVisibility: 'hidden', cursor: d === 0 ? 'grab' : 'default', touchAction: 'pan-y', userSelect: 'none', pointerEvents: d === 0 ? 'auto' : 'none', overflow: 'hidden' },
      hotDot: { position: 'relative', width: 6, height: 6 } };
  });
  const tdocs = matched.reduce((a, e) => a + e.docs, 0);
  const tinfo = tasks.map(t => { const evs = app.memo('tev' + t.id + t.ents.join(',') + (t.sls || []).join(','), () => { const m = D.taskMatch(t); return db.events.filter(e => m(e) && e.t > N - 4 * DAY).sort((a, b) => b.t - a.t); }); return { t, evs, recent: evs.filter(e => e.t >= since).length }; }).sort((a, b) => b.recent - a.recent || (b.evs[0] ? b.evs[0].t : 0) - (a.evs[0] ? a.evs[0].t : 0));
  const threads = tinfo.slice(0, 4).map(({ t, evs }, k) => { const hv = s.thrH === t.id, fresh = evs.filter(e => e.t >= since && !s.read[e.id]).length, last = evs[0];
    return { name: t.name, newN: fresh, hasNew: fresh > 0, total: evs.length + ' 件', latest: last ? last.title : '这几天很安静', ago: last ? ago(last.t) + ' · ' + fmtBig(last.docs) + ' 篇' : '', go: () => app.openTask(t.id), enter: () => { clearTimeout(app.thrT); if (app.state.thrH !== t.id) app.setState({ thrH: t.id }); }, leave: () => { clearTimeout(app.thrT); app.thrT = setTimeout(() => app.setState({ thrH: null }), 80); }, bodyStyle: { flex: 1, minHeight: 0, overflowY: hv ? 'auto' : 'hidden', overflowX: 'hidden', overscrollBehavior: 'contain', padding: '8px 14px 12px' }, latestOpen: ev => { ev.stopPropagation(); if (last) app.openEv(last.id); },
      more: evs.slice(1, 30).map(e => ({ title: e.title, ago: ago(e.t), open: ev => { ev.stopPropagation(); app.openEv(e.id); } })), hasMore: evs.length > 1, moreCap: `4 天内其余 ${evs.length - 1} 件`,
      dot: { width: 7, height: 7, borderRadius: '50%', flex: 'none', background: fresh ? 'var(--ok)' : 'var(--faint)', animation: fresh ? 'su-breath 2s ease-in-out infinite' : 'none' },
      newStyle: { flex: 'none', fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'var(--accentSoft)', padding: '1px 7px', borderRadius: 8 },
      style: { flex: '1 1 0', minWidth: 0, height: hv ? 300 : 100, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', borderRadius: 14, background: 'var(--card)', boxShadow: hv ? 'var(--sh2)' : 'var(--sh)', overflow: 'hidden', cursor: 'pointer', transition: 'height .45s cubic-bezier(.22,.9,.3,1), box-shadow .3s', animation: `su-fade .4s ${120 + k * 50}ms both ease-out` } }; });
  app._homeStats = { matched: matched.length, items: items.length, since };
  return {
    greet: items.length ? `${hello}。这 ${gapTxt}里，有 ${items.length} 件事值得你看。` : `${hello}。这 ${gapTxt}里，你追踪的线都很安静。`,
    greetMeta: `距上次查看 ${gapTxt} · 读了 ${fmtBig(SCALE.dayDocs * frac)} 篇原文 · 命中你的追踪 ${matched.length} 件`, brief,
    markAll: () => app.markAll(items), askBrief: () => { app.openAsk(null); setTimeout(() => app.ask('过去 24 小时最重要的是什么？'), 200); },
    deck, deckPos: di < items.length ? `${di + 1} / ${items.length}` : `${items.length} / ${items.length}`, deckDone: di >= items.length, deckReset: () => app.setState({ deckI: 0, deckDir: -1 }),
    deckPrev: () => app.deckStep(-1), deckNext: () => app.deckStep(1), stop: e => e.stopPropagation(),
    deckDots: items.map((e, k) => ({ go: () => app.setState({ deckI: k, deckDir: k > di ? 1 : -1 }), style: { width: k === di ? 18 : 6, height: 6, borderRadius: 3, background: k === di ? 'var(--accent)' : k < di ? 'var(--line2)' : 'var(--faint)', opacity: k < di ? .6 : 1, cursor: 'pointer', transition: 'width .45s var(--spring), background .3s' } })),
    threads, newTask: () => app.newTask(), docsLine: fmtBig(tdocs), taskCount: app.tasks.length, openSys: () => app.setState({ sysOpen: true }),
  };
}

export function buildEvent(D, db, s, app, H) {
  const ev = db.events.find(e => e.id === s.ev); if (!ev) return null;
  const { fmtTime, fmtBig, fmtN, SRC, KIND_NAME, HOUR } = D, { now, N, glyph, badge, kindLabel, stateOf, md } = H;
  const page = D.docsOf(db, ev, s.evPage, s.evType, 25), [st, sc] = stateOf(ev), ser = D.spreadSeries(ev, N, 36), smx = Math.max(1, ...ser.filter(v => v != null));
  const ents = ev.ents.map(id => db.ent.get(id)).filter(Boolean), rr = k => { let h = 0; for (const c of ev.id + k) h = (h * 31 + c.charCodeAt(0)) >>> 0; return (h % 1000) / 1000; };
  const mixE = Object.entries(ev.mix).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]), mmax = mixE[0][1];
  const first = D.docsOf(db, ev, 0, null, 1).docs[0];
  const kinds = [[ev.kind, .82 + rr('k') * .15], ...Object.keys(KIND_NAME).filter(k => k !== ev.kind).slice(0, 2).map((k, i) => [k, (1 - .85) * (i ? .3 : .6) * rr(k)])];
  const pages = Math.ceil(page.total / 25);
  return {
    id: ev.id, kind: kindLabel(ev), badge: badge(ev), meta: `${app.slName(ev.sl)} · ${fmtTime(ev.t, now)}`, title: ev.title,
    summary: `${md(ev.t)} 由 ${ev.by} 首报，随后 ${ev.srcN.toLocaleString()} 个来源跟进，共 ${fmtBig(ev.docs)} 篇原文。${ev.hot ? '目前仍在快速扩散。' : D.settled(ev, N) ? '讨论已基本平息。' : '仍在扩散，但速度在放缓。'}${ev.first ? `系统判定为「${ev.first}」：过去 365 天里，相关主体没有出现过同类事件。` : ''}`,
    stats: [['原文', fmtBig(ev.docs) + ' 篇', '已聚合'], ['来源', ev.srcN.toLocaleString() + ' 个', mixE.length + ' 类'], ['首报', SRC[ev.firstType].name, fmtTime(ev.t, now)], ['峰值', fmtN(smx) + ' 篇/时', `第 ${ser.indexOf(smx) + 1} 小时`], ['状态', st, ev.hot ? '仍在上升' : '']].map(([l, v, sub]) => ({ label: l, v, sub })),
    stateStyle: { color: sc },
    spread: ser.map((v, i) => ({ style: { flex: 1, borderRadius: '3px 3px 0 0', background: v == null ? 'transparent' : i === 0 ? 'var(--first)' : ev.hot ? 'var(--hot)' : 'var(--accent)', opacity: v == null ? 0 : .35 + .55 * (v / smx), height: v == null ? 0 : (s.anim ? Math.max(2, v / smx * 100) : 0) + '%', transition: `height .7s ${i * 18}ms var(--spring)` }, title: v == null ? '' : `第 ${i + 1} 小时 · ${v.toLocaleString()} 篇` })),
    mixRows: mixE.map(([t, v], i) => ({ name: SRC[t].name, g: SRC[t].g, glyph: glyph(t, 20), n: fmtBig(v), pct: (v / ev.docs * 100).toFixed(1) + '%', bar: { height: 6, borderRadius: 3, background: SRC[t].c, opacity: .7, width: s.anim ? Math.max(1.5, v / mmax * 100) + '%' : '0%', transition: `width .8s ${i * 40}ms cubic-bezier(.2,.8,.2,1)` }, filter: () => app.setState({ evType: t, evPage: 0 }) })),
    ents: ents.map((e, i) => ({ name: e.name, type: D.TYPE_NAME[e.type], role: i === 0 ? '主体' : e.type === 'C' && i < 3 ? '主体' : '提及', conf: (.86 + rr(e.id) * .13).toFixed(2), n: fmtBig(Math.round(ev.docs * (i === 0 ? .92 : .2 + rr(e.id + 'n') * .5))), bar: { height: 4, borderRadius: 2, background: 'var(--accent)', width: ((.86 + rr(e.id) * .13) * 100) + '%', opacity: .6 }, go: () => app.selectEntity(e.id) })),
    kinds: kinds.map(([k, c]) => ({ name: KIND_NAME[k], conf: c.toFixed(2), bar: { height: 4, borderRadius: 2, background: k === ev.kind ? 'var(--accent)' : 'var(--faint)', width: (c * 100) + '%' } })),
    firstReason: ev.first ? `过去 365 天里，「${ents[0] ? ents[0].name : ''}」没有出现过同类表述；与历史事件的最高相似度 0.${Math.floor(30 + rr('s') * 30)}，低于 0.75 的阈值。` : `与 ${Math.floor(3 + rr('h') * 20)} 个历史事件相似（最高 0.${Math.floor(60 + rr('s') * 14)}），不算首次。`,
    dedupe: `合并了 ${fmtBig(Math.round(ev.docs * (1 / SRC_DEDUPE - 1)))} 篇转载与近似重复，留下 ${fmtBig(ev.docs)} 篇独立原文。`,
    firstDoc: first ? `${first.src} · ${fmtTime(first.t, now)}` : '',
    filters: [{ key: null, name: '全部', n: fmtBig(ev.docs) }, ...mixE.slice(0, 8).map(([t, v]) => ({ key: t, name: D.SRC[t].name, n: fmtBig(v) }))].map(f => ({ name: f.name, n: f.n, go: () => app.setState({ evType: f.key, evPage: 0 }), style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 11px', borderRadius: 8, fontSize: 12.5, cursor: 'pointer', background: s.evType === f.key ? 'var(--ink)' : 'var(--hover)', color: s.evType === f.key ? 'var(--card)' : 'var(--ink2)', transition: 'all .25s var(--spring)' } })),
    docs: page.docs.map((d, i) => ({ g: SRC[d.type].g, glyph: glyph(d.type, 22), src: d.src, typeName: SRC[d.type].name, isFirst: d.first, title: d.title, snippet: d.snippet, ments: d.ments.map(m => ({ name: m.name, conf: m.conf.toFixed(2) })), hasDup: d.dup > 0, dup: `合并 ${d.dup} 篇转载`, time: fmtTime(d.t, now).replace('今天 ', ''), rel: d.first ? '首报' : `+${((d.t - ev.t) / HOUR).toFixed(1)}h`, lang: d.lang === 'en' ? 'EN' : '中', rowStyle: { display: 'grid', gridTemplateColumns: '22px minmax(0,1fr) 74px', gap: 14, padding: '14px 12px', borderRadius: 12, transition: 'background .2s', animation: `su-in .35s ${i * 22}ms both ease-out` } })),
    pageLabel: page.total ? `${(s.evPage * 25 + 1).toLocaleString()}–${Math.min(page.total, (s.evPage + 1) * 25).toLocaleString()} / ${page.total.toLocaleString()} 篇` : '没有原文',
    canPrev: s.evPage > 0, canNext: s.evPage < pages - 1, prev: () => app.setState({ evPage: Math.max(0, s.evPage - 1) }), next: () => app.setState({ evPage: s.evPage + 1 }), last: () => app.setState({ evPage: Math.max(0, pages - 1) }),
    ask: () => app.openAsk(app.evCtx(ev)), graph: () => { app.closeEv(); app.selectEntity(ev.ents.find(id => db.ent.has(id))); }, story: () => { app.closeEv(); app.openStory(ev.sl); },
  };
}
const SRC_DEDUPE = .33;

export function buildAsk(D, db, s, app, H) {
  const { fmtTime } = D, { now } = H, c = s.ctx;
  const sugg = !c ? ['过去 24 小时最重要的是什么？', 'Codex 和 Claude Code 谁更新更勤？', 'Vibe Coding 最近有什么动向？', '本月有哪些首次？', '马斯克系最近的传闻可信吗？'] : c.kind === 'ent' ? [`${c.name} 最近发生了什么？`, `${c.name} 关联了哪些实体？`, `${c.name} 今年有哪些首次？`] : c.kind === 'sl' ? [`${c.name} 过去 7 天发生了什么？`, `${c.name} 本月有哪些首次？`, `${c.name} 最近的传闻可信吗？`] : c.kind === 'ev' ? ['这件事可信吗？扩散情况如何？', '相关方最近 7 天还发生了什么？', '和它相关的有哪些？'] : ['这段说的是什么？', '相关方最近还发生了什么？', '这可信吗？'];
  return {
    hasCtx: !!c, ctxLabel: c ? c.label : '', clearCtx: () => app.setState({ ctx: null }), closeAsk: () => app.setState({ askOpen: false }),
    qaEmpty: s.qa.length === 0 && !s.qaLoading, askHint: c ? `我会结合「${c.label}」来回答，依据都来自已聚合的原文。` : '随便问。在任何页面按 / 叫我；划选一段文字，也可以直接问那一段。',
    suggestions: sugg.map((t, i) => ({ text: t, ask: () => app.ask(t), style: { alignSelf: 'flex-start', fontSize: 13, color: 'var(--ink2)', background: 'var(--hover)', padding: '9px 14px', borderRadius: 12, cursor: 'pointer', lineHeight: 1.5, transition: 'transform .3s var(--spring), background .2s', animation: `su-in .4s ${120 + i * 60}ms both ease-out` } })),
    askPlaceholder: c ? `关于 ${c.label}…` : '问点什么…', qaInput: s.qaInput, qaLoading: s.qaLoading,
    onQaInput: e => app.setState({ qaInput: e.target.value }), onQaKey: e => { if (e.key === 'Enter') app.ask(); }, askNow: () => app.ask(),
    sendStyle: { width: 34, height: 34, borderRadius: 10, border: 'none', background: s.qaInput.trim() ? 'var(--accent)' : 'var(--hover)', color: s.qaInput.trim() ? '#fff' : 'var(--faint)', cursor: 'pointer', fontSize: 15, flex: 'none', transition: 'all .3s var(--spring)', transform: s.qaInput.trim() ? 'scale(1)' : 'scale(.92)' },
    messages: s.qa.map((m, i) => ({ isQ: m.role === 'q', isA: m.role === 'a', text: m.role === 'a' ? app.ce(app.Typewriter, { text: m.text, id: 'a' + i, done: !!m.typed, onDone: () => { m.typed = true; } }) : m.text, ctx: m.ctx || '', hasCtxTag: !!m.ctx, meta: m.meta || '',
      hasEvidence: !!(m.evidence && m.evidence.length), evidence: (m.evidence || []).map(e => ({ time: fmtTime(e.t, now).replace('今天 ', ''), title: e.title, first: e.first ? e.first + ' · ' : '', docs: D.fmtBig(e.docs) + ' 篇', go: () => app.openEv(e.id) })),
      hasChart: !!(m.chart && m.chart.length), chart: (m.chart || []).map(ch => ({ name: ch.name, total: ch.days.reduce((a, b) => a + b, 0) + ' 事件 · 14 天', bars: ch.days.map(v => ({ style: { flex: 1, height: Math.max(2, Math.min(28, v * 5)), background: 'var(--accent)', opacity: .55, borderRadius: 2 } })) })) })),
  };
}

export function buildSys(D, db, s, app, H) {
  const { fmtBig, SCALE, SRC_TYPES, HOUR, SRC } = D, { now, glyph } = H, hs = app._homeStats || {};
  const since = hs.since || s.lastSync || db.now - 24 * HOUR, hrs = Math.max(.1, (now - since) / HOUR), docs = SCALE.dayDocs * hrs / 24;
  const gap = hrs >= 48 ? Math.floor(hrs / 24) + ' 天' : hrs >= 1 ? Math.floor(hrs) + ' 小时' : Math.round(hrs * 60) + ' 分钟';
  const mx = Math.max(...SRC_TYPES.map(x => x.day));
  const steps = [[fmtBig(docs), '篇原文进来'], [fmtBig(docs * SCALE.dedupe), '篇去掉转载后留下'], [fmtBig(SCALE.dayEvents * hrs / 24), '个事件聚出来'], [String(hs.matched || 0), '件命中你的追踪'], [String(hs.items || 0), '件值得你看']];
  return {
    range: `距你上次查看的 ${gap}里`,
    steps: steps.map(([v, label], i) => ({ v, label, style: { background: i === 4 ? 'var(--accentSoft)' : 'var(--sub)', color: i === 4 ? 'var(--accent)' : 'var(--ink)', borderRadius: 12, padding: '12px 12px 11px', minWidth: 0 } })),
    note: `同一篇文章被转载多次只算一次，所以事件里看到的都是独立原文。正在运行的 ${app.tasks.filter(t => t.status === 'run').length} 条追踪都从这里取数。`,
    srcSum: `${SRC_TYPES.length} 类 · ${fmtBig(SCALE.sources)} 个源`,
    srcs: SRC_TYPES.map(x => { const slow = /小时/.test(x.lag); return { g: x.g, glyph: glyph(x.id, 22), name: x.name, n: x.n.toLocaleString() + ' 个源', day: fmtBig(x.day), lag: x.lag, lagStyle: { fontSize: 12, color: slow ? 'var(--warn)' : 'var(--muted)', whiteSpace: 'nowrap', textAlign: 'right' }, bar: { height: 6, borderRadius: 3, background: x.c, opacity: .65, width: Math.max(2, Math.sqrt(x.day / mx) * 100) + '%' } }; }),
  };
}

export function buildDaily(D, db, s, app, H) {
  const { fmtBig, fmtTime, DAY } = D, { now, N, badge, kindLabel, stateOf } = H;
  const off = s.dayOff || 0, scope = s.dScope || 'mine', wk = '日一二三四五六';
  const sod = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }, md = t => { const x = new Date(t); return `${x.getMonth() + 1}/${x.getDate()}`; };
  const d0 = sod(N) - off * DAY, d1 = off ? d0 + DAY : N;
  const run = app.tasks.filter(t => t.status === 'run'), ms = run.map(t => ({ t, m: D.taskMatch(t) }));
  const all = app.memo('day' + d0 + ':' + d1, () => db.events.filter(e => e.t >= d0 && e.t < d1));
  const evs = scope === 'mine' ? all.filter(e => ms.some(x => x.m(e))) : all;
  const score = e => e.sig * 2 + Math.log10(e.docs + 10) + (e.first ? 1 : 0);
  const top = evs.slice().sort((p, q) => score(q) - score(p)), firsts = evs.filter(e => e.first).sort((p, q) => q.t - p.t), docs = evs.reduce((n, e) => n + e.docs, 0);
  const per = ms.map(({ t, m }) => ({ t, es: all.filter(m).sort((p, q) => q.docs - p.docs) })), act = per.filter(x => x.es.length).sort((p, q) => q.es.length - p.es.length), quiet = per.length - act.length;
  const lineOf = e => { const x = ms.find(y => y.m(e)); return x ? '追踪 · ' + x.t.name : '话题 · ' + app.slName(e.sl); };
  const pts = [];
  if (top[0]) pts.push({ lead: '讨论最多', text: `${top[0].title}。${fmtBig(top[0].docs)} 篇原文，${top[0].srcN.toLocaleString()} 个来源跟进${top[0].hot ? '，还在发酵' : ''}。`, open: () => app.openEv(top[0].id) });
  if (firsts.length) pts.push({ lead: `${firsts.length} 次首次`, text: firsts.slice(0, 3).map(e => e.title).join('；') + (firsts.length > 3 ? ` 等 ${firsts.length} 件` : '') + '。', open: () => app.go('firsts') });
  if (act[0]) pts.push({ lead: '最热闹的追踪', text: `「${act[0].t.name}」${act[0].es.length} 件事${act[1] ? `，其次是「${act[1].t.name}」${act[1].es.length} 件` : ''}。`, open: () => app.openTask(act[0].t.id) });
  const rum = top.find(e => e.kind === 'rum' && !e.first); if (rum) { const c = D.credOf(rum); pts.push({ lead: '还没证实', text: `${rum.title}。新闻媒体跟进不多，可信度${c < .3 ? '低' : c < .55 ? '中等' : '较高'}。`, open: () => app.openEv(rum.id) }); }
  const slm = new Set(run.flatMap(t => (t.sls || []).concat(t.ents.map(id => (db.ent.get(id) || {}).sl).filter(Boolean))));
  const ups = db.upcoming.filter(u => u.t > d1 - DAY / 2 && u.t < d1 + 10 * DAY && (scope === 'all' || slm.has(u.sl))).sort((p, q) => p.t - q.t);
  const seg = on => ({ padding: '0 11px', height: 26, lineHeight: '26px', borderRadius: 13, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', background: on ? 'var(--card)' : 'transparent', boxShadow: on ? 'var(--sh)' : 'none', color: on ? 'var(--ink)' : 'var(--muted)', transition: 'all .25s' });
  const row = (e, i) => { const [st, sc] = stateOf(e); return { time: fmtTime(e.t, now).split(' ')[1], kind: kindLabel(e), badge: badge(e), title: e.title, line: lineOf(e), docs: fmtBig(e.docs) + ' 篇', state: st, stateStyle: { fontSize: 11, color: sc, whiteSpace: 'nowrap', marginTop: 3 }, open: () => app.openEv(e.id), style: { display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '10px 12px', borderRadius: 10, cursor: 'pointer', transition: 'background .2s', animation: `su-fade .35s ${Math.min(i, 10) * 30}ms both ease-out` } }; };
  const dd = new Date(d0);
  return { dy: {
    title: `${dd.getMonth() + 1} 月 ${dd.getDate()} 日 · 星期${wk[dd.getDay()]}`,
    meta: (off ? '' : '今天还没结束，到此刻为止 · ') + `${evs.length} 件事 · ${fmtBig(docs)} 篇原文 · ${firsts.length} 次首次` + (scope === 'mine' ? ` · 只看你在跑的 ${run.length} 条追踪` : ' · 全部话题'),
    days: Array.from({ length: 7 }, (_, i) => { const t = sod(N) - i * DAY, x = new Date(t); return { label: i === 0 ? '今天' : i === 1 ? '昨天' : `${md(t)} 周${wk[x.getDay()]}`, go: () => app.setState({ dayOff: i }), style: seg(i === off) }; }),
    scopes: [['mine', '我追踪的'], ['all', '全部']].map(([k, l]) => ({ label: l, go: () => app.setState({ dScope: k }), style: seg(scope === k) })),
    points: pts.map((p, i) => Object.assign(p, { n: String(i + 1) })), noPoints: !pts.length,
    top: top.slice(0, 6).map(row), hasTop: top.length > 0, topCap: top.length > 6 ? `共 ${top.length} 件，按重要程度列前 6` : `共 ${top.length} 件`,
    firsts: firsts.map(row), hasFirsts: firsts.length > 0,
    tracks: act.slice(0, 8).map(x => ({ name: x.t.name, n: x.es.length + ' 件', top: x.es[0].title, open: () => app.openTask(x.t.id) })), hasTracks: act.length > 0, quietCap: quiet ? `其余 ${quiet} 条追踪这天没有新事件` : '',
    ups: ups.map(u => { const k = Math.round((u.t - N) / DAY); return { date: md(u.t), when: k <= 0 ? '今天' : k + ' 天后', kind: u.kind, title: u.title, by: u.by, kindStyle: { fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 6, flex: 'none', background: u.kind === '传闻' ? 'var(--warnSoft)' : 'var(--accentSoft)', color: u.kind === '传闻' ? 'var(--warn)' : 'var(--accent)' } }; }), hasUps: ups.length > 0,
    ask: () => { app.openAsk(null); setTimeout(() => app.ask(`${off ? md(d0) : '今天'}最重要的是什么？`), 200); },
  } };
}
const FCAT = ['发布', '改变', '突破', '研发', '发明', '退出'];
const FCOL = { 发布: ['var(--accentSoft)', 'var(--accent)'], 改变: ['var(--violetSoft)', 'var(--violet)'], 突破: ['var(--firstSoft)', 'var(--first)'], 研发: ['var(--warnSoft)', 'var(--warn)'], 发明: ['var(--okSoft)', 'var(--ok)'], 退出: ['var(--hotSoft)', 'var(--hot)'] };
export const firstCat = e => e.firstCat || ({ 首次发售: '发布', 首次研发: '研发', 首次退出: '退出', 首次发明: '发明', 首次改变: '改变' }[e.first] || (e.kind === 'upd' ? '改变' : '突破'));
export function buildFirsts(D, db, s, app, H) {
  const { fmtBig, DAY } = D, { N } = H, scope = s.fScope || 'all', R = s.fRange || 365, cat = s.fCat || null, wk = '日一二三四五六';
  const ms = app.tasks.filter(t => t.status === 'run').map(t => ({ t, m: D.taskMatch(t) }));
  const base = db.events.filter(e => e.first && e.t >= N - R * DAY).map(e => ({ e, c: firstCat(e), tk: ms.find(x => x.m(e)) })).filter(x => scope === 'all' || x.tk);
  const list = base.filter(x => !cat || x.c === cat).sort((p, q) => q.e.t - p.e.t);
  const seg = on => ({ padding: '0 11px', height: 26, lineHeight: '26px', borderRadius: 13, fontSize: 12.5, cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', background: on ? 'var(--card)' : 'transparent', boxShadow: on ? 'var(--sh)' : 'none', color: on ? 'var(--ink)' : 'var(--muted)', transition: 'all .25s' });
  const chip = on => ({ display: 'inline-flex', alignItems: 'center', gap: 7, height: 30, padding: '0 12px', borderRadius: 15, fontSize: 12.5, cursor: 'pointer', userSelect: 'none', background: on ? 'var(--ink)' : 'var(--card)', color: on ? 'var(--card)' : 'var(--ink2)', boxShadow: on ? 'none' : 'var(--sh)', transition: 'all .25s' });
  const months = []; list.forEach((x, i) => { const d = new Date(x.e.t), lab = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月`; let g = months[months.length - 1]; if (!g || g.label !== lab) months.push(g = { label: lab, items: [] }); const [bg, c] = FCOL[x.c]; const who = x.e.ents.map(id => db.ent.get(id)).filter(Boolean).slice(0, 2).map(e => e.name).join(' · ');
    g.items.push({ day: String(d.getDate()), dow: '周' + wk[d.getDay()], cat: '首次' + x.c, title: x.e.title, who, meta: `首报 ${x.e.by} · ${x.e.srcN.toLocaleString()} 个来源跟进`, docs: fmtBig(x.e.docs) + ' 篇', track: x.tk ? '在「' + x.tk.t.name + '」里' : '未追踪', trackStyle: { fontSize: 11.5, color: x.tk ? 'var(--ok)' : 'var(--faint)', whiteSpace: 'nowrap', maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis' }, catStyle: { fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: bg, color: c, flex: 'none' }, open: () => app.openEv(x.e.id), style: { display: 'grid', gridTemplateColumns: '48px minmax(0,1fr) auto', gap: 16, alignItems: 'start', padding: '14px 18px', borderRadius: 14, background: 'var(--card)', boxShadow: 'var(--sh)', cursor: 'pointer', transition: 'box-shadow .25s', animation: `su-fade .35s ${Math.min(i, 12) * 25}ms both ease-out` } }); });
  months.forEach(m => { m.n = m.items.length + ' 次'; });
  const bw = R > 100 ? 30 : 7, nb = Math.ceil(R / bw), cnt = Array(nb).fill(0); for (const x of list) { const i = nb - 1 - Math.floor((N - x.e.t) / (bw * DAY)); if (i >= 0) cnt[i]++; } const bm = Math.max(1, ...cnt);
  return { fs: {
    sub: '只记第一次：第一次发布、改变、突破、研发、发明、退出。相关主体过去 365 天没出现过同类事件，才算首次；点开每一条都能看到判定依据。',
    scopes: [['all', '全部'], ['mine', '我追踪的']].map(([k, l]) => ({ label: l, go: () => app.setState({ fScope: k }), style: seg(scope === k) })),
    ranges: [[30, '30 天'], [90, '90 天'], [365, '一年']].map(([k, l]) => ({ label: l, go: () => app.setState({ fRange: k }), style: seg(R === k) })),
    cats: [{ k: null, l: '全部', n: base.length }, ...FCAT.map(k => ({ k, l: '首次' + k, n: base.filter(x => x.c === k).length }))].filter(x => x.n || x.k === null).map(x => ({ label: x.l, n: String(x.n), go: () => app.setState({ fCat: x.k }), style: chip(cat === x.k), nStyle: { font: '400 11px var(--mono)', opacity: .6 }, dot: { width: 7, height: 7, borderRadius: 2, transform: 'rotate(45deg)', background: x.k ? FCOL[x.k][1] : 'var(--faint)', flex: 'none' } })),
    bars: cnt.map((c, i) => ({ title: `${c} 次`, style: { flex: 1, height: c ? Math.max(5, c / bm * 40) : 2, borderRadius: 3, background: c ? 'var(--first)' : 'var(--line)', opacity: c ? .8 : 1 } })), barL: R > 100 ? `${Math.round(R / 30)} 个月前` : `${nb} 周前`, total: `${list.length} 次`,
    months, noList: !list.length,
  } };
}
