// Whuffl content — single source of truth for the case study.
// Mirrors PRD §9 tree. All `.jpg` paths from the original docs are
// rewritten to `.png` to match the actual assets on disk.

const en = (s) => s;
const zh = (s) => s;
const B = (enStr, zhStr) => ({ en: enStr, zh: zhStr });

// ─── META ──────────────────────────────────────────────────────────────
export const project = {
  name: B("Whuffl", "Whuffl"),
  short: B("Whuffl", "Whuffl"),
  role: B(
    "Independent concept project — research, product strategy, UX/UI, physical product design, hardware feasibility, sourcing logic, pricing model and GTM strategy.",
    "独立概念项目 — 研究、产品策略、UX/UI、硬件产品设计、硬件可行性、供应链逻辑、定价模型与 GTM 策略。"
  ),
  eyebrow: B(
    "PRODUCT DESIGN · EXPERIENCE DESIGN · HARDWARE + APP",
    "产品设计 · 体验设计 · 硬件 + App"
  ),
  heroTitle: B(
    "Whuffl — Helping owners read the walk from a dog's point of view.",
    "Whuffl — 让主人从狗狗的视角重新理解一次散步。"
  ),
  definition: B(
    "Smart collar + app",
    "智能项圈 + 配套 App"
  ),
  quickFacts: [
    { value: "97", label: B("User questionnaires", "用户问卷"), accent: true },
    { value: B("Collar + App", "项圈 + App"), label: B("Form factor", "产品形态"), accent: false },
    { value: "¥132.47–138.47", label: B("MP BOM target · 1,000 units", "量产 BOM 目标 · 1,000 台"), accent: false },
    { value: "¥699", label: B("Commercial price anchor", "建议零售价锚点"), accent: true },
  ],
  footerNote: B(
    "Whuffl · Independent concept project — research, product strategy, UX/UI, physical product design, hardware feasibility, sourcing logic, pricing model and GTM strategy.",
    "Whuffl · 独立概念项目 — 研究、产品策略、UX/UI、硬件产品设计、硬件可行性、供应链逻辑、定价模型与 GTM 策略。"
  ),
};

// ─── RESEARCH ──────────────────────────────────────────────────────────
export const backgroundOverview = {
  headline: B(
    "Why the walk fails even when it 'happened'.",
    "为什么一次“完成了”的散步仍可能无效。"
  ),
  lead: B(
    "Owners can observe the dog, but cannot reliably decode what the dog is experiencing during a walk.",
    "主人可以看到狗，但无法可靠地解读散步过程中狗的体验。"
  ),
  metrics: [
    { value: "60%", label: B("Urban complaints attributed to 'out of control' dogs.", "城市中“失控”行为相关投诉占比。") },
    { value: "78%", label: B("Owners cite walking as a top burden.", "主人把“遛狗”视为主要负担之一。") },
  ],
  source: B(
    "Referenced project research, n = 97 questionnaires.",
    "项目内研究：n = 97 份问卷。"
  ),
  loop: [
    B("Urban constraints", "城市环境约束"),
    B("Unmet canine needs", "犬只需求未满足"),
    B("Behavioral problems", "行为问题"),
    B("Owner fatigue / avoidance", "主人疲惫 / 回避"),
    B("Worse walking quality", "散步质量下降"),
  ],
};

export const surveyInsights = {
  headline: B(
    "Owners say walking matters — but the value is rarely the walk itself.",
    "主人承认散步重要，但散步本身带来的价值比想象中更复杂。"
  ),
  lead: B(
    "What 97 owners actually get out of a walk.",
    "97 位主人对“散步价值”的真实回答。"
  ),
  benefits: [
    { id: "bond",    label: B("Emotional bond", "情感联结"),   share: 36, accent: true  },
    { id: "control", label: B("Sense of control", "掌控感"),   share: 31, accent: false },
    { id: "health",  label: B("Physical health", "身体健康"),  share: 21, accent: false },
    { id: "social",  label: B("Social identity", "社交身份"),  share: 12, accent: false },
  ],
  source: B("Project survey, n = 97.", "项目内问卷，n = 97。"),
};

export const interviews = {
  headline: B("Three owners, three doubts.", "三位主人，三种犹豫。"),
  lead: B(
    "Interviews surfaced a single underlying gap.",
    "访谈反复指向同一个底层缺口。"
  ),
  items: [
    {
      id: "wang",
      avatar: "/assets/whuffl/page-03-walk-quality/avatar-wang.png",
      name: B("Wang, 34", "Wang，34 岁"),
      role: B("First-time dog owner", "新手养狗人"),
      theme: B("Did I understand what my dog needed?", "我有没有理解它到底需要什么？"),
      quote: B(
        "I take her out twice a day. I still can't tell whether she was actually happy or just tired.",
        "我每天遛它两次，依然分不清它究竟是开心，还是累。"
      ),
    },
    {
      id: "chen",
      avatar: "/assets/whuffl/page-03-walk-quality/avatar-chen.png",
      name: B("Chen, 41", "Chen，41 岁"),
      role: B("Two-dog household", "双犬家庭"),
      theme: B("Was this walk actually valuable?", "这次散步真的有效吗？"),
      quote: B(
        "Distance and duration feel like proxies, not answers.",
        "距离和时长像是在凑指标，而不是答案。"
      ),
    },
    {
      id: "li",
      avatar: "/assets/whuffl/page-03-walk-quality/avatar-li.png",
      name: B("Li, 29", "Li，29 岁"),
      role: B("Apartment + reactive dog", "公寓 + 易激动犬"),
      theme: B("Was my dog satisfied, not merely exercised?", "它是否满足，而不只是被消耗？"),
      quote: B(
        "I want to know if the walk actually reset her, or just spent her energy.",
        "我想知道散步到底是让她平复下来，还是只是耗光了体力。"
      ),
    },
  ],
};

export const walkQuality = {
  headline: B(
    "What is a high-quality walk?",
    "什么是一次高质量的散步？"
  ),
  lead: B(
    "Visible proxies vs. dog-centered interpretation.",
    "可见的代理指标 vs. 以狗为中心的解读。"
  ),
  humanInterpretation: {
    title: B("Human interpretation", "主人的解读"),
    items: [
      B("distance", "距离"),
      B("duration", "时长"),
      B("pace", "节奏"),
      B("elimination", "排泄"),
      B("obedience / smoothness", "服从 / 顺畅度"),
    ],
  },
  dogCentered: {
    title: B("Dog-centered interpretation", "以狗为中心的解读"),
    items: [
      B("Sniffing is active, effortful cognition, not idle time.", "嗅闻是主动、费力的认知行为，不是“闲置时间”。"),
      B("Dogs use olfaction to gather spatial, social and environmental information.", "犬只通过嗅觉收集空间、社交与环境信息。"),
      B("Sniff duration can be behaviorally informative.", "嗅闻持续时间本身具有行为信息量。"),
      B("Physiological markers (e.g. heart rate) matter in specific contexts.", "生理信号（如心率）在特定情境下有意义。"),
      B("Age, health, fatigue, stress, environment, weather and handler affect behavior.", "年龄、健康、疲劳、压力、环境、天气与牵引人都会影响行为。"),
    ],
  },
  designImplication: B(
    "Quality ≠ mileage. Quality = sufficient exploration + autonomy + safe regulation + recovery, interpreted in context.",
    "质量 ≠ 里程。质量 = 充分探索 + 自主权 + 安全调节 + 恢复，且需要在具体情境中解读。"
  ),
  avoid: B(
    "Do not claim Whuffl 'reads emotion'. Use: behavioral-state inference; state interpretation; multimodal signal interpretation; confidence-aware feedback.",
    "不要宣称 Whuffl “读懂情绪”。请使用：行为状态推断、状态解释、多模态信号解读、置信度反馈。"
  ),
  events: [
    { id: 0, event: B("leaving_home",   "出门"),        durationSec: 45,  ownerInterpretation: B("Should we go now?", "要出发吗？"),  dogCenteredInterpretation: B("Anticipation / context-shift", "期待 / 场景切换") },
    { id: 1, event: B("walk_out",       "走向绿地"),    durationSec: 120, ownerInterpretation: B("Are we there yet?", "到了没？"),  dogCenteredInterpretation: B("Route scanning", "路线扫描") },
    { id: 2, event: B("deep_sniff",     "深度嗅闻"),    durationSec: 62,  ownerInterpretation: B("Should we move?", "要走了吗？"),  dogCenteredInterpretation: B("Information gathering / scent comparison", "信息收集 / 气味比对") },
    { id: 3, event: B("encounter_dog",  "遇到陌生犬"), durationSec: 28,  ownerInterpretation: B("Pull or let go?", "拉紧还是放？"),dogCenteredInterpretation: B("Social negotiation", "社交协商") },
    { id: 4, event: B("play_burst",     "冲刺玩球"),    durationSec: 40,  ownerInterpretation: B("Cute, but is it healthy?", "好玩，但合适吗？"), dogCenteredInterpretation: B("Energy release / arousal peak", "能量释放 / 唤醒高峰") },
    { id: 5, event: B("stop_and_smell", "停在树旁"),    durationSec: 90,  ownerInterpretation: B("Again?", "又停？"),  dogCenteredInterpretation: B("Long-form environmental reading", "长时间环境读取") },
    { id: 6, event: B("traffic_noise",  "车流噪音"),    durationSec: 35,  ownerInterpretation: B("Are we safe?", "安全吗？"),  dogCenteredInterpretation: B("Stress / orientation shift", "压力 / 朝向切换") },
    { id: 7, event: B("recovery",       "减速恢复"),    durationSec: 110, ownerInterpretation: B("Tired already?", "累了吗？"),  dogCenteredInterpretation: B("Self-regulation", "自我调节") },
    { id: 8, event: B("home_approach",  "接近家"),      durationSec: 60,  ownerInterpretation: B("Almost there.", "快到了。"),  dogCenteredInterpretation: B("Anticipation of rest", "期待休息") },
    { id: 9, event: B("home_settle",    "进家"),        durationSec: 30,  ownerInterpretation: B("Done.", "结束了。"),  dogCenteredInterpretation: B("Post-event recovery", "事后恢复") },
  ],
};

export const humanPetBond = {
  headline: B(
    "The owner is part of the product, not a bystander.",
    "主人不是旁观者，而是产品的一部分。"
  ),
  items: [
    B("Pets can function as emotional companions.", "宠物可承担情感陪伴功能。"),
    B("Emotional attachment is a meaningful part of pet ownership.", "情感依恋是养宠体验中重要的一环。"),
    B("A pet app should support the human–pet relationship, not reduce the animal to a tracked object.", "宠物 App 应支持人宠关系，而不是把动物降格为被追踪对象。"),
  ],
};

// ─── STRATEGY ──────────────────────────────────────────────────────────
export const currentSolutions = {
  headline: B("Where existing solutions fall short.", "现有方案的不足。"),
  lead: B("Why an existing app, GPS collar, or fitness pattern is not enough.", "为什么 App、GPS 项圈、人类健身 App 都不够。"),
  rows: [
    {
      type: B("GPS / activity products", "GPS / 运动产品"),
      strength: B("Routes, distance, activity", "路线、距离、活动量"),
      gap:     B("Records behavior; does not explain it", "记录行为，不解释行为"),
    },
    {
      type: B("Health devices", "健康设备"),
      strength: B("Heart rate, sleep, anomalies", "心率、睡眠、异常指标"),
      gap:     B("Data is detached from the walking context", "数据脱离散步情境"),
    },
    {
      type: B("Pet apps", "养宠 App"),
      strength: B("Knowledge, logs, post-walk reports", "知识、记录、事后报告"),
      gap:     B("No real-time, low-interruption feedback", "无法实时、低干扰反馈"),
    },
  ],
  opportunity: B(
    "Borrow real-time guidance from fitness products, but redefine achievement around canine exploration, autonomy and state change—not steps or mileage.",
    "借鉴运动产品的实时引导，但把“达标”从步数和里程，改成狗狗的探索、自主与状态变化。"
  ),
};

export const designPrinciples = {
  headline: B("Four principles the product is built on.", "产品的四条设计原则。"),
  items: [
    B("Externalize hidden needs through observable behavior.", "把不可见的需求外化为可观察的行为。"),
    B("Identify + guide, not just measure.", "识别 + 引导，而不只是测量。"),
    B("Real-time + feedback, not after-the-fact reporting.", "实时 + 反馈，而不是事后报告。"),
    B("Human and pet are both product stakeholders.", "人与宠物都是产品的利益相关方。"),
  ],
};

// ─── PERSONA ───────────────────────────────────────────────────────────
export const personas = {
  distribution: [
    { id: "p1", label: B("P1 Reflective Guide",   "P1 反思型引导者"),  share: 48, accent: true  },
    { id: "p2", label: B("P2 Mindful Improver",   "P2 觉察型提升者"),  share: 27, accent: false },
    { id: "p3", label: B("P3 Practical Walker",   "P3 实用型遛狗者"),  share: 25, accent: false },
  ],
  cards: [
    {
      id: "p1",
      avatar: "/assets/whuffl/persona/p1-reflective-guide.png",
      code: "P1",
      share: 48,
      name: B("The Reflective Guide", "反思型引导者"),
      tagline: B("I see it, but I don't understand it.", "看到了，却仍然看不懂。"),
      pain: B("Owners can observe the dog but cannot translate behavior into a confident decision.", "主人可以观察狗，但无法把行为转译为有把握的判断。"),
      need: B("Real-time explanation of what is happening and what to do next.", "对“正在发生什么、接下来该怎么做”的实时解释。"),
      response: B(
        "Behavior decoding · sufficiency judgment · real-time feedback · meaning of sniffing and exploration.",
        "行为转译 · 充分性判断 · 实时反馈 · 嗅闻与探索的含义解读。"
      ),
      validation: B("Primary launch persona.", "首发主要人群。"),
      accent: true,
    },
    {
      id: "p2",
      avatar: "/assets/whuffl/persona/p2-mindful-improver.png",
      code: "P2",
      share: 27,
      name: B("The Mindful Improver", "觉察型提升者"),
      tagline: B("Patterns I cannot catch in one walk.", "一次散步里看不到的长期模式。"),
      pain: B("Owners want to improve, but the data shown today is too shallow to guide change.", "想做得更好，但当前看到的数据太浅，没法指导改变。"),
      need: B("Behavioral pattern insights, individual baselines, and long-term trends.", "行为模式洞察、个人基线与长期趋势。"),
      response: B(
        "Trend report · individual baseline · exportable deeper analysis.",
        "趋势报告 · 个人基线 · 可导出的深度分析。"
      ),
      validation: B("Growth phase; premium plan candidate.", "成长期人群；适合付费 Pro。"),
      accent: false,
    },
    {
      id: "p3",
      avatar: "/assets/whuffl/persona/p3-practical-walker.png",
      code: "P3",
      share: 25,
      name: B("The Practical Walker", "实用型遛狗者"),
      tagline: B("Tell me when the walk is enough.", "告诉我什么时候算够了。"),
      pain: B("Owners are time- and energy-constrained and want a minimum sufficient walk.", "时间精力有限，想要“刚刚好”的散步。"),
      need: B("Minimum effective walk, short high-quality routes, and an end signal.", "最小有效散步、短而高质量的路线、明确的收尾信号。"),
      response: B(
        "Actionable signals: enough / continue / head home.",
        "可执行信号：够了 / 继续 / 回家。"
      ),
      validation: B("Scale phase; simplified value proposition.", "扩张期人群；适合简化卖点。"),
      accent: false,
    },
  ],
};

export const launchSegmentation = {
  headline: B("Three-phase rollout logic.", "三阶段投放逻辑。"),
  lead: B("Not a funnel — a sequenced bet on each persona.", "不是漏斗，而是一轮对每个人群的有序下注。"),
  phases: [
    {
      id: "p1",
      label: B("Phase 1 · Validation", "阶段一 · 验证"),
      target: B("P1 Reflective Guide", "P1 反思型引导者"),
      reason: B(
        "Strongest fit with the core differentiation (behavior translation). Likely to give high-quality correction feedback.",
        "与核心差异化（行为转译）最契合；最可能给出高质量的纠错反馈。"
      ),
      message: B("Understand what the sniff means.", "读懂一次嗅闻意味着什么。"),
      goal: B("Validate interpretation accuracy, trust, and the correction loop.", "验证解读准确度、信任与纠错闭环。"),
      channels: B("Dog behavior education · niche owner communities · creators · early access.", "犬行为内容 · 垂类主人社区 · KOL · 早期试用。"),
    },
    {
      id: "p2",
      label: B("Phase 2 · Growth", "阶段二 · 增长"),
      target: B("P2 Mindful Improver", "P2 觉察型提升者"),
      reason: B(
        "Higher willingness to pay for long-term trends, health warnings and data depth.",
        "对长期趋势、健康预警与数据深度有更高付费意愿。"
      ),
      message: B("See patterns you cannot catch in one walk.", "看见一次散步里看不出的模式。"),
      goal: B("Professional endorsement · long-term trends · Premium / Pro value.", "专业背书 · 长期趋势 · Premium / Pro 价值。"),
      channels: B("Trainers · vet-behavior adjacent channels · premium plan upsell.", "训犬师 · 行为兽医相关渠道 · 高级订阅升级。"),
    },
    {
      id: "p3",
      label: B("Phase 3 · Positioning", "阶段三 · 占位"),
      target: B("P3 Practical Walker", "P3 实用型遛狗者"),
      reason: B(
        "Broader 'save effort / did I walk enough?' use case; needs lower cognitive load.",
        "更广的“省心 / 够不够”场景；需要更低的认知负担。"
      ),
      message: B("Know when the walk is enough.", "知道什么时候算够了。"),
      goal: B("Simplified value proposition · DTC + marketplace reach.", "简化卖点 · DTC + 综合电商触达。"),
      channels: B("DTC landing · marketplace / social commerce · outcome-oriented ads.", "DTC 落地页 · 电商 / 社交电商 · 结果导向投放。"),
    },
  ],
};

// ─── PRODUCT ───────────────────────────────────────────────────────────
export const systemArchitecture = {
  headline: B("Collar + App: who does what.", "项圈 + App：分工。"),
  lead: B(
    "Collar = glanceable real-time signal. App = interpretation, history and learning.",
    "项圈 = 可一瞥的实时信号。App = 解读、历史与学习。"
  ),
  loop: [
    B("DOG", "犬"),
    B("COLLAR", "项圈"),
    B("SIGNAL INTERPRETATION", "信号解读"),
    B("APP", "App"),
    B("OWNER ACTION", "主人行动"),
    B("DOG", "犬"),
  ],
  inputs: [
    B("Movement / posture", "动作 / 姿态"),
    B("Heart-rate-related signal", "心率相关信号"),
    B("GPS / speed / route context", "GPS / 速度 / 路线情境"),
    B("Stop / sniff / exploration pattern", "停顿 / 嗅闻 / 探索模式"),
    B("Individual baseline", "个体基线"),
    B("Environment / context", "环境 / 情境"),
  ],
  output: [
    B("State hypothesis", "状态假设"),
    B("Confidence", "置信度"),
    B("Owner cue", "主人提示"),
    B("Post-walk narrative", "事后叙事"),
  ],
};

export const inferenceBoundaries = {
  headline: B("Three decisions derived from canine research.", "由犬行为研究导出的三条产品决策。"),
  items: [
    {
      title: B("A. Do not optimize only for movement.", "A. 不仅优化“移动”。"),
      body:  B("Sniffing is treated as a meaningful information-gathering event, not 'idle time'.", "嗅闻被视作有信息量的认知事件，而非“闲置时间”。"),
    },
    {
      title: B("B. Use multimodal inference, not single-signal emotion.", "B. 多模态推断，而非单信号情绪标签。"),
      body:  B("Behavior varies with physiology, stress, fatigue, environment and individual differences — output interpretations and confidence, not deterministic emotion.", "行为会随生理、压力、疲劳、环境与个体差异变化；输出解释与置信度，而非确定性情绪。"),
    },
    {
      title: B("C. Preserve the walk as a dog-led activity.", "C. 把散步保留为“以狗为主”的活动。"),
      body:  B("Real-time UI is glanceable and low-interruption; the system guides when to wait, continue, engage or end.", "实时界面要“一瞥可见、低打扰”；系统在合适的时候给出等待、继续、互动、收尾的提示。"),
    },
  ],
  factors: [
    B("health", "健康"),
    B("age", "年龄"),
    B("physical condition", "身体状态"),
    B("fatigue", "疲劳"),
    B("stress / anxiety / frustration", "压力 / 焦虑 / 挫败"),
    B("temperament / individual differences", "气质 / 个体差异"),
    B("weather / environment", "天气 / 环境"),
    B("duration of activity", "活动时长"),
    B("handler relationship", "牵引人关系"),
  ],
};

export const hardwareSizing = {
  headline: B("Size comes from viewing distance, not from style.", "尺寸由视距推导，而不是由造型决定。"),
  lead: B("A short engineering calculation panel.", "一段简短的工程推导。"),
  steps: [
    { label: B("Max leash / viewing distance", "最大牵绳 / 视距"), value: B("1.5 m", "1.5 米") },
    { label: B("Min visual angle (concept assumption)", "最小可视角度（概念假设）"), value: B("0.6°", "0.6°") },
    { label: B("Min resolvable light size", "灯条最小可分辨尺寸"), value: B("≈ 16 mm", "≈ 16 mm") },
    { label: B("Light-guide size decision", "导光板尺寸"), value: B("18 × 4 mm", "18 × 4 mm") },
    { label: B("Module footprint", "模块占地"), value: B("38 × 38 × 11 mm", "38 × 38 × 11 mm") },
    { label: B("Collar width / thickness", "项圈带宽 / 厚"), value: B("20 mm / 2.5 mm", "20 mm / 2.5 mm") },
  ],
  fits: [
    { code: "S", range: "26–32 cm" },
    { code: "M", range: "32–42 cm" },
    { code: "L", range: "42–55 cm" },
  ],
};

export const sensorStack = {
  headline: B("Exploded view, every component is a decision.", "爆炸图，每个部件都是一个决策。"),
  asset: "/assets/whuffl/product/exploded-view/collar-exploded-view.png",
  components: [
    { id: "shell",       label: B("Photochromic thin silicone shell", "光致变色薄硅胶外壳"),  role: B("UV-aware outer skin, soft against the neck.", "感知紫外的外层，与颈部接触柔软。") },
    { id: "lightguide",  label: B("Frosted PC light guide",           "磨砂 PC 导光板"),         role: B("Distributes LED into a glanceable 5-state bar.", "把 LED 扩散为“一瞥可读”的 5 态灯条。") },
    { id: "gps",         label: B("GPS module (AT6558R concept)",     "GPS 模块（AT6558R 概念）"), role: B("Positioning for route + speed + stop detection.", "为路线、速度与停顿检测提供定位。") },
    { id: "lra",         label: B("LRA motor",                         "LRA 触觉马达"),          role: B("Subtle haptic cue, not a shock.", "轻微的触觉提示，不是电击。") },
    { id: "battery",     label: B("Battery",                           "电池"),                  role: B("Multi-day runtime at glanceable polling.", "低频采样下可续航多日。") },
    { id: "esp32",       label: B("ESP32-C3",                          "ESP32-C3 主控"),         role: B("BLE to phone, low-power MCU.", "蓝牙连接手机，低功耗 MCU。") },
    { id: "imu",         label: B("QMI8658 IMU",                       "QMI8658 IMU"),            role: B("Posture + movement + sniff-pattern inference.", "姿态、运动与嗅闻模式推断。") },
    { id: "ppg",         label: B("MAX30102 optical / PPG",            "MAX30102 光学 / PPG"),     role: B("Heart-rate-related signal in specific contexts.", "特定情境下的心率相关信号。") },
    { id: "rgb",         label: B("RGB LED",                           "RGB LED"),                role: B("Drives the 5-state light language.", "驱动 5 态灯语。") },
    { id: "pcb",         label: B("Rigid-flex PCB",                    "硬软结合板"),              role: B("Compact stacking for neck curvature.", "贴合颈部曲率的紧凑叠层。") },
    { id: "casing",      label: B("Aluminum alloy casing",             "铝合金外壳"),             role: B("Heat dissipation + structural rigidity.", "散热 + 结构强度。") },
    { id: "charging",    label: B("Magnetic charging",                 "磁吸充电"),               role: B("No exposed port, water-resistant seal.", "无外露接口，防水密封。") },
    { id: "strap",       label: B("Silicone collar strap",             "硅胶项圈带"),             role: B("Skin-friendly, easy to clean.", "亲肤、易清洁。") },
    { id: "buckle",      label: B("Metal buckle",                      "金属扣"),                 role: B("Quick release with safety load limit.", "带安全限力的快拆扣。") },
  ],
};

// ─── EXPERIENCE ────────────────────────────────────────────────────────
export const experienceStoryboard = [
  {
    id: "S1",
    image: "/assets/whuffl/page-07-experience/S1.png",
    title: B("Capturing a pet photo to generate a unique digital emoji.", "拍摄宠物照片，生成专属数字形象。"),
  },
  {
    id: "S2",
    image: "/assets/whuffl/page-07-experience/S2.png",
    title: B("Establishing a seamless Bluetooth/hardware pairing experience.", "快速完成蓝牙与硬件配对连接。"),
  },
  {
    id: "S3",
    image: "/assets/whuffl/page-07-experience/S3.png",
    title: B("Receiving a real-time haptic & visual alert for pet intent translation.", "通过震动与视觉提醒，实时感知宠物意图。"),
  },
  {
    id: "S4",
    image: "/assets/whuffl/page-07-experience/S4.png",
    title: B("Route planning and completing the pre-walk preparation checklist.", "规划遛狗路线，并完成出门前准备清单。"),
  },
  {
    id: "S5",
    image: "/assets/whuffl/page-07-experience/S5.png",
    title: B("Entering a screen-free mode to promote focused, high-quality companionship.", "进入无屏陪伴模式，专注高质量互动。"),
  },
  {
    id: "S6",
    image: "/assets/whuffl/page-07-experience/S6.png",
    title: B("Hardware indicator shifts color based on active behavior changes.", "硬件指示灯会随行为状态变化切换颜色。"),
  },
  {
    id: "S7",
    image: "/assets/whuffl/page-07-experience/S7.png",
    title: B("Monitoring real-time physiological and behavioral data streams.", "持续监测宠物的生理与行为数据。"),
  },
  {
    id: "S8",
    image: "/assets/whuffl/page-07-experience/S8.png",
    title: B("Visualizing spatial scent data through an immersive AR overlay.", "通过 AR 叠加视图可视化环境气味信息。"),
  },
  {
    id: "S9",
    image: "/assets/whuffl/page-07-experience/S9.png",
    title: B("Completing the micro-habit gamification loops for daily pet exercise.", "以游戏化微习惯机制完成每日运动任务。"),
  },
  {
    id: "S10",
    image: "/assets/whuffl/page-07-experience/S10.png",
    title: B("Reviewing the compiled data transformed into a narrative daily digest.", "查看整理后的叙事化每日总结报告。"),
  },
];

export const journeyMap = {
  asset: "/assets/whuffl/experience/journey/user-journey-map-full.png",
  openLabel: B("View full journey", "放大查看"),
};

// ─── BUSINESS ──────────────────────────────────────────────────────────
export const sourcing = {
  headline: B("Sourcing: 4 steps, no spreadsheet required.", "供应链：4 步，不依赖 Excel 截图。"),
  steps: [
    B("Search 1688 by exact module and process keywords.", "在 1688 上以精确的模块 / 工艺关键词搜索。"),
    B("Filter suppliers by spec, MOQ, process and sample availability.", "按规格、起订量、工艺、样品供应筛选供应商。"),
    B("Contact suppliers for pilot (50 units) and MP (1,000 units) quotes.", "向供应商索取 50 台试产与 1,000 台量产报价。"),
    B("Compare quotes and substitute modules to build the BOM range.", "通过比较报价与替换模块，构建 BOM 区间。"),
  ],
};

export const bom = {
  headline: B("BOM / scaling economics.", "BOM / 规模经济。"),
  lead: B("Pilot 50 vs Mass Production 1,000 — only the total gets the accent.", "试产 50 台 vs 量产 1,000 台 — 只有总数用强调色。"),
  groups: [
    { id: "casing",  label: B("Casing / strap / buckle", "外壳 / 项圈带 / 扣件"),   pilot: 78.0,  mp: 32.4 },
    { id: "pcb",     label: B("PCB / passives",            "PCB / 阻容"),              pilot: 36.5,  mp: 18.6 },
    { id: "sensors", label: B("IMU / PPG / GPS",           "IMU / PPG / GPS"),          pilot: 41.8,  mp: 28.1 },
    { id: "mcu",     label: B("ESP32 + LRA",               "ESP32 + LRA"),              pilot: 22.4,  mp: 16.5 },
    { id: "battery", label: B("Battery + charging",        "电池 + 充电"),              pilot: 19.8,  mp: 14.2 },
    { id: "light",   label: B("Light guide + LED",         "导光板 + LED"),             pilot: 14.6,  mp: 11.0 },
    { id: "asm",     label: B("Assembly + QA",             "组装 + 质检"),              pilot: 13.16, mp: 11.67 },
  ],
  totals: {
    pilot: { low: 226.27, high: 245.27 },
    mp:    { low: 132.47, high: 138.47 },
  },
  unit: B("CNY / unit", "元 / 台"),
};

export const viabilityBomLegend = [
  { key: "pilot", label: B("Pilot Run (50 units)", "试产 Pilot Run（50 台）"), color: "#89A321" },
  { key: "mp", label: B("MP (1000 units)", "量产 MP（1000 台）"), color: "#B8C69E" },
];

export const fullyLoadedCost = {
  headline: B("Fully loaded cost stack.", "全负荷成本堆叠。"),
  lead: B("Same selected scenario drives the gross margin.", "同一选定场景同时驱动毛利率。"),
  categories: [
    { id: "bom",        label: B("BOM",                       "BOM"),              value: 135.47 },
    { id: "tooling",    label: B("Tooling allocation",        "模具分摊"),          value: 22.0  },
    { id: "cert",       label: B("Certification allocation",  "认证分摊"),          value: 12.0  },
    { id: "logistics",  label: B("Logistics / warehousing",   "物流 / 仓储"),       value: 18.0  },
    { id: "warranty",   label: B("After-sales / warranty",    "售后 / 保修"),       value: 14.0  },
    { id: "cs",         label: B("Customer service",          "客服"),              value: 9.0   },
    { id: "dtc",        label: B("DTC payment / fulfillment", "DTC 支付 / 履约"),   value: 16.0  },
    { id: "channel",    label: B("Tmall / JD channel",        "天猫 / 京东 渠道"),  value: 22.0  },
  ],
  unit: B("CNY / unit", "元 / 台"),
  note: B("Indicative composition; margin computed from the same selected cost scenario.", "示意性构成；毛利率以同一选定成本场景计算。"),
};

export const fullyLoadedPieData = [
  { key: "bom", label: B("BOM", "BOM"), priceRange: "¥132.47–138.47", percent: 28.95, color: "#4A534B" },
  { key: "tooling", label: B("Tooling Amortization", "模具分摊"), priceRange: "¥30–80", percent: 11.75, color: "#89A321" },
  { key: "compliance", label: B("Compliance Amortization", "认证分摊"), priceRange: "¥80–150", percent: 24.57, color: "#B8C69E" },
  { key: "logistics", label: B("Logistics / Warehousing", "物流 / 仓储"), priceRange: "¥15–25", percent: 4.27, color: "#ECEEE6" },
  { key: "warranty", label: B("After-sales / Warranty", "售后 / 保修"), priceRange: "¥15–25", percent: 4.27, color: "#D1FF00" },
  { key: "support", label: B("Customer Service", "客服"), priceRange: "¥5–10", percent: 1.60, color: "#6B7851" },
  { key: "dtc", label: B("DTC Payment / Fulfillment", "DTC 支付 / 履约"), priceRange: "¥30–50", percent: 8.55, color: "#A3B88A" },
  { key: "channel", label: B("Tmall / JD Channel", "天猫 / 京东 渠道"), priceRange: "¥60–90", percent: 16.03, color: "#BFC9B1" },
];

export const fullyLoadedPieFootnote = B(
  "Percentages converted from MP (1000 units) median values",
  "MP(1000 台) × 各项中位数换算占比"
);

export const psmSeries = {
  tooCheap: [[0,100],[60,100],[110,98],[160,90],[220,72],[300,45],[430,13],[500,9],[700,0],[4000,0]],
  cheap: [[0,100],[250,100],[300,99],[400,93],[500,80],[600,64],[700,48],[800,33],[900,22],[1000,13],[1100,6],[1200,2],[1300,0],[4000,0]],
  expensive: [[0,0],[600,0],[700,1],[800,5],[900,11],[1000,21],[1100,33],[1200,48],[1300,62],[1400,72],[1600,80],[1850,86],[2050,93],[2200,98],[2300,100],[4000,100]],
  tooExpensive: [[0,0],[850,0],[1000,1],[1150,4],[1350,13],[1500,24],[1700,38],[1900,51],[2100,63],[2300,75],[2500,83],[2700,88],[2900,93],[3100,98],[3300,100],[4000,100]],
};

export const psmColors = {
  tooCheap: "#D1FF00",
  cheap: "#76CF27",
  expensive: "#58771D",
  tooExpensive: "#3B4D00",
};

export const offerArchitectureSegments = [
  { id: "bom", label: B("BOM Cost", "BOM 成本"), icon: "icon-BOM.png", color: "#06220F", degrees: 24 },
  { id: "tooling", label: B("R&D / Tooling", "研发 / 模具分摊"), icon: "icon-NRE.png", color: "#203923", degrees: 18 },
  { id: "compliance", label: B("Compliance / Certification", "合规 / 认证"), icon: "icon-compliance.png", color: "#52683D", degrees: 16 },
  { id: "logistics", label: B("Freight & Warranty", "物流与保修"), icon: "icon-freight.png", color: "#647A49", degrees: 12 },
  { id: "channel", label: B("Channel Margin", "渠道分成"), icon: "icon-chanelmargin.png", color: "#879C67", degrees: 10 },
  { id: "profit", label: B("Profit Margin", "利润率"), icon: "icon-profitmargin.png", color: "#A5C400", degrees: 100, isHero: true },
];

export const psmSummary = {
  disclosure: B("Pricing feasibility model", "定价可行性建模"),
  hardware: {
    opp: 701,
    rprLow: 645,
    rprHigh: 1136,
    ipp: 952,
    anchorMsrp: 699,
    recommendation: B("¥699–799", "¥699–799"),
  },
  subscription: {
    opp: 37,
    rprLow: 26,
    rprHigh: 56,
    ipp: 42,
    mainPlan: 39,
    annualAnchor: 399,
  },
  persona: [
    { id: "p1", label: B("Reflective / understanding", "反思 / 求理解"),  opp: 570, rprLow: 522, rprHigh: 932 },
    { id: "p2", label: B("Mindful / observation",      "觉察 / 求观察"),  opp: 849, rprLow: 766, rprHigh: 1311 },
    { id: "p3", label: B("Practical / efficiency",     "实用 / 求效率"),  opp: 582, rprLow: 543, rprHigh: 969 },
  ],
};

export const psmPurchaseIntent = {
  headline: B("Purchase-intent scenarios.", "购买意向场景。"),
  lead: B("Scenario preference within the pricing model — not predicted real-market conversion.", "定价模型内的“场景偏好”，不是预测的真实市场转化。"),
  scenarios: [
    { id: "B", hardware: 599, sub: 29, top2: 67, label: B("Early-adopter bundle", "尝鲜组合") },
    { id: "C", hardware: 699, sub: 39, top2: 52, label: B("Recommended",         "推荐组合"), accent: true },
    { id: "D", hardware: 899, sub: 49, top2: 32, label: B("Pro bundle",          "Pro 组合") },
  ],
};

export const viabilityCopy = {
  monadic: {
    title: B("Monadic Concept Testing", "单项概念测试"),
    subtitle: B(
      "A ¥699 buyout strategy should outperform an equivalent-priced hardware + subscription model in conversion rates.",
      "¥699 买断方案的转化率应优于同价位的硬件 + 订阅模式。"
    ),
    callout: B(
      "Subscription fatigue = Top 2 (46%) & 3 barriers (32%)",
      "订阅疲劳 = Top 2（46%）及第 3 项障碍（32%）"
    ),
  },
  gtm: {
    title: B("GTM Roadmap", "GTM 路线图"),
    steps: [
      {
        index: "/01",
        icon: "/assets/whuffl/page-08-viability/GTM-icon-01.png",
        title: B("Validation", "验证"),
        body: B(
          "Focus on serving P1+P2 during the validation phase, and open up to P3 only after polishing the product to a frictionless experience.",
          "验证期聚焦 P1 + P2；产品体验打磨成熟后，再逐步开放至 P3。"
        ),
      },
      {
        index: "/02",
        icon: "/assets/whuffl/page-08-viability/GTM-icon-02.png",
        title: B("Growth", "增长"),
        body: B(
          "P2 is the professional (B-End) gateway. One recommendation from P2 can bring in multiple P1s/P3s.",
          "P2 是专业端入口；一次 P2 推荐，可以进一步带来多个 P1 / P3 用户。"
        ),
      },
      {
        index: "/03",
        icon: "/assets/whuffl/page-08-viability/GTM-icon-03.png",
        title: B("Positioning", "定位"),
        body: B(
          "P3 requires a different product language. P2 doesn't look at behavioral science; they look for ‘saves effort’ and ‘good enough.’",
          "P3 需要不同的产品语言；P2 更关注“省力”和“够用”，而非行为科学。"
        ),
      },
    ],
  },
  personas: [
    {
      id: "p1",
      title: B("P1 The Reflective Guide", "P1 反思型引导者"),
      description: B(
        "Main force throughout, source of core paying users and word-of-mouth. Most important in the validation phase, remains the pillar of brand loyalty in the positioning phase.",
        "核心付费与口碑用户，验证期最关键，并持续构成品牌忠诚的核心人群。"
      ),
      percentage: "48%",
    },
    {
      id: "p2",
      title: B("P2 The Mindful Improver", "P2 觉察型提升者"),
      description: B(
        "Early quality gatekeepers, source of professional endorsement. Proportion decreases as the market expands, but absolute numbers continue to grow.",
        "早期品质把关者与专业背书来源；市场扩大后占比下降，但人数持续增长。"
      ),
      percentage: "27%",
    },
    {
      id: "p3",
      title: B("P3 The Practical Walker", "P3 实用型遛狗者"),
      description: B(
        "Main force for incremental growth in later stages, surpassing P2 for the first time to become the largest group in the positioning phase.",
        "后期增量增长主力，并在定位阶段首次超过 P2，成为最大用户群。"
      ),
      percentage: "25%",
    },
  ],
  closing: B(
    "Whuffl translates a fuzzy emotional goal—“understand my dog better”—into a product system grounded in interaction logic, physical constraints, and a viable path to market.",
    "Whuffl 把一个模糊的情感目标——“更懂我的狗”——转译为一套具备交互逻辑、物理约束与可落地商业路径的产品系统。"
  ),
};

export const purchaseDrivers = {
  headline: B("Top drivers.", "主要购买驱动力。"),
  items: [
    { id: "meaning",  label: B("Not just GPS — can judge walk quality", "不是“只测 GPS” —— 能判断散步质量"), value: 53 },
    { id: "advice",   label: B("Continuous data + advice supports subscription", "持续数据 + 建议支撑订阅"),         value: 51 },
    { id: "price",    label: B("Displayed price within acceptable range",        "定价在可接受区间"),                    value: 42 },
    { id: "diff",     label: B("Differentiated from other smart pet devices",     "与其他智能宠物产品差异化"),           value: 34 },
    { id: "phone",    label: B("Real-time collar light means less phone checking", "实时灯语意味着少看手机"),            value: 33 },
  ],
};

export const purchaseBarriers = {
  headline: B("Top barriers.", "主要购买阻力。"),
  items: [
    { id: "accuracy", label: B("Concern about interpretation / health / walk-sufficiency accuracy", "担心解读 / 健康 / 充分性准确度"), value: 50 },
    { id: "cost",     label: B("Long-term hardware + subscription cost",      "长期硬件 + 订阅成本"),                  value: 46 },
    { id: "subfat",   label: B("Subscription fatigue",                       "订阅疲劳"),                              value: 32 },
    { id: "brand",    label: B("New-brand trust",                           "新品牌信任"),                            value: 26 },
    { id: "hw",       label: B("Battery / waterproof / durability / after-sales", "续航 / 防水 / 耐用 / 售后"),      value: 23 },
  ],
  consequences: [
    { from: "accuracy", text: B("Confidence indicator + correction flow + traceable timeline.", "置信度提示 + 纠错流程 + 可回溯时间线。") },
    { from: "subfat",   text: B("Permanent basic features + annual plan + trial.", "永久保留基础功能 + 年付方案 + 试用。") },
    { from: "brand",    text: B("Transparent hardware / spec and warranty communication.", "硬件规格与保修透明化沟通。") },
  ],
};

export const pricingModel = {
  headline: B("Offer architecture.", "产品与价格架构。"),
  items: [
    { id: "base",    label: B("Base hardware",          "基础硬件"),        value: "¥699–799" },
    { id: "early",   label: B("Early adopter",          "尝鲜组合"),        value: "¥599 + ¥29/月" },
    { id: "prem",    label: B("Premium",                "高级版"),          value: "¥39/月" },
    { id: "prem_a",  label: B("Premium annual",         "高级版年付"),      value: "¥399/年" },
    { id: "pro",     label: B("Health / Data Pro",      "健康 / 数据 Pro"), value: "¥49/月 或 ¥499/年" },
    { id: "bundle",  label: B("Pro bundle",             "Pro 套装"),        value: "¥899–999" },
    { id: "trial",   label: B("14–30 day Premium trial","14–30 天 Premium 试用"), value: "Free" },
  ],
  principle: B("Basic device functions stay usable without an active subscription.", "基础设备功能在无活跃订阅时仍可使用。"),
};

export const gtmPlan = {
  headline: B("GTM roadmap.", "GTM 路线图。"),
  phases: [
    { id: "seed",    label: B("Seed / Validation", "种子 / 验证"),   target: B("P1 Reflective Guide", "P1 反思型引导者"), message: B("Understand what the sniff means.", "读懂一次嗅闻意味着什么。"), goal: B("Validate interpretation accuracy, trust, and the correction loop.", "验证解读准确度、信任与纠错闭环。"), channels: B("Dog behavior education · niche owner communities · creators · early access.", "犬行为内容 · 垂类主人社区 · KOL · 早期试用。") },
    { id: "growth",  label: B("Growth",            "增长"),          target: B("P2 Mindful Improver", "P2 觉察型提升者"), message: B("See patterns you cannot catch in one walk.", "看见一次散步里看不出的模式。"), goal: B("Professional endorsement · long-term trends · Premium / Pro value.", "专业背书 · 长期趋势 · Premium / Pro 价值。"), channels: B("Trainers · vet-behavior adjacent channels · premium plan upsell.", "训犬师 · 行为兽医相关渠道 · 高级订阅升级。") },
    { id: "scale",   label: B("Scale / Positioning","扩张 / 占位"),  target: B("P3 Practical Walker", "P3 实用型遛狗者"), message: B("Know when the walk is enough.",         "知道什么时候算够了。"),       goal: B("Simplified value proposition · DTC + marketplace reach.", "简化卖点 · DTC + 综合电商触达。"), channels: B("DTC landing · marketplace / social commerce · outcome-oriented ads.", "DTC 落地页 · 电商 / 社交电商 · 结果导向投放。") },
  ],
  principle: B("All GTM tactics are strategic hypotheses, not claimed campaign results.", "所有 GTM 动作都是“战略假设”，不是“已达成结果”。"),
};

export const outcome = {
  headline: B("Outcome.", "结果。"),
  sub: B("Not an aspirational quote — evidence.", "不是愿景金句，是证据。"),
  pillars: [
    {
      title: B("Desirability", "需求"),
      items: [
        B("97 questionnaire responses + interviews identified interpretation / sufficiency needs.", "97 份问卷 + 访谈识别出“解读 / 充分性”需求。"),
        B("Persona model defined three distinct value propositions.",         "画像模型定义出三套差异化的价值主张。"),
      ],
    },
    {
      title: B("Feasibility", "可行"),
      items: [
        B("Hardware size derived from viewing / structure assumptions.",        "硬件尺寸由视距 / 结构假设推导。"),
        B("Sensor / component architecture defined.",                            "传感器 / 组件架构已定义。"),
        B("Component supplier sourcing method completed.",                       "完成组件供应商寻源方法。"),
        B("Pilot and 1,000-unit BOM estimated.",                                 "试产与 1,000 台 BOM 已估算。"),
      ],
    },
    {
      title: B("Viability", "可商业"),
      items: [
        B("Pricing feasibility model established OPP / RPR bands.",              "定价可行性模型已建立 OPP / RPR 区间。"),
        B("¥699 positioned inside the acceptable hardware range.",              "¥699 位于可接受硬件价格区间。"),
        B("Pricing tiers + subscription logic defined.",                         "价格分层 + 订阅逻辑已定义。"),
        B("Gross-margin model established from fully loaded cost.",             "基于全负荷成本的毛利率模型已建立。"),
      ],
    },
  ],
  finalStatement: B(
    "Whuffl turned a vague emotional goal — 'understand my dog better' — into a product system with interaction logic, physical constraints, cost structure and a credible path to market.",
    "Whuffl 把一个模糊的情感目标——“更懂我的狗”——转译为一套具备交互逻辑、物理约束、成本结构与可落地商业路径的产品系统。"
  ),
};
