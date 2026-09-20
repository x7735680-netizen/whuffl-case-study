const lightAsset = (state) => `/assets/whuffl/page-05-build/product/light-states/collar-state-${state}.png`;
const iconAsset = (icon) => `/assets/whuffl/page-05-build/product/light-states/icon-${icon}.png`;

const pair = (en, zh) => ({ en, zh });

export const lightFeedbackStates = [
  {
    key: "green",
    color: "#7ACB00",
    productImage: lightAsset("green"),
    stateName: pair("Green", "绿色"),
    action: pair("Action: Keep walking, maintain pace", "Action: 保持节奏，继续行走"),
    desc: pair("Continuous solid light, no flashing", "稳定常亮，无闪烁"),
    tags: { en: ["Intuitive mapping", "High daylight visibility"], zh: ["直觉映射", "高日光可见性"] },
    quote: pair("Seriously exploring the street.", "它在告诉主人：我正在认真探索，继续走吧。"),
    data: [
      { icon: iconAsset("heart"), value: "80–120", unit: "bpm" },
      { icon: iconAsset("acceleration"), value: "2–8", unit: "m/s²" },
      { icon: iconAsset("speed"), value: "2–5", unit: "km/h" },
      { icon: iconAsset("head"), value: pair("forward", "前倾"), unit: pair("lean 5–20°", "5–20°") },
    ],
  },
  {
    key: "pink",
    color: "#B45B74",
    productImage: lightAsset("pink"),
    stateName: pair("Pink", "粉色"),
    action: pair("Action: Can interact / speed up / play", "Action: 可以互动 / 提速 / 玩耍"),
    desc: pair("Continuous solid light, no flashing", "稳定常亮，无闪烁"),
    tags: { en: ["The best interaction window"], zh: ["最佳互动窗口"] },
    quote: pair("Full of energy, the happiest moment.", "它在告诉主人：我现在状态很好，可以互动或玩一会。"),
    data: [
      { icon: iconAsset("heart"), value: "140–200", unit: "bpm" },
      { icon: iconAsset("acceleration"), value: "10–25", unit: "m/s²" },
      { icon: iconAsset("speed"), value: "5–15+", unit: "km/h" },
      { icon: iconAsset("head"), value: pair("Large swings", "大幅摆动"), unit: pair("angular velocity >60°/s", "角速度 >60°/s") },
    ],
  },
  {
    key: "yellow",
    color: "#8D8724",
    productImage: lightAsset("yellow"),
    stateName: pair("Yellow", "黄色"),
    action: pair("Action: Give it time, do not pull the leash", "Action: 给它一点时间，不要拽牵引绳"),
    desc: pair("Slow breathing, fades in and out every 2s", "慢呼吸式闪烁，每 2 秒明暗一次"),
    tags: { en: ["Intuitive mapping", "High daylight visibility"], zh: ["直觉映射", "高日光可见性"] },
    quote: pair("Seriously exploring the street.", "它在告诉主人：我还在读气味，再给我一点时间。"),
    data: [
      { icon: iconAsset("heart"), value: "70–100", unit: "bpm" },
      { icon: iconAsset("acceleration"), value: "0.5–3", unit: "m/s²" },
      { icon: iconAsset("speed"), value: "<0.5", unit: "km/h" },
      { icon: iconAsset("head"), value: pair("down 30–60°", "低头 30–60°"), unit: pair("sniffing mode", "持续嗅闻") },
    ],
  },
  {
    key: "orange",
    color: "#8A6429",
    productImage: lightAsset("orange"),
    stateName: pair("Orange", "橙色"),
    action: pair("Action: Approach it, check surroundings", "Action: 靠近它，留意周围环境"),
    desc: pair("Fast, irregular flashing, every 0.3–0.5s", "快速不规则闪烁，每 0.3–0.5 秒"),
    tags: { en: ["Stress reactions", "Proactive intervention"], zh: ["压力反应", "主动干预"] },
    quote: pair("It needs you to come over now.", "它在告诉主人：我需要你来关注我和周围情况。"),
    data: [
      { icon: iconAsset("heart"), value: "120–180", unit: "bpm" },
      { icon: iconAsset("acceleration"), value: "1–5", unit: "m/s²" },
      { icon: iconAsset("speed"), value: "<1", unit: "km/h" },
      { icon: iconAsset("head"), value: pair("head up, stiff", "抬头、僵直"), unit: pair("lasting >3s", "持续 >3s") },
    ],
  },
  {
    key: "white",
    color: "#6E746E",
    productImage: lightAsset("white"),
    stateName: pair("White", "白色"),
    action: pair("Action: Energy / walk quality is gradually dropping; consider wrapping up.", "Action: 能量 / 质量在下降；考虑收尾散步"),
    desc: pair("approx. 20–30% of normal brightness", "约 20–30% 常规亮度"),
    tags: { en: ["Energy depletion", "Going home now"], zh: ["能量消耗", "准备回家"] },
    quote: pair("Energy or walk quality is gradually dropping.", "它在告诉主人：我有点累了，可以准备回家了。"),
    data: [
      { icon: iconAsset("heart"), value: "65–95", unit: "bpm" },
      { icon: iconAsset("acceleration"), value: "0–3", unit: "m/s²" },
      { icon: iconAsset("speed"), value: "0–2", unit: "km/h" },
      { icon: iconAsset("head"), value: pair("low recovery", "低恢复状态"), unit: "" },
    ],
  },
];

export const explodedViewLabels = [
  // Coordinates are percentages of the native 1133 × 1157 image canvas.
  // Each point is the outer endpoint of the baked-in leader line.
  { key: "main-chip", side: "left", xPercent: 14.12, yPercent: 38.72, title: pair("Main control chip", "主控芯片"), sub: "ESP32-C3" },
  { key: "imu", side: "left", xPercent: 14.92, yPercent: 47.19, title: pair("6-axis IMU sensor", "六轴 IMU 传感器"), sub: "QMI8658" },
  { key: "rgb-led", side: "left", xPercent: 13.77, yPercent: 55.23, title: pair("RGB LED module", "RGB LED 模组"), sub: "" },
  { key: "ppg", side: "left", xPercent: 13.42, yPercent: 60.76, title: pair("PPG optical chip", "PPG 光学芯片"), sub: "MAX3010285" },
  { key: "rigid-flex-pcb", side: "left", xPercent: 10.86, yPercent: 68.71, title: pair("Rigid-flex PCB", "刚挠结合 PCB"), sub: pair("PCB+FPC 2-Layer Board", "PCB+FPC 双层板") },
  { key: "casing", side: "left", xPercent: 19.86, yPercent: 77.18, title: pair("Aluminum alloy casing", "铝合金外壳"), sub: pair("CNC + Anodized, Optical window (IP67-rated Encapsulation)", "CNC + 阳极氧化，带光学窗口（IP67 级封装）") },
  { key: "buckle", side: "left", xPercent: 9.62, yPercent: 87.38, title: pair("Metal buckle", "金属扣件"), sub: pair("Hypoallergenic & Stainless Steel", "低敏不锈钢") },
  { key: "shell", side: "right", xPercent: 60.28, yPercent: 9.33, title: pair("Photochromic thin silicone shell", "光致变色薄硅胶外壳"), sub: "" },
  { key: "light-guide", side: "right", xPercent: 60.28, yPercent: 15.47, title: pair("Frosted PC light guide plate", "磨砂 PC 导光板"), sub: "" },
  { key: "gps", side: "right", xPercent: 60.28, yPercent: 21.61, title: pair("GPS module version", "GPS 模组版本"), sub: "AT6558R" },
  { key: "motor", side: "right", xPercent: 60.28, yPercent: 30.08, title: pair("LRA Motor", "LRA 线性振动马达"), sub: "" },
  { key: "battery", side: "right", xPercent: 60.28, yPercent: 36.13, title: pair("Battery", "电池"), sub: "DLG 502535 600mAh" },
  { key: "charging", side: "right", xPercent: 59.93, yPercent: 56.61, title: pair("Magnetic charging", "磁吸充电"), sub: pair("Pogo Pin Magnetic Interface Waterproof Version", "Pogo Pin 磁吸接口，防水版本") },
  { key: "strap", side: "right", xPercent: 36.63, yPercent: 72.86, title: pair("Silicone collar strap", "硅胶项圈带"), sub: pair("LSR Overmolding", "LSR 包胶成型") },
];
