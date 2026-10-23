// 「溯」数据层 —— 确定性生成的大规模示例数据 + 查询/分析接口。所有事件标题均为示意。
export const DAY = 86400000, HOUR = 3600000;
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

export const STORYLINES = [
  { id: 'claude', name: 'Claude 模型', tempo: .55, tracked: true },
  { id: 'ccode', name: 'Claude Code', tempo: 1.3, tracked: true },
  { id: 'gpt', name: 'GPT', tempo: .95, tracked: true },
  { id: 'codex', name: 'Codex 更新日志', tempo: .75, tracked: true },
  { id: 'surge', name: 'Surge', tempo: .16, tracked: true },
  { id: 'musk', name: '马斯克系', tempo: 3.1, tracked: true },
  { id: 'gemini', name: 'Gemini', tempo: .85, tracked: false },
  { id: 'cn', name: '国产模型', tempo: 1.6, tracked: false },
  { id: 'cursor', name: 'Cursor', tempo: .6, tracked: false },
  { id: 'chips', name: '芯片', tempo: .8, tracked: false },
];
export const TYPE_NAME = { C: '公司', P: '产品', M: '模型', H: '人物', L: '地点', T: '主题', S: '来源', E: '事件' };
export const TYPE_COLOR = { C: '#e9e4d8', P: '#d9c98c', M: '#8fc3bd', H: '#cf95b9', L: '#9d94c4', T: '#7f9be0', S: '#7f8580', E: '#6f7a84' };

// [id, name, type, storyline, ...[company, role]]
const E = [
  ['anthropic', 'Anthropic', 'C', 'claude'], ['openai', 'OpenAI', 'C', 'gpt'], ['google', 'Google DeepMind', 'C', 'gemini'], ['xai', 'xAI', 'C', 'musk'], ['spacex', 'SpaceX', 'C', 'musk'], ['tesla', 'Tesla', 'C', 'musk'], ['xcorp', 'X Corp', 'C', 'musk'], ['neuralink', 'Neuralink', 'C', 'musk'], ['boring', 'The Boring Company', 'C', 'musk'], ['meta', 'Meta', 'C', null], ['microsoft', 'Microsoft', 'C', null], ['apple', 'Apple', 'C', null], ['nvidia', 'NVIDIA', 'C', 'chips'], ['amd', 'AMD', 'C', 'chips'], ['tsmc', '台积电', 'C', 'chips'], ['mistral', 'Mistral AI', 'C', null], ['deepseek', 'DeepSeek', 'C', 'cn'], ['alibaba', '阿里 Qwen', 'C', 'cn'], ['bytedance', '字节跳动', 'C', 'cn'], ['moonshot', '月之暗面', 'C', 'cn'], ['zhipu', '智谱', 'C', 'cn'], ['nssurge', 'NSSurge', 'C', 'surge'], ['anysphere', 'Anysphere', 'C', 'cursor'], ['github', 'GitHub', 'C', null], ['huggingface', 'Hugging Face', 'C', null], ['perplexity', 'Perplexity', 'C', null], ['amazon', 'Amazon', 'C', null], ['ssi', 'SSI', 'C', null], ['tml', 'Thinking Machines', 'C', null],
  ['ccode', 'Claude Code', 'P', 'ccode'], ['claudeai', 'Claude.ai', 'P', 'claude'], ['agentsdk', 'Agent SDK', 'P', 'ccode'], ['mcp', 'MCP', 'P', 'claude'], ['codex', 'Codex', 'P', 'codex'], ['chatgpt', 'ChatGPT', 'P', 'gpt'], ['copilot', 'GitHub Copilot', 'P', null], ['geminicli', 'Gemini CLI', 'P', 'gemini'], ['cursorapp', 'Cursor', 'P', 'cursor'], ['surgeapp', 'Surge', 'P', 'surge'], ['starship', '星舰', 'P', 'musk'], ['falcon9', '猎鹰 9', 'P', 'musk'], ['starlink', '星链', 'P', 'musk'], ['optimus', 'Optimus', 'P', 'musk'], ['fsd', 'FSD', 'P', 'musk'], ['grokapp', 'Grok', 'P', 'musk'], ['vscode', 'VS Code', 'P', null], ['windows', 'Windows', 'P', null], ['b200', 'Blackwell B200', 'P', 'chips'], ['mi300', 'Instinct MI300', 'P', 'chips'], ['cuda', 'CUDA', 'P', 'chips'], ['metaai', 'Meta AI', 'P', null],
  ['opus4', 'Claude Opus 4', 'M', 'claude'], ['sonnet45', 'Claude Sonnet 4.5', 'M', 'claude'], ['haiku45', 'Claude Haiku 4.5', 'M', 'claude'], ['gpt5', 'GPT-5', 'M', 'gpt'], ['gpt5mini', 'GPT-5 mini', 'M', 'gpt'], ['o4', 'o4', 'M', 'gpt'], ['gemini25', 'Gemini 2.5', 'M', 'gemini'], ['gemini3', 'Gemini 3', 'M', 'gemini'], ['grok4', 'Grok 4', 'M', 'musk'], ['llama4', 'Llama 4', 'M', null], ['dsv3', 'DeepSeek-V3', 'M', 'cn'], ['dsr1', 'DeepSeek-R1', 'M', 'cn'], ['qwen3', 'Qwen3', 'M', 'cn'], ['kimik2', 'Kimi K2', 'M', 'cn'], ['glm45', 'GLM-4.5', 'M', 'cn'], ['doubao', '豆包', 'M', 'cn'], ['mistrallarge', 'Mistral Large', 'M', null],
  ['dario', 'Dario Amodei', 'H', 'claude', ['anthropic', 'CEO · 联合创始人']], ['daniela', 'Daniela Amodei', 'H', 'claude', ['anthropic', '总裁 · 联合创始人']], ['krieger', 'Mike Krieger', 'H', 'claude', ['anthropic', 'CPO']], ['boris', 'Boris Cherny', 'H', 'ccode', ['anthropic', 'Claude Code 负责人']], ['altman', 'Sam Altman', 'H', 'gpt', ['openai', 'CEO']], ['brockman', 'Greg Brockman', 'H', 'gpt', ['openai', '总裁 · 联合创始人']], ['weil', 'Kevin Weil', 'H', 'gpt', ['openai', 'CPO']], ['musk', 'Elon Musk', 'H', 'musk', ['xai', '创始人'], ['spacex', 'CEO'], ['tesla', 'CEO'], ['xcorp', '所有者'], ['neuralink', '联合创始人'], ['boring', '创始人']], ['shotwell', 'Gwynne Shotwell', 'H', 'musk', ['spacex', '总裁']], ['hassabis', 'Demis Hassabis', 'H', 'gemini', ['google', 'CEO']], ['pichai', 'Sundar Pichai', 'H', 'gemini', ['google', 'Alphabet CEO']], ['jensen', 'Jensen Huang', 'H', 'chips', ['nvidia', 'CEO']], ['lisasu', 'Lisa Su', 'H', 'chips', ['amd', 'CEO']], ['nadella', 'Satya Nadella', 'H', null, ['microsoft', 'CEO']], ['cook', 'Tim Cook', 'H', null, ['apple', 'CEO']], ['zuck', 'Mark Zuckerberg', 'H', null, ['meta', 'CEO']], ['lecun', 'Yann LeCun', 'H', null, ['meta', '首席 AI 科学家']], ['karpathy', 'Andrej Karpathy', 'H', null], ['ilya', 'Ilya Sutskever', 'H', null, ['ssi', '联合创始人']], ['murati', 'Mira Murati', 'H', null, ['tml', '创始人']], ['liang', '梁文锋', 'H', 'cn', ['deepseek', '创始人']], ['mensch', 'Arthur Mensch', 'H', null, ['mistral', 'CEO']], ['truell', 'Michael Truell', 'H', 'cursor', ['anysphere', 'CEO']], ['clem', 'Clément Delangue', 'H', null, ['huggingface', 'CEO']], ['aravind', 'Aravind Srinivas', 'H', null, ['perplexity', 'CEO']], ['yangzl', '杨植麟', 'H', 'cn', ['moonshot', '创始人']],
  ['sf', '旧金山', 'L', null], ['austin', '奥斯汀', 'L', 'musk'], ['boca', '博卡奇卡 · 星港', 'L', 'musk'], ['london', '伦敦', 'L', 'gemini'], ['mtv', '山景城', 'L', 'gemini'], ['redmond', '雷德蒙德', 'L', null], ['cupertino', '库比蒂诺', 'L', null], ['menlo', '门洛帕克', 'L', null], ['santaclara', '圣克拉拉', 'L', 'chips'], ['hsinchu', '新竹', 'L', 'chips'], ['beijing', '北京', 'L', 'cn'], ['hangzhou', '杭州', 'L', 'cn'], ['shenzhen', '深圳', 'L', 'cn'], ['paris', '巴黎', 'L', null], ['ny', '纽约', 'L', null], ['seattle', '西雅图', 'L', null],
  ['vibe', 'Vibe Coding', 'T', null], ['agents', 'AI 代理', 'T', null], ['frontier', '前沿模型', 'T', null], ['reasoning', '推理模型', 'T', null], ['opensrc', '开源模型', 'T', null], ['assistant', 'AI 助手', 'T', null], ['compute', 'AI 算力', 'T', null], ['space', '商业航天', 'T', null], ['embodied', '具身智能', 'T', null],
];
const SOURCES = {
  x: ['@AnthropicAI', '@claudeai', '@OpenAI', '@OpenAIDevs', '@xai', '@SpaceX', '@Tesla', '@elonmusk', '@GoogleDeepMind', '@nvidia', '@AMD', '@deepseek_ai', '@Alibaba_Qwen', '@Kimi_Moonshot', '@cursor_ai', '@github', '@Surge_Networks', '@karpathy', '@swyx', '@rowancheung', '@TheInformation', '@verge', '@Reuters', '@business', '@36kr', '@QbitAI', '@jiqizhixin'],
  yt: ['Fireship', 'AI Explained', 'Two Minute Papers', 'Everyday Astronaut', 'MKBHD', 'Theo', 'Matthew Berman', 'Wes Roth', '影视飓风', '老石谈芯', 'Linus Tech Tips'],
  news: ['The Verge', 'TechCrunch', 'Reuters', 'Bloomberg', 'The Information', 'Ars Technica', 'Wired', 'Financial Times', '36氪', '机器之心', '量子位', '新智元', '晚点 LatePost', 'IT之家', 'SpaceNews', 'Electrek', 'Tom\'s Hardware', 'AnandTech'],
  cl: ['claude-code Releases', 'Codex Releases', 'Surge Release Notes', 'Cursor Changelog', 'Gemini CLI Releases', 'Anthropic Docs Changelog', 'OpenAI Platform Changelog', 'DeepSeek API Changelog'],
};
export const SOURCE_COUNT = SOURCES.x.length + SOURCES.yt.length + SOURCES.news.length + SOURCES.cl.length;

const R = [
  ...[['anthropic', ['ccode', 'claudeai', 'agentsdk', 'mcp', 'opus4', 'sonnet45', 'haiku45']], ['openai', ['codex', 'chatgpt', 'gpt5', 'gpt5mini', 'o4']], ['google', ['geminicli', 'gemini25', 'gemini3']], ['xai', ['grokapp', 'grok4']], ['spacex', ['starship', 'falcon9', 'starlink']], ['tesla', ['optimus', 'fsd']], ['microsoft', ['windows', 'vscode']], ['github', ['copilot']], ['anysphere', ['cursorapp']], ['nssurge', ['surgeapp']], ['nvidia', ['b200', 'cuda']], ['amd', ['mi300']], ['meta', ['llama4', 'metaai']], ['deepseek', ['dsv3', 'dsr1']], ['alibaba', ['qwen3']], ['moonshot', ['kimik2']], ['zhipu', ['glm45']], ['bytedance', ['doubao']], ['mistral', ['mistrallarge']]].flatMap(([c, ps]) => ps.map(p => [c, '开发', p])),
  ...[['ccode', 'codex'], ['ccode', 'cursorapp'], ['codex', 'cursorapp'], ['ccode', 'copilot'], ['ccode', 'geminicli'], ['codex', 'geminicli'], ['opus4', 'gpt5'], ['gpt5', 'gemini3'], ['opus4', 'gemini3'], ['grok4', 'gpt5'], ['dsv3', 'qwen3'], ['kimik2', 'glm45'], ['dsr1', 'o4'], ['chatgpt', 'claudeai'], ['chatgpt', 'grokapp'], ['b200', 'mi300'], ['sonnet45', 'gpt5mini'], ['doubao', 'qwen3']].map(([a, b]) => [a, '竞品', b]),
  ['microsoft', '投资', 'openai'], ['amazon', '投资', 'anthropic'], ['google', '投资', 'anthropic'], ['microsoft', '子公司', 'github'],
  ...[['anthropic', 'sf'], ['openai', 'sf'], ['xai', 'sf'], ['spacex', 'boca'], ['tesla', 'austin'], ['google', 'mtv'], ['google', 'london'], ['microsoft', 'redmond'], ['apple', 'cupertino'], ['meta', 'menlo'], ['nvidia', 'santaclara'], ['tsmc', 'hsinchu'], ['deepseek', 'hangzhou'], ['alibaba', 'hangzhou'], ['bytedance', 'beijing'], ['moonshot', 'beijing'], ['zhipu', 'beijing'], ['mistral', 'paris'], ['anysphere', 'sf'], ['huggingface', 'ny'], ['perplexity', 'sf'], ['tencentless', 'shenzhen']].filter(([a]) => a !== 'tencentless').map(([a, b]) => [a, '总部', b]),
  ['ccode', '运行于', 'windows'], ['ccode', '集成', 'vscode'], ['codex', '集成', 'vscode'], ['cursorapp', '分支自', 'vscode'], ['ccode', '支持', 'mcp'], ['codex', '支持', 'mcp'], ['geminicli', '支持', 'mcp'], ['agentsdk', '基于', 'ccode'], ['b200', '代工', 'tsmc'], ['mi300', '代工', 'tsmc'],
  ['nvidia', '供应', 'openai'], ['nvidia', '供应', 'xai'], ['nvidia', '供应', 'meta'], ['amd', '供应', 'openai'], ['google', '供应 TPU', 'anthropic'],
  ['chatgpt', '搭载', 'gpt5'], ['claudeai', '搭载', 'opus4'], ['ccode', '搭载', 'opus4'], ['ccode', '搭载', 'sonnet45'], ['codex', '搭载', 'gpt5'], ['grokapp', '搭载', 'grok4'], ['cursorapp', '可选', 'opus4'], ['cursorapp', '可选', 'gpt5'], ['copilot', '可选', 'sonnet45'], ['surgeapp', '运行于', 'windows'], ['starlink', '发射自', 'falcon9'], ['xcorp', '集成', 'grokapp'],
  ...E.filter(e => e[2] === 'H').flatMap(e => e.slice(4).map(([c, role]) => [e[0], role, c])),
  ...[['vibe', ['ccode', 'codex', 'cursorapp', 'copilot', 'geminicli']], ['agents', ['agentsdk', 'mcp', 'ccode', 'codex', 'chatgpt', 'claudeai']], ['frontier', ['opus4', 'sonnet45', 'gpt5', 'gemini3', 'grok4', 'llama4']], ['reasoning', ['o4', 'dsr1', 'opus4', 'gemini25', 'gpt5']], ['opensrc', ['llama4', 'dsv3', 'dsr1', 'qwen3', 'kimik2', 'glm45', 'mistrallarge', 'huggingface']], ['assistant', ['chatgpt', 'claudeai', 'grokapp', 'metaai', 'doubao', 'perplexity']], ['compute', ['b200', 'mi300', 'cuda', 'tsmc', 'nvidia', 'amd']], ['space', ['starship', 'falcon9', 'starlink']], ['embodied', ['optimus', 'fsd']]].flatMap(([t, ms]) => ms.map(m => [m, '属于', t])),
  ['karpathy', '提出', 'vibe'], ['karpathy', '前成员', 'openai'], ['karpathy', '前成员', 'tesla'], ['ilya', '前成员', 'openai'], ['murati', '前成员', 'openai'], ['dario', '前成员', 'openai'], ['musk', '联合创始', 'openai'], ['chatgpt', '包含', 'codex'], ['codex', '运行于', 'windows'], ['copilot', '搭载', 'gpt5'], ['vscode', '集成', 'copilot'], ['cursorapp', '支持', 'mcp'], ['openai', '支持', 'mcp'], ['huggingface', '托管', 'llama4'], ['huggingface', '托管', 'qwen3'], ['huggingface', '托管', 'dsv3'], ['perplexity', '可选', 'sonnet45'], ['apple', '合作', 'openai'], ['xai', '收购', 'xcorp'], ['amazon', '总部', 'seattle'], ['boring', '总部', 'austin'], ['xcorp', '总部', 'austin'],
];

const FEATURES = ['并行子任务', '原生 Windows 支持', '语音模式改版', '1M 长上下文', '本地模型支持', '多代理协作', '记忆功能', '计算机使用', '工具调用约束', '成本下降 40%', '新定价', '团队版', '插件市场', '离线模式', '规则引擎重写', 'MCP 远程服务器', '子代理', 'Web 版', 'IDE 深度集成', '实时翻译', '视频理解', '图像生成', '推理模式', '提示缓存', '后台任务', '代码审查', '自动测试生成', '多仓库工作区', '企业 SSO', '用量仪表盘'];
const RUMORS = ['自研训练芯片', '筹备新一轮融资', '洽购一家代理软件公司', '将在 11 月发布下一代模型', '与硬件厂商洽谈合作', '调整订阅价格', '重组某研究团队', '进军人形机器人', '在欧洲新建数据中心', '测试广告模式', '开发浏览器产品', '与政府洽谈算力合同'];
const ASPECTS = ['启动速度', '长任务稳定性', '成本', '代码质量', '多文件重构', '上下文召回', '中文能力', '推理速度', '安全性', '离线表现'];
const POLICIES = ['AI 模型备案新规', '算力出口管制更新', '数据中心用电新规', '自动驾驶测试许可', 'AI 内容标识办法', '开源模型安全评估指南'];
const ROLES = ['首席科学家', '研究负责人', '安全负责人', 'CTO', '产品负责人', '首席经济学家'];
const POOLS = {
  claude: { C: ['anthropic'], P: ['claudeai', 'mcp'], M: ['opus4', 'sonnet45', 'haiku45'], w: { upd: 4, rel: 1.2, rum: 1.2, rev: 1.5, fund: .3, coop: .6, pol: .3, hr: .4, inc: .4 } },
  ccode: { C: ['anthropic'], P: ['ccode', 'agentsdk'], M: ['opus4', 'sonnet45'], w: { upd: 5, rel: 1.6, rum: .6, rev: 2.2, coop: .4, inc: .5 } },
  gpt: { C: ['openai'], P: ['chatgpt'], M: ['gpt5', 'gpt5mini', 'o4'], w: { upd: 4, rel: 1, rum: 1.6, rev: 1.4, fund: .4, coop: .8, pol: .4, hr: .6, inc: .6 } },
  codex: { C: ['openai'], P: ['codex'], M: ['gpt5'], w: { upd: 6, rel: 1.4, rev: 1.6, rum: .4, inc: .4 } },
  surge: { C: ['nssurge'], P: ['surgeapp'], M: [], w: { upd: 5, rel: 1, rev: .8, inc: .3 } },
  musk: { C: ['xai', 'spacex', 'tesla', 'xcorp', 'neuralink', 'boring'], P: ['starship', 'falcon9', 'starlink', 'optimus', 'fsd', 'grokapp'], M: ['grok4'], w: { launch: 3, rum: 2.4, upd: 2, rel: .8, rev: .8, fund: .6, coop: .6, pol: .8, hr: .5, inc: .8 } },
  gemini: { C: ['google'], P: ['geminicli'], M: ['gemini25', 'gemini3'], w: { upd: 4, rel: 1, rum: 1, rev: 1.4, coop: .6, pol: .3, hr: .3, inc: .4 } },
  cn: { C: ['deepseek', 'alibaba', 'bytedance', 'moonshot', 'zhipu'], P: [], M: ['dsv3', 'dsr1', 'qwen3', 'kimik2', 'glm45', 'doubao'], w: { rel: 2, upd: 3, rum: 1.6, rev: 1.6, fund: .8, pol: 1, hr: .4 } },
  cursor: { C: ['anysphere'], P: ['cursorapp'], M: [], w: { upd: 5, rel: 1.2, rum: .8, rev: 1.8, fund: .6, inc: .4 } },
  chips: { C: ['nvidia', 'amd', 'tsmc'], P: ['b200', 'mi300', 'cuda'], M: [], w: { rel: 1.5, upd: 1.5, rum: 1.6, rev: 1, coop: 1, pol: 1.2, fund: .3, hr: .3 } },
};
export const KIND_NAME = { rel: '发布', upd: '更新', rum: '传闻', fund: '融资', rev: '测评', launch: '发射', coop: '合作', pol: '政策', hr: '人事', inc: '事故' };

export function build(now) {
  const r = rng(20261022);
  const pick = a => a[Math.floor(r() * a.length)];
  const ent = new Map(E.map(e => [e[0], { id: e[0], name: e[1], type: e[2], sl: e[3] }]));
  const rels = R.filter(([a, , b]) => ent.has(a) && ent.has(b)).map(([a, rel, b]) => ({ a, rel, b }));
  const ver = {}; const nextVer = (p, big) => { const v = ver[p] || [1, 0, 0]; if (big) { v[1]++; v[2] = 0; } else v[2]++; ver[p] = v; return `v${v.join('.')}`; };
  let starship = 7, falcon = 420, items = 0;
  const events = [];
  const add = (ev) => { ev.id = 'e' + events.length; items += ev.src.x + ev.src.yt + ev.src.news + ev.src.cl; events.push(ev); return ev; };
  const srcFor = (kind, sig, first) => { const m = first ? 3.2 : 1; const base = sig * sig; return { x: Math.round((4 + 260 * base * r()) * m), yt: Math.round(base * 7 * r() * m), news: Math.round((1 + 24 * base * r()) * m), cl: (kind === 'rel' || kind === 'upd') && r() < .7 ? 1 : 0 }; };
  const firstBy = (kind) => kind === 'rev' ? 'YouTube · ' + pick(SOURCES.yt) : kind === 'rum' ? 'X · ' + pick(SOURCES.x.slice(17)) : kind === 'pol' || kind === 'fund' ? '新闻 · ' + pick(SOURCES.news) : r() < .6 ? 'X · ' + pick(SOURCES.x.slice(0, 17)) : 'Changelog · ' + pick(SOURCES.cl);
  for (let d = 365; d >= 0; d--) {
    const dayStart = now - d * DAY - (now % DAY);
    for (const sl of STORYLINES) {
      const pool = POOLS[sl.id];
      let n = 0; let L = Math.exp(-sl.tempo), p = r(); while (p > L) { n++; p *= r(); }
      for (let i = 0; i < n; i++) {
        const t = dayStart + r() * DAY; if (t > now - 2 * HOUR) continue;
        const ks = Object.keys(pool.w); const tot = ks.reduce((s, k) => s + pool.w[k], 0); let x = r() * tot, kind = ks[0]; for (const k of ks) { x -= pool.w[k]; if (x <= 0) { kind = k; break; } }
        const C = pick(pool.C), P = pool.P.length ? pick(pool.P) : null, M = pool.M.length ? pick(pool.M) : null;
        const subj = P && (kind !== 'rel' || r() < .7) ? P : (M || P || C);
        const first = d > 2 && r() < .011 && ['rel', 'upd', 'rev', 'launch', 'rum'].includes(kind);
        let title, ents = [C], sig = { rel: .55, upd: .35, rum: .45, fund: .5, rev: .3, launch: .5, coop: .4, pol: .45, hr: .35, inc: .4 }[kind] + r() * .3;
        const F = pick(FEATURES), nm = id => ent.get(id).name;
        switch (kind) {
          case 'rel': title = first ? `${nm(subj)} 首次推出${F}` : subj === M ? `${C === 'xai' ? 'xAI' : nm(C)} 发布 ${nm(M)} 新版本（${nextVer(subj, true)}）` : `${nm(subj)} 发布 ${nextVer(subj, true)}：${F}`; ents.push(subj); break;
          case 'upd': title = first ? `${nm(subj)} 首次支持${F}` : `${nm(subj)} 更新 ${P === subj ? nextVer(subj) + '：' : ''}${F}`; ents.push(subj); break;
          case 'rum': title = first ? `传 ${nm(C)} 首次${pick(['自研训练芯片', '自研推理芯片', '自建数据中心', '自研光互连'])}` : `传 ${nm(C)} 正在${pick(RUMORS)}`; if (r() < .4) ents.push('nvidia'); break;
          case 'fund': title = `${nm(C)} 完成新一轮融资，估值 ${Math.round(30 + r() * 4000)} 亿美元`; break;
          case 'rev': title = first ? `${pick(SOURCES.yt)} 实测：${nm(subj)} 首次在${pick(ASPECTS)}上反超竞品` : `${pick(SOURCES.yt)} 实测 ${nm(subj)}：${pick(ASPECTS)}`; ents.push(subj); if (r() < .5) { const comp = rels.find(q => q.rel === '竞品' && (q.a === subj || q.b === subj)); if (comp) ents.push(comp.a === subj ? comp.b : comp.a); } break;
          case 'launch': if (r() < .45) { starship++; title = first ? `星舰首次${pick(['完成塔臂回收二级', '实现在轨加注', '搭载星链 V3 入轨'])}` : `星舰第 ${starship} 次试飞${pick(['定档', '成功', '推迟', '完成静态点火', '取得 FAA 许可'])}`; ents = ['spacex', 'starship', 'boca']; } else { falcon++; title = `猎鹰 9 完成第 ${falcon} 次发射，星链组网 +${20 + Math.floor(r() * 10)}`; ents = ['spacex', 'falcon9', 'starlink']; } break;
          case 'coop': { const others = [...ent.values()].filter(e => e.type === 'C' && e.id !== C); const C2 = pick(others); title = `${nm(C)} 与 ${C2.name} 达成合作：${F}`; ents.push(C2.id); break; }
          case 'pol': { const L2 = pick(E.filter(e => e[2] === 'L')); title = `${L2[1]}出台${pick(POLICIES)}，波及 ${nm(C)}`; ents.push(L2[0]); break; }
          case 'hr': title = `${nm(C)} 宣布新任${pick(ROLES)}`; break;
          case 'inc': title = `${nm(subj)} 大面积故障 ${1 + Math.floor(r() * 6)} 小时，官方已修复`; ents.push(subj); break;
        }
        if (first) sig = Math.max(sig, .82 + r() * .15);
        ents = [...new Set(ents.filter(Boolean))];
        add({ t, sl: sl.id, kind, title, ents, sig: Math.min(1, sig), first: first ? (kind === 'rel' ? '首次发售' : kind === 'rum' ? '首次研发' : '首次突破') : null, by: firstBy(kind), src: srcFor(kind, sig, first) });
      }
    }
  }
  const S = (h, sl, kind, title, ents, sig, first, by, src) => add({ t: now - h * HOUR, sl, kind, title, ents, sig, first: first || null, by, src: src || srcFor(kind, sig, !!first) });
  S(16.7, 'ccode', 'rel', 'Claude Code 推出原生 Windows 版，首次脱离 WSL 运行', ['ccode', 'anthropic', 'windows'], .97, '首次发售', 'X · @claudeai', { x: 214, yt: 6, news: 18, cl: 1 });
  S(11.4, 'gpt', 'upd', 'GPT 语音模式首次支持实时双向翻译通话', ['chatgpt', 'gpt5', 'openai'], .93, '首次突破', 'X · @OpenAI', { x: 86, yt: 2, news: 4, cl: 0 });
  S(3.5, 'musk', 'rum', '传 xAI 首次自研训练芯片，代号未公开', ['xai', 'nvidia', 'tsmc'], .88, '首次研发', 'X · @TheInformation', { x: 132, yt: 0, news: 2, cl: 0 });
  S(1.6, 'codex', 'upd', 'Codex 更新 v0.52：并行子任务；修复 Windows 路径转义', ['codex', 'openai', 'windows'], .7, null, 'Changelog · Codex Releases', { x: 41, yt: 1, news: 3, cl: 1 });
  S(26, 'musk', 'launch', '星舰第 12 次试飞定档 10/26', ['spacex', 'starship', 'boca'], .74, null, 'X · @SpaceX', { x: 320, yt: 4, news: 11, cl: 0 });
  S(5, 'claude', 'upd', 'Claude 系统提示公开版更新：新增工具调用约束', ['claudeai', 'anthropic', 'sonnet45'], .62, null, 'Changelog · Anthropic Docs Changelog', { x: 58, yt: 1, news: 2, cl: 1 });
  S(2.9, 'ccode', 'rev', 'Fireship 实测 Claude Code Windows 版：冷启动快 40%', ['ccode', 'windows', 'codex'], .55, null, 'YouTube · Fireship', { x: 22, yt: 1, news: 0, cl: 0 });
  S(.7, 'ccode', 'upd', 'Claude Code 更新 v2.1.1：热修复路径与权限问题', ['ccode', 'anthropic'], .5, null, 'Changelog · claude-code Releases', { x: 19, yt: 0, news: 1, cl: 1 });
  S(14, 'surge', 'rel', 'Surge 6 首次提供 Linux 命令行版', ['surgeapp', 'nssurge'], .66, '首次发售', 'Changelog · Surge Release Notes', { x: 9, yt: 0, news: 1, cl: 1 });
  S(8 * 24 + 3, 'ccode', 'rel', 'Agent SDK 2.0 首发：子代理与会话持久化', ['agentsdk', 'ccode', 'anthropic'], .9, '首次发售', 'X · @AnthropicAI');
  S(13 * 24 + 5, 'codex', 'upd', 'Codex 首次支持并行子任务（预览）', ['codex', 'openai'], .86, '首次突破', 'Changelog · Codex Releases');
  S(26 * 24 + 7, 'musk', 'launch', '星舰首次完成塔臂回收二级', ['spacex', 'starship', 'boca'], .95, '首次突破', 'X · @SpaceX');
  S(90 * 24 + 2, 'codex', 'upd', 'Codex 首次支持云端任务', ['codex', 'openai'], .84, '首次突破', 'X · @OpenAIDevs');
  S(164 * 24 + 1, 'claude', 'rel', 'Claude 首次推出混合推理模式', ['opus4', 'anthropic'], .92, '首次发售', 'X · @AnthropicAI');
  S(47 * 24 + 4, 'gpt', 'rel', 'ChatGPT 首次推出全新语音模式', ['chatgpt', 'openai', 'gpt5'], .9, '首次发售', 'X · @OpenAI');
  events.sort((a, b) => a.t - b.t);
  enrich(events, now);
  const upcoming = [{ t: now + 4 * DAY, sl: 'musk', title: '星舰 12 飞 发射窗口', kind: '窗口', by: 'FAA 公告 · SpaceX' }, { t: now + 6 * DAY, sl: 'gpt', title: 'OpenAI DevDay', kind: '预告', by: 'OpenAI 官方博客' }, { t: now + 6 * DAY, sl: 'codex', title: 'Codex 1.0（传闻将在 DevDay 发布）', kind: '传闻', by: 'X · @TheInformation 等 41 个来源' }, { t: now + 9 * DAY, sl: 'ccode', title: 'Claude Code 2.2（路线图提及）', kind: '预告', by: 'GitHub Discussions' }, { t: now + 12 * DAY, sl: 'cn', title: 'DeepSeek 下一代模型（传闻）', kind: '传闻', by: '公众号 · 晚点LatePost 等' }, { t: now + 18 * DAY, sl: 'cursor', title: 'Cursor 年度发布会', kind: '预告', by: 'Cursor Blog' }, { t: now + 25 * DAY, sl: 'chips', title: 'NVIDIA 季度财报', kind: '预告', by: 'SEC EDGAR' }, { t: now + 39 * DAY, sl: 'claude', title: '下一代 Claude 模型（传闻 11 月内）', kind: '传闻', by: 'X · 多个独立账号' }];
  const deg = new Map(); for (const q of rels) { deg.set(q.a, (deg.get(q.a) || 0) + 1); deg.set(q.b, (deg.get(q.b) || 0) + 1); }
  for (const ev of events) for (const id of ev.ents) deg.set(id, (deg.get(id) || 0) + .08);
  const members = new Map(); for (const q of rels) if (q.rel === '属于') { if (!members.has(q.b)) members.set(q.b, new Set()); members.get(q.b).add(q.a); }
  const c3 = new Map(), c30 = new Map(), rising = new Set();
  for (const ev of events) if (ev.t >= now - 30 * DAY) for (const id of ev.ents) { const m = ev.t >= now - 3 * DAY ? c3 : c30; m.set(id, (m.get(id) || 0) + 1); }
  for (const [id, n] of c3) { const base = (c30.get(id) || 0) / 9; if (n >= 3 && n > base * 1.8 + .5) rising.add(id); }
  return { now, ent, entities: [...ent.values()], rels, events, upcoming, items, deg, members, rising, tracked: new Set(STORYLINES.filter(s => s.tracked).map(s => s.id)) };
}

export const fmtTime = (t, now) => { const d = new Date(t); const hh = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); const sod = x => { const q = new Date(x); q.setHours(0, 0, 0, 0); return q.getTime(); }, dd = Math.round((sod(now) - sod(t)) / DAY); return (dd <= 0 ? '今天' : dd === 1 ? '昨日' : `${d.getMonth() + 1}/${d.getDate()}`) + ' ' + hh; };
export const fmtN = n => n.toLocaleString('en-US');
export const stats = db => ({ sources: SOURCE_COUNT, items: db.items, events: db.events.length, entities: db.entities.length, relations: db.rels.length });
export const eventsSince = (db, t) => db.events.filter(e => e.t >= t);
export const significant = (list, max = 7) => [...list].sort((a, b) => b.sig - a.sig).slice(0, max).filter(e => e.sig >= .6).sort((a, b) => b.t - a.t);
export const eventsOf = (db, id, since = 0) => { const m = db.members && db.members.get(id); return db.events.filter(e => e.t >= since && (e.sl === id || e.ents.includes(id) || (m && e.ents.some(x => m.has(x))))); };
const dailyCounts_ = (db, id, days = 365) => { const out = new Array(days).fill(0); for (const e of db.events) if (e.sl === id) { const i = days - 1 - Math.floor((db.now - e.t) / DAY); if (i >= 0 && i < days) out[i]++; } return out; };
function storyChapters_(db, id) {
  const evs = db.events.filter(e => e.sl === id), fs = evs.filter(e => e.first), out = [];
  for (let i = 0; i <= fs.length; i++) { const from = i ? fs[i - 1].t : (evs[0] ? evs[0].t : db.now), cur = i === fs.length, to = cur ? db.now : fs[i].t; out.push({ idx: i, ms: i ? fs[i - 1] : null, from, to, cur, evs: evs.filter(e => !e.first && e.t >= from && (cur || e.t < to)) }); }
  return out.reverse();
}
export const neighbors = (db, id) => db.rels.filter(q => q.a === id || q.b === id).map(q => ({ id: q.a === id ? q.b : q.a, rel: q.rel, dir: q.a === id ? '→' : '←' }));
export function search(db, q) { q = q.trim().toLowerCase(); if (!q) return []; const out = []; for (const s of STORYLINES) if (s.name.toLowerCase().includes(q)) out.push({ kind: 'sl', id: s.id, name: s.name }); for (const e of db.entities) if (e.name.toLowerCase().includes(q) || e.id.includes(q)) out.push({ kind: 'ent', id: e.id, name: e.name, type: e.type }); return out.slice(0, 8); }
function storyStats_(db, id) {
  const now = db.now, evs = db.events.filter(e => e.sl === id); const c7 = evs.filter(e => e.t >= now - 7 * DAY).length;
  const spark = Array.from({ length: 14 }, (_, i) => evs.filter(e => e.t >= now - (14 - i) * DAY && e.t < now - (13 - i) * DAY).length);
  const firsts = evs.filter(e => e.first); const lastFirst = firsts[firsts.length - 1] || null;
  return { count: evs.length, c7, spark, lastFirst, day: lastFirst ? Math.floor((now - lastFirst.t) / DAY) + 1 : null, firsts: firsts.length };
}
export function graphData(db, { since, types, onlyTracked, maxEvents = 260 }) {
  const ents = db.entities.filter(e => types[e.type] && (!onlyTracked || e.type === 'T' || (e.sl && db.tracked.has(e.sl))));
  const ids = new Set(ents.map(e => e.id));
  const evs = types.E === false ? [] : db.events.filter(e => e.t >= since && e.ents.some(id => ids.has(id))).sort((a, b) => b.sig - a.sig).slice(0, maxEvents);
  const evDeg = new Map(); for (const ev of evs) for (const id of ev.ents) if (ids.has(id)) evDeg.set(id, (evDeg.get(id) || 0) + 1);
  const nodes = ents.map(e => { const d = (db.deg.get(e.id) || 0) + (evDeg.get(e.id) || 0) * .6; return { id: e.id, label: e.name, type: e.type, cluster: e.sl || '_', color: TYPE_COLOR[e.type], size: Math.min(9, 1 + Math.sqrt(d) * 1.1), rising: !!(db.rising && db.rising.has(e.id)) }; });
  const links = db.rels.filter(q => ids.has(q.a) && ids.has(q.b)).map(q => ({ a: q.a, b: q.b, rel: q.rel }));
  for (const ev of evs) { nodes.push({ id: ev.id, label: ev.title.length > 24 ? ev.title.slice(0, 24) + '…' : ev.title, type: 'E', cluster: ev.sl, color: ev.first ? '#c9a961' : TYPE_COLOR.E, size: ev.first ? 2.4 : .9 + ev.sig, first: !!ev.first, hot: !!ev.hot }); for (const id of ev.ents) if (ids.has(id)) links.push({ a: ev.id, b: id, rel: '涉及' }); }
  return { nodes, links };
}
export function analyze(db, q) {
  const now = db.now, ql = q.toLowerCase();
  const ents = db.entities.filter(e => ql.includes(e.name.toLowerCase()) || (e.id.length > 3 && ql.includes(e.id)));
  const sls = STORYLINES.filter(s => ql.includes(s.name.toLowerCase()) || (s.id === 'musk' && /马斯克|musk/.test(ql)) || (s.id === 'cn' && /国产|中国/.test(ql)));
  const range = /今天|24 ?小时|今日/.test(ql) ? 1 : /本周|7 ?天|一周|上周|最近/.test(ql) ? 7 : /本月|30 ?天|一个月|这个月/.test(ql) ? 30 : /今年|一年|全年|12 ?个月/.test(ql) ? 365 : 7;
  const since = now - range * DAY;
  const entNames = new Set(ents.map(e => e.name.toLowerCase()));
  const subjects = [...ents.map(e => ({ id: e.id, name: e.name, evs: eventsOf(db, e.id, since) })), ...sls.filter(s => !entNames.has(s.name.toLowerCase())).map(s => ({ id: s.id, name: s.name, evs: db.events.filter(e => e.sl === s.id && e.t >= since), sl: true }))];
  const uniq = list => { const seen = new Set(); return list.filter(e => !seen.has(e.id) && seen.add(e.id)); };
  if (!subjects.length) subjects.push({ id: '_', name: '我追踪的全部', evs: db.events.filter(e => e.t >= since && db.tracked.has(e.sl)) });
  const intent = /首次|第一次|里程碑|首创/.test(ql) ? 'firsts' : subjects.length >= 2 && /谁|对比|比较|更|vs|还是/.test(ql) ? 'compare' : /多少|几次|几个|频率|多频繁|数量/.test(ql) ? 'count' : /关联|关系|相关|投资|竞品|属于|背后|谁开发/.test(ql) ? 'relations' : /传闻|可信|真的|靠谱/.test(ql) ? 'rumor' : 'summary';
  const evidence = intent === 'firsts' ? uniq(subjects.flatMap(s => s.evs.filter(e => e.first))).sort((a, b) => b.t - a.t).slice(0, 10) : intent === 'rumor' ? uniq(subjects.flatMap(s => s.evs.filter(e => e.kind === 'rum'))).sort((a, b) => b.t - a.t).slice(0, 8) : uniq(subjects.flatMap(s => s.evs)).sort((a, b) => b.sig - a.sig).slice(0, 8).sort((a, b) => b.t - a.t);
  const chart = (intent === 'compare' || intent === 'count' || intent === 'summary') ? subjects.slice(0, 3).map(s => ({ name: s.name, days: Array.from({ length: 14 }, (_, i) => s.evs.filter(e => e.t >= now - (14 - i) * DAY && e.t < now - (13 - i) * DAY).length) })) : [];
  const kindMix = evs => { const m = {}; for (const e of evs) m[e.kind] = (m[e.kind] || 0) + 1; return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${KIND_NAME[k]} ${n}`).join('、'); };
  const rangeTxt = range === 1 ? '过去 24 小时' : `过去 ${range} 天`;
  let text;
  if (intent === 'compare') { const [a, b] = subjects; text = `${rangeTxt}，${a.name} 有 ${a.evs.length} 个事件（${kindMix(a.evs) || '无'}），${b.name} 有 ${b.evs.length} 个（${kindMix(b.evs) || '无'}）。${a.evs.length === b.evs.length ? '两者节奏相当' : (a.evs.length > b.evs.length ? a.name : b.name) + ' 更活跃'}；首次里程碑：${a.name} ${a.evs.filter(e => e.first).length} 项，${b.name} ${b.evs.filter(e => e.first).length} 项。`; }
  else if (intent === 'firsts') text = evidence.length ? `${rangeTxt}共 ${evidence.length} 项首次：` + evidence.map(e => `${fmtTime(e.t, now)} ${e.title}（${e.first}）`).join('；') + '。' : `${rangeTxt}没有新的首次里程碑。`;
  else if (intent === 'relations') { const s = subjects[0]; const nb = s.sl ? [] : neighbors(db, s.id); text = nb.length ? `${s.name} 在图谱中有 ${nb.length} 条直接关系：` + nb.slice(0, 12).map(n => `${n.rel} ${db.ent.get(n.id).name}`).join('、') + `。${rangeTxt}它出现在 ${s.evs.length} 个事件里。` : `${s.name} 作为主题，${rangeTxt}有 ${s.evs.length} 个事件，涉及实体：` + [...new Set(s.evs.flatMap(e => e.ents))].slice(0, 10).map(id => db.ent.get(id)?.name).filter(Boolean).join('、') + '。'; }
  else if (intent === 'rumor') { const rum = evidence; text = rum.length ? `${rangeTxt}有 ${rum.length} 条传闻。判断依据：首报来源与扩散面——` + rum.slice(0, 4).map(e => `「${e.title}」首报 ${e.by}，原文 ${fmtBig(e.docs)} 篇，其中新闻 ${fmtN(e.mix.news || 0)} 篇${credOf(e) >= .4 ? '，已有主流媒体跟进，可信度中等' : '，主流媒体跟进少，可信度偏低'}`).join('；') + '。' : `${rangeTxt}没有相关传闻。`; }
  else { const s = subjects[0]; const f = s.evs.filter(e => e.first); const top = [...s.evs].sort((a, b) => b.sig - a.sig)[0]; const docs = s.evs.reduce((n, e) => n + e.docs, 0), x = s.evs.reduce((n, e) => n + (e.mix.x || 0), 0), nw = s.evs.reduce((n, e) => n + (e.mix.news || 0), 0); text = `${rangeTxt}，${s.name} 共 ${s.evs.length} 个事件（${kindMix(s.evs) || '无'}），聚合自 ${fmtBig(docs)} 篇原文（X ${fmtBig(x)}、新闻 ${fmtBig(nw)}）。${f.length ? `其中 ${f.length} 项首次：${f.map(e => e.title).join('；')}。` : '没有新的首次。'}${top ? `声量最高：「${top.title}」（${fmtTime(top.t, now)}，首报 ${top.by}）。` : ''}`; }
  const context = { 时间范围: rangeTxt, 主体: subjects.map(s => ({ 名称: s.name, 事件数: s.evs.length, 类型分布: kindMix(s.evs) })), 依据事件: evidence.map(e => ({ 时间: fmtTime(e.t, now), 标题: e.title, 类型: KIND_NAME[e.kind], 首次: e.first, 首报: e.by, 原文数: e.docs, 来源构成: e.mix })), 关系: subjects.filter(s => !s.sl && s.id !== '_').flatMap(s => neighbors(db, s.id).slice(0, 12).map(n => `${s.name} ${n.rel} ${db.ent.get(n.id).name}`)) };
  return { intent, range, subjects: subjects.map(s => ({ id: s.id, name: s.name, sl: !!s.sl })), evidence, chart, text, context };
}

// ───────── 规模层：来源目录 → 原文 → 事件聚合；追踪任务；预测 ─────────
// 原文从不全量进前端：界面拿到的是每个事件的原文计数与构成，原文按页确定性生成（真实系统里是检索索引的分页查询）。
const hashStr = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
export const SRC_TYPES = [
  { id: 'x', name: 'X', g: 'X', c: '#5b6170', n: 412880, day: 2.14e8, lag: '1 分钟' },
  { id: 'weibo', name: '微博', g: '微', c: '#b46a5e', n: 96340, day: 4.12e7, lag: '2 分钟' },
  { id: 'rss', name: 'RSS', g: 'R', c: '#b88a52', n: 1240512, day: 3.82e7, lag: '12 分钟' },
  { id: 'news', name: '新闻网站', g: '新', c: '#5f7bb8', n: 84210, day: 2.95e7, lag: '8 分钟' },
  { id: 'reddit', name: 'Reddit', g: 'Rd', c: '#b9785a', n: 12400, day: 1.86e7, lag: '4 分钟' },
  { id: 'wechat', name: '公众号', g: '公', c: '#5f9479', n: 168900, day: 6.2e6, lag: '30 分钟' },
  { id: 'yt', name: 'YouTube', g: 'YT', c: '#a8625f', n: 38200, day: 4.1e5, lag: '45 分钟' },
  { id: 'bili', name: 'B站', g: 'B', c: '#5f93ad', n: 21450, day: 1.8e5, lag: '1 小时' },
  { id: 'gh', name: 'GitHub · Changelog', g: 'GH', c: '#7f6fb3', n: 74300, day: 9.6e4, lag: '3 分钟' },
  { id: 'filing', name: '财报 · 公告', g: '财', c: '#9b8a5a', n: 6410, day: 3.8e4, lag: '20 分钟' },
  { id: 'podcast', name: '播客转录', g: '播', c: '#93709f', n: 18700, day: 2.6e4, lag: '4 小时' },
  { id: 'blog', name: '官方博客', g: '博', c: '#5d8f8a', n: 9820, day: 1.4e4, lag: '6 分钟' },
  { id: 'hn', name: 'Hacker News', g: 'HN', c: '#b0875e', n: 1, day: 1.2e4, lag: '2 分钟' },
  { id: 'arxiv', name: 'arXiv', g: 'ar', c: '#9c6461', n: 186, day: 2.1e3, lag: '2 小时' },
];
export const SRC = Object.fromEntries(SRC_TYPES.map(s => [s.id, s]));
export const SCALE = { totalDocs: 1382640118204, sources: SRC_TYPES.reduce((n, s) => n + s.n, 0), dayDocs: SRC_TYPES.reduce((n, s) => n + s.day, 0), dedupe: .33, entityLib: 48213, dayEvents: 214300, totalEvents: 96418230 };
export const fmtBig = n => n >= 1e12 ? (n / 1e12).toFixed(2) + ' 万亿' : n >= 1e8 ? (n / 1e8).toFixed(2) + ' 亿' : n >= 1e4 ? (n / 1e4).toFixed(n >= 1e6 ? 0 : 1) + ' 万' : Math.round(n).toLocaleString('en-US');
const MIXW = {
  rel: { x: 38, weibo: 9, news: 13, rss: 8, reddit: 6, wechat: 8, yt: 3, bili: 2, gh: 2, blog: 1, hn: 3, podcast: .4, arxiv: .2, filing: .1 },
  upd: { x: 34, weibo: 5, news: 6, rss: 9, reddit: 9, wechat: 4, yt: 2, bili: 1, gh: 12, blog: 1, hn: 5, podcast: .2, arxiv: .1 },
  rum: { x: 52, weibo: 14, news: 7, rss: 4, reddit: 12, wechat: 6, yt: 1, bili: 1, hn: 2, podcast: .6 },
  fund: { x: 26, weibo: 8, news: 28, rss: 8, reddit: 4, wechat: 14, filing: 4, hn: 3, podcast: 1, blog: .5 },
  rev: { x: 30, weibo: 6, news: 5, rss: 7, reddit: 14, wechat: 6, yt: 12, bili: 10, hn: 6, podcast: 1 },
  launch: { x: 48, weibo: 10, news: 14, rss: 5, reddit: 9, wechat: 5, yt: 6, bili: 3 },
  coop: { x: 28, weibo: 8, news: 26, rss: 8, wechat: 14, blog: 3, filing: 2, reddit: 4, hn: 2 },
  pol: { x: 22, weibo: 18, news: 30, rss: 6, wechat: 16, filing: 3, reddit: 3 },
  hr: { x: 40, weibo: 8, news: 22, rss: 6, wechat: 10, reddit: 6, hn: 4, podcast: 1 },
  inc: { x: 46, weibo: 12, news: 8, reddit: 16, hn: 8, rss: 3, wechat: 4, gh: 2 },
};
const BYMAP = { X: 'x', Changelog: 'gh', YouTube: 'yt', 新闻: 'news' };
const Fc = (h, tau) => 1 - Math.exp(-Math.pow(Math.max(0, h) / tau, .8));
function enrich(events, now) {
  for (const ev of events) {
    const r = rng(hashStr(ev.id + ev.title)), w = MIXW[ev.kind] || MIXW.upd;
    const docs = Math.max(12, Math.round(Math.pow(10, 1.6 + ev.sig * 3.1) * (.55 + r() * .9)));
    const mix = {}; let tot = 0; for (const k in w) { const v = w[k] * (.5 + r()); mix[k] = v; tot += v; }
    for (const k in mix) mix[k] = Math.round(mix[k] / tot * docs);
    const ft = BYMAP[ev.by.split(' · ')[0]] || 'x'; if (!mix[ft]) mix[ft] = 1;
    ev.mix = mix; ev.docs = Object.values(mix).reduce((a, b) => a + b, 0); ev.srcN = Math.max(1, Math.round(ev.docs * (.1 + r() * .12))); ev.firstType = ft; ev.tau = 2 + r() * 10;
    ev.hot = now - ev.t < 36 * HOUR && ev.docs > 6000;
  }
}
function spreadSeries_(ev, now, n = 36) { const age = (now - ev.t) / HOUR, Fa = Fc(age, ev.tau) || 1, out = []; for (let i = 0; i < n; i++) { if (i >= age) { out.push(null); continue; } const a = Fc(i, ev.tau), b = Math.min(Fc(i + 1, ev.tau), Fa); out.push(Math.round(ev.docs * (b - a) / Fa)); } return out; }
export const settled = (ev, now) => Fc((now - ev.t) / HOUR, ev.tau) > .96;
const NAMES = {
  x: SOURCES.x, weibo: ['@量子位', '@机器之心', '@新浪科技', '@36氪', '@爱范儿', '@IT之家', '@极客公园', '@阑夕', '@宝玉xp', '@歸藏'],
  rss: ['Simon Willison', 'Stratechery', 'Latent Space', 'Interconnects', 'One Useful Thing', 'Import AI', 'The Batch', '阮一峰的网络日志', '少数派', 'Ben Thompson'],
  news: SOURCES.news, reddit: ['r/LocalLLaMA', 'r/ChatGPT', 'r/ClaudeAI', 'r/singularity', 'r/programming', 'r/OpenAI', 'r/spacex', 'r/teslamotors', 'r/MachineLearning'], hn: ['Hacker News'],
  wechat: ['机器之心', '量子位', '新智元', '晚点LatePost', '极客公园', '甲子光年', '硅星人', 'APPSO', '腾讯科技', '虎嗅APP'], gh: SOURCES.cl, yt: SOURCES.yt.slice(0, 8),
  bili: ['影视飓风', '老石谈芯', '技术爬爬虾', '差评君', '林亦LYi', 'Ele实验室'], podcast: ['Latent Space', 'Lex Fridman', 'Dwarkesh Podcast', 'Hard Fork', '硅谷101', '晚点聊', '科技早知道'],
  blog: ['Anthropic News', 'OpenAI Blog', 'Google DeepMind Blog', 'xAI News', 'NVIDIA Blog', 'GitHub Blog', 'Cursor Blog', 'Meta AI Blog'], filing: ['SEC EDGAR · 8-K', 'SEC EDGAR · 10-Q', '港交所披露易', '上交所公告', '巨潮资讯'], arxiv: ['arXiv cs.CL', 'arXiv cs.AI', 'arXiv cs.LG', 'arXiv cs.SE'],
};
const TPL = {
  x: ['{t}', '刚看到：{t}', '{e} 这次有点东西。{t}', '实测了一下 {e}，{k}比预期顺', '{t}（转）', '值得关注：{t}'],
  weibo: ['【{e}】{t}', '#{e}# {t}', '{t}，评论区吵翻了'], rss: ['{t}', '关于 {e} 的几点观察', '{e}：这次{k}意味着什么', '笔记：{t}'],
  news: ['{t}', '{e}{k}，业内人士怎么看', '独家｜{t}', '{t}：要点梳理'], reddit: ['[讨论] {t}', '{e} 这次{k}，大家怎么看？', 'PSA: {t}'],
  hn: ['{t}', 'Show HN: 用 {e} 做的小工具', 'Ask HN: {e} 这次{k}值得升级吗？'], wechat: ['{e} 又有新动作：{t}', '一文读懂 {e} 这次{k}', '深度｜{t}背后'],
  gh: ['{e} release notes', '{e} · CHANGELOG 更新', 'Release {v} · {e}'], yt: ['{t}｜实测', '我用 {e} 跑了 24 小时', '{e} {k}：值不值？'], bili: ['【实测】{t}', '{e}{k}，到底强在哪？', '三分钟看懂 {e}'],
  podcast: ['第 {n} 期：聊聊 {e} 的{k}', '{e} 与这一轮竞争'], blog: ['{t}', 'Introducing: {t}'], filing: ['{c} 提交重大事项披露', '{c} 季度报告提及 {e}'], arxiv: ['Evaluating {e}-style coding agents', 'On {k} dynamics in frontier models', 'A study of {e} in the wild'],
};
const SNIPS = ['正文提到 {e} 的{k}细节，并和上一版做了对比。', '作者认为这次{k}会影响 {c} 接下来的节奏。', '讨论集中在兼容性、价格和上手成本。', '附带官方链接与截图，内容转述自首报来源。', '汇总了多方说法，部分细节尚未证实。', '给出了实测数据和复现步骤。'];
const pickR = (r, a) => a[Math.floor(r() * a.length)];
function docsOf_(db, ev, page = 0, type = null, per = 25) {
  const total = type ? (ev.mix[type] || 0) : ev.docs, start = page * per, n = Math.max(0, Math.min(per, total - start));
  const age = (db.now - ev.t) / HOUR, Fa = Fc(age, ev.tau) || .5, types = Object.entries(ev.mix).filter(([, v]) => v > 0), tw = types.reduce((a, [, v]) => a + v, 0);
  const ents = ev.ents.map(id => db.ent.get(id)).filter(Boolean), main = ents.find(e => e.type === 'P' || e.type === 'M') || ents[0] || { id: '', name: '' }, comp = ents.find(e => e.type === 'C') || main, out = [];
  for (let i = 0; i < n; i++) {
    const k = start + i, r = rng(hashStr(ev.id + (type || '*') + k)), isFirst = k === 0 && !type;
    let ty = type; if (!ty) { if (isFirst) ty = ev.firstType; else { let x = r() * tw; for (const [t, v] of types) { x -= v; if (x <= 0) { ty = t; break; } } ty = ty || 'x'; } }
    const q = Math.min(.999, (k + .5) / Math.max(1, total) * Fa), hrs = isFirst ? 0 : ev.tau * Math.pow(-Math.log(1 - q), 1.25);
    const fill = s => s.replace('{t}', ev.title).replace(/\{e\}/g, main.name).replace('{k}', KIND_NAME[ev.kind]).replace('{c}', comp.name).replace('{v}', 'v' + (1 + Math.floor(r() * 3)) + '.' + Math.floor(r() * 20)).replace('{n}', String(40 + Math.floor(r() * 300)));
    const ments = ents.filter(() => r() < .75).slice(0, 4).map(e => ({ id: e.id, name: e.name, conf: .8 + r() * .19 }));
    out.push({ id: ev.id + '-' + (type || 'a') + k, k, ev: ev.id, type: ty, first: isFirst, src: isFirst ? ev.by.split(' · ').slice(1).join(' · ') : pickR(r, NAMES[ty]), t: ev.t + hrs * HOUR, title: fill(isFirst ? '{t}' : pickR(r, TPL[ty])), snippet: fill(pickR(r, SNIPS)), ments: ments.length ? ments : [{ id: main.id, name: main.name, conf: .9 }], dup: r() < .2 ? 2 + Math.floor(r() * 40) : 0, lang: ['x', 'reddit', 'hn', 'yt', 'gh', 'arxiv', 'podcast', 'blog'].includes(ty) && r() < .7 ? 'en' : 'zh', words: 80 + Math.floor(r() * 2400), sim: .78 + r() * .2 });
  }
  return { total, docs: out.sort((a, b) => a.t - b.t) };
}
export const TASKS = [
  { id: 't1', ago: 62, origin: 'you', via: '你搜索「Claude」后点了「追踪」', name: 'Claude 生态', status: 'run', sls: ['claude', 'ccode'], ents: ['anthropic', 'claudeai', 'ccode', 'agentsdk', 'mcp', 'opus4', 'sonnet45', 'haiku45'], kw: '(claude OR anthropic OR "claude code") NOT monet', types: null, lang: 'all', alerts: ['first', 'vol', 'official'] },
  { id: 't2', ago: 41, origin: 'you', via: '你手动新建', name: 'AI 编程工具横评', status: 'run', sls: ['ccode', 'codex', 'cursor'], ents: ['ccode', 'codex', 'cursorapp', 'copilot', 'geminicli', 'vibe'], kw: '("vibe coding" OR "AI 编程" OR copilot OR cursor OR codex)', types: ['gh', 'x', 'hn', 'reddit', 'yt', 'bili', 'blog', 'rss'], lang: 'all', alerts: ['first', 'official'] },
  { id: 't3', ago: 120, origin: 'you', via: '你在「Surge」故事线里点了「追踪」', name: 'Surge 更新', status: 'run', sls: ['surge'], ents: ['surgeapp', 'nssurge'], kw: 'surge AND (mac OR ios OR proxy OR 代理)', types: ['gh', 'blog', 'rss', 'x'], lang: 'all', alerts: ['official'] },
  { id: 't4', ago: 33, origin: 'sug', via: '你采纳了我的建议（当时马斯克相关讨论一周涨了 3 倍）', name: '马斯克系', status: 'run', sls: ['musk'], ents: ['xai', 'spacex', 'tesla', 'xcorp', 'musk', 'starship', 'grok4'], kw: '(musk OR 马斯克 OR spacex OR xai OR 星舰)', types: null, lang: 'all', alerts: ['first', 'vol', 'rumor'] },
  { id: 't5', ago: 88, origin: 'you', via: '你手动新建', name: 'OpenAI 动态', status: 'run', sls: ['gpt', 'codex'], ents: ['openai', 'chatgpt', 'gpt5', 'codex', 'o4', 'altman'], kw: '(openai OR chatgpt OR "gpt-5" OR codex)', types: null, lang: 'all', alerts: ['first', 'vol'] },
  { id: 't6', ago: 20, origin: 'you', via: '你手动新建，12 天前暂停', name: '国产大模型', status: 'pause', sls: ['cn'], ents: ['deepseek', 'alibaba', 'moonshot', 'zhipu', 'bytedance'], kw: '(deepseek OR qwen OR kimi OR 智谱 OR 豆包)', types: ['news', 'wechat', 'weibo', 'x', 'hn'], lang: 'zh', alerts: ['first'] },
];
export const ALERT_NAME = { first: '出现首次', vol: '声量超过 1 万篇', official: '官方来源发布', rumor: '传闻被主流媒体跟进' };
export const typedDocs = (e, types) => types ? types.reduce((n, t) => n + (e.mix[t] || 0), 0) : e.docs;
export const taskMatch = task => { const ents = new Set(task.ents), sls = new Set(task.sls); return e => sls.has(e.sl) || e.ents.some(x => ents.has(x)); };
const isOfficial = e => e.firstType === 'gh' || e.firstType === 'blog' || /^X · @(Anthropic|claude|OpenAI|xai|SpaceX|Tesla|cursor|github|Surge)/i.test(e.by);
function taskStats_(db, task, since) {
  const m = taskMatch(task), now = db.now, evs = db.events.filter(e => m(e) && typedDocs(e, task.types) > 0), recent = evs.filter(e => e.t >= since);
  const days = Array(14).fill(0), docsD = Array(14).fill(0);
  for (const e of evs) { const i = 13 - Math.floor((now - e.t) / DAY); if (i >= 0 && i < 14) { days[i]++; docsD[i] += typedDocs(e, task.types); } }
  const A = task.alerts || [], hit = e => ((A.includes('first') && e.first) || (A.includes('vol') && e.docs > 10000) || (A.includes('official') && isOfficial(e) && e.sig > .5) || (A.includes('rumor') && e.kind === 'rum' && (e.mix.news || 0) > 60)), alerts = evs.filter(e => e.t >= now - 3 * DAY && hit(e)).sort((a, b) => b.t - a.t), alerts14 = evs.filter(e => e.t >= now - 14 * DAY && hit(e)).length;
  return { alerts14, evs: recent.sort((a, b) => b.t - a.t), docs: recent.reduce((n, e) => n + typedDocs(e, task.types), 0), days, docsD, alerts, avgDocs: Math.round(docsD.reduce((a, b) => a + b, 0) / 14), avgEv: +(days.reduce((a, b) => a + b, 0) / 14).toFixed(1) };
}
export const alertReason = (e, task) => { const A = task.alerts || []; return A.includes('first') && e.first ? '出现首次' : A.includes('vol') && e.docs > 10000 ? '声量超过 1 万篇' : A.includes('rumor') && e.kind === 'rum' ? '传闻被主流媒体跟进' : '官方来源发布'; };
export const credOf = e => Math.max(.06, Math.min(.92, .12 + ((e.mix.news || 0) + (e.mix.blog || 0) * 4 + (e.mix.filing || 0) * 4) / Math.max(1, e.docs) * 2.4 + (e.docs > 5000 ? .12 : 0)));
function predict_(db, id) {
  const now = db.now, evs = db.events.filter(e => e.sl === id), rel = evs.filter(e => (e.kind === 'rel' || e.kind === 'launch') && e.t > now - 240 * DAY);
  let cadence = null;
  if (rel.length >= 3) { const iv = []; for (let i = 1; i < rel.length; i++) iv.push((rel[i].t - rel[i - 1].t) / DAY); iv.sort((a, b) => a - b); const med = iv[Math.floor(iv.length / 2)], q1 = iv[Math.floor(iv.length * .25)], q3 = iv[Math.floor(iv.length * .75)], last = rel[rel.length - 1]; let lo = last.t + q1 * DAY, hi = last.t + q3 * DAY; const overdue = hi < now; if (overdue) { lo = now; hi = now + Math.max(2, (q3 - q1)) * DAY; } cadence = { n: rel.length, med, last, lo, hi, overdue, conf: Math.max(.2, Math.min(.85, 1 - (q3 - q1) / (med * 2 + 1))) }; }
  const rumors = evs.filter(e => e.kind === 'rum' && e.t > now - 60 * DAY).slice(-4).reverse().map(e => ({ ev: e, cred: credOf(e) }));
  return { cadence, rumors, up: db.upcoming.filter(u => u.sl === id) };
}
export function chapterBrief(db, c) {
  const n = c.evs.length; if (!n) return '这一篇章还没有其他事件。';
  const m = {}; for (const e of c.evs) m[e.kind] = (m[e.kind] || 0) + 1; const ks = Object.entries(m).sort((a, b) => b[1] - a[1]);
  const docs = c.evs.reduce((a, e) => a + e.docs, 0), top = c.evs.reduce((a, e) => e.docs > a.docs ? e : a, c.evs[0]), days = Math.max(1, Math.round((c.to - c.from) / DAY));
  return `${days} 天里有 ${n} 个事件，以${KIND_NAME[ks[0][0]]}（${ks[0][1]}）${ks[1] ? '和' + KIND_NAME[ks[1][0]] + '（' + ks[1][1] + '）' : ''}为主，背后是 ${fmtBig(docs)} 篇原文。讨论最多的是「${top.title}」，共 ${fmtBig(top.docs)} 篇。`;
}
function ingestSeries_(now, hours = 24) { const out = []; for (let i = 0; i < hours; i++) { const t = now - (hours - i) * HOUR, hr = new Date(t).getHours(), f = .78 + .22 * Math.sin((hr - 7) / 24 * Math.PI * 2), r = rng(hashStr('ing' + Math.floor(t / HOUR))); const by = {}; for (const s of SRC_TYPES) by[s.id] = s.day / 24 * f * (.9 + r() * .2); out.push({ t, by }); } return out; }
function risingEntities_(db, n = 8) { const now = db.now, d1 = new Map(), d7 = new Map(); for (const e of db.events) { if (e.t < now - 8 * DAY) continue; const m = e.t >= now - DAY ? d1 : d7; for (const id of e.ents) m.set(id, (m.get(id) || 0) + e.docs); } const out = []; for (const [id, v] of d1) { const base = (d7.get(id) || 0) / 7; out.push({ id, v, base, d: base ? v / base - 1 : 9 }); } return out.filter(x => db.ent.has(x.id) && x.v > 1500).sort((a, b) => b.d - a.d).slice(0, n); }

// ───── 缓存：同一份数据上的重复查询只算一次（交互时不再整页重算）─────
const _M = new WeakMap(), _G = new Map();
const memo = (db, k, f) => { let m = _M.get(db); if (!m) _M.set(db, m = new Map()); if (m.has(k)) return m.get(k); const v = f(); if (m.size > 4000) m.clear(); m.set(k, v); return v; };
const gmemo = (k, f) => { if (_G.has(k)) return _G.get(k); const v = f(); if (_G.size > 4000) _G.clear(); _G.set(k, v); return v; };
export const storyStats = (db, id) => memo(db, 'ss' + id, () => storyStats_(db, id));
export const storyChapters = (db, id) => memo(db, 'ch' + id, () => storyChapters_(db, id));
export const predict = (db, id) => memo(db, 'pr' + id, () => predict_(db, id));
export const dailyCounts = (db, id, days = 365) => memo(db, 'dc' + id + ':' + days, () => dailyCounts_(db, id, days));
export const taskStats = (db, task, since) => memo(db, 'ts' + JSON.stringify([task.ents, task.sls, task.types, task.alerts]) + Math.floor(since / 60000), () => taskStats_(db, task, since));
export const docsOf = (db, ev, page = 0, type = null, per = 25) => memo(db, 'do' + ev.id + ':' + page + ':' + type + ':' + per, () => docsOf_(db, ev, page, type, per));
export const risingEntities = (db, n = 8) => memo(db, 're' + n, () => risingEntities_(db, n));
export const spreadSeries = (ev, now, n = 36) => gmemo('sp' + ev.id + ':' + n + ':' + now, () => spreadSeries_(ev, now, n));
export const ingestSeries = (now, hours = 24) => gmemo('in' + Math.floor(now / HOUR) + ':' + hours, () => ingestSeries_(now, hours));
