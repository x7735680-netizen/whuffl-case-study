import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import CaseStudyNav from "../components/CaseStudyNav.jsx";
import SectionIntro from "../components/SectionIntro.jsx";
import RevealCard from "../components/RevealCard.jsx";
import RevealTextGroup from "../components/RevealTextGroup.jsx";
import PersonaCard from "../components/PersonaCard.jsx";
import LightStateSelector from "../components/LightStateSelector.jsx";
import BuildHardware from "../components/BuildHardware.jsx";
import BuildAppCarousel from "../components/BuildAppCarousel.jsx";
import JourneyMapViewer from "../components/JourneyMapViewer.jsx";

import BOMComparison, { BOMTotals } from "../components/charts/BOMComparison.jsx";
import FullyLoadedCost from "../components/charts/FullyLoadedCost.jsx";
import HardwarePsmCurve from "../components/charts/HardwarePsmCurve.jsx";
import PricingFeasibilityCard from "../components/charts/PricingFeasibilityCard.jsx";
import OfferArchitecture from "../components/OfferArchitecture.jsx";
import ViabilitySection from "../components/ViabilitySection.jsx";

import { langPair } from "../lib/lang.js";
import useScrollChapter from "../lib/useScrollChapter.js";
import useSectionImagePreload from "../lib/useSectionImagePreload.js";

import {
  project,
  surveyInsights,
  interviews,
  walkQuality,
  currentSolutions,
  designPrinciples,
  personas,
  experienceStoryboard,
  journeyMap,
  journeyPrinciples,
  sourcing,
  bom,
  fullyLoadedCost,
  psmSummary,
} from "../content/whuffl.js";


const SECTION_IDS = [
  "hero",
  "why-context",
  "walk-quality",
  "ch-decide",
  "ch-build",
  "ch-experience",
  "ch-viability",
];

const CONTEXT_CARDS = [
  {
    id: "01",
    title: B("Dog walking is becoming a high-burden urban task.", "遛狗正在从日常照护，变成高负担的城市任务"),
  },
  {
    id: "02",
    title: B("Time is fragmented, so owners can finish a walk without knowing whether it was good.", "时间被切碎，主人只能“完成遛狗”，却很难判断是否“遛得好”"),
  },
  {
    id: "03",
    title: B("Dogs are emotional companions, yet owners lack tools to understand their state.", "对年轻人来说，狗已经是情感伙伴，但缺少理解狗狗状态的工具"),
  },
];

const PERSPECTIVE_ROWS = [
  {
    key: "distance",
    keyword: B("Distance", "距离"),
    human: B("How far we walked = did we meet the exercise target", "走了多远 = 运动量是否达标"),
    dog: B("How much was explored = how much environmental information was gained", "探索了多少 = 获得了多少环境信息"),
  },
  {
    key: "duration",
    keyword: B("Duration", "时长"),
    human: B("How long we walked = was today's walk enough", "走了多久 = 今天是否“遛够”"),
    dog: B("How long we stopped = was there time to finish sniffing", "停留了多久 = 有没有时间完成嗅闻"),
  },
  {
    key: "rhythm",
    keyword: B("Rhythm", "节奏"),
    human: B("Continuous, smooth, with fewer stops = an efficient walk", "连续、顺畅、少停顿 = 高效好遛"),
    dog: B("Walk — stop — sniff — walk again = a rhythm of information gathering", "走—停—嗅—再走 = 信息采集的节奏"),
  },
  {
    key: "elimination",
    keyword: B("Elimination", "排泄"),
    human: B("Finishing toileting = the basic task is done", "完成大小便 = 基本任务完成"),
    dog: B("Elimination / marking = physiology and part of social life", "排泄/标记 = 生理需求 + 社交的一部分"),
  },
];

const AUTO_INTERVAL = 1800;

const DECIDE_LOOP = [
  {
    id: "01",
    label: B("Dog behavior", "狗狗行为"),
    detail: B("Movement · posture · sniffing", "行为 · 姿态 · 嗅闻 · 停留"),
    medium: false,
  },
  {
    id: "02",
    label: B("Collar sensing", "项圈感知"),
    detail: B("Motion · location · speed · signals", "动作 · 位置 · 速度 · 生理信号"),
    medium: true,
  },
  {
    id: "03",
    label: B("State inference", "状态推断"),
    detail: B("Individual baseline × context", "个体基线 × 情境"),
    medium: false,
  },
  {
    id: "04",
    label: B("App interpretation", "App 解读"),
    detail: B("What happened · why", "发生了什么 · 为什么"),
    medium: true,
  },
  {
    id: "05",
    label: B("Owner action", "主人行动"),
    detail: B("Wait · continue · interact · home", "等待 · 继续 · 互动 · 回家"),
    medium: false,
  },
];

const PRODUCT_DECISIONS = [
  {
    id: "01",
    title: B("Sniffing is not inefficiency", "嗅闻不是“低效”"),
    detail: B("Treat stopping as information gathering.", "把停留视为信息采集。"),
  },
  {
    id: "02",
    title: B("Infer state, not emotion labels", "推断状态，而非情绪标签"),
    detail: B("Show interpretation and confidence.", "输出解释与置信度。"),
  },
  {
    id: "03",
    title: B("Keep screens out of the walk", "不让屏幕接管散步"),
    detail: B("Prompt only the next action.", "只提示下一步行动。"),
  },
];

const CONCEPT_INSIGHTS = [
  B("Pets are emotional companions, not care objects", "宠物是情感伙伴，而非被照料的对象"),
  B("Walking is the most frequent human–pet bonding moment — and the first to be cut short", "散步是最频繁的人宠连接，也是最先被压缩的时间"),
  B("Users know sniffing matters — they just can't decode it", "主人知道嗅闻重要，却读不懂它"),
];

const ITERATION_HOTSPOTS = [
  { id: "distance", x: "48%", y: "31.5%", size: 72, label: B("Hard to perceive state changes from a distance", "远距离难以感知状态变化") },
  { id: "fit", x: "65%", y: "41.5%", size: 68, label: B("The on-body effect feels incomplete", "上身效果不够完整") },
  { id: "display", x: "82.5%", y: "50%", size: 64, label: B("The display sits too close to the casing", "显示区与外壳间距过窄") },
  { id: "silhouette", x: "34.3%", y: "65%", size: 76, label: B("Overly rounded, weakening the bow-tie silhouette", "过度圆润，弱化蝴蝶结轮廓") },
  { id: "connection", x: "81.5%", y: "77%", size: 74, label: B("Connection becomes unstable under strong pulling", "强拉扯下连接不稳定") },
];

const CONCEPT_STAGES = [
  { label: "Insight", className: "concept-stage--insight" },
  { label: "HMW", className: "concept-stage--hmw" },
  { label: "Ideation", className: "concept-stage--ideation" },
  { label: "Product Iteration", className: "concept-stage--iteration" },
];

export default function WhufflCaseStudy() {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage?.getItem("whuffl.lang");
    return stored === "zh" || stored === "en" ? stored : "en";
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isHeroVideoOpen, setIsHeroVideoOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isHeroRevealing, setIsHeroRevealing] = useState(false);
  const heroBackgroundVideoRef = useRef(null);
  const activeChapter = useScrollChapter(SECTION_IDS);
  const [whyRef] = useSectionImagePreload();
  const [walkQualityRef] = useSectionImagePreload();
  const [decideRef] = useSectionImagePreload();
  const [buildRef] = useSectionImagePreload();
  const [experienceRef] = useSectionImagePreload();
  const [viabilityRef] = useSectionImagePreload();

  useEffect(() => {
    if (isHovering) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % PERSPECTIVE_ROWS.length);
    }, AUTO_INTERVAL);
    return () => window.clearInterval(timer);
  }, [isHovering]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    try {
      window.localStorage?.setItem("whuffl.lang", lang);
    } catch {
      /* storage may be blocked; safe to ignore */
    }
  }, [lang]);

  const openHeroVideo = useCallback(() => {
    heroBackgroundVideoRef.current?.pause();
    setIsHeroVideoOpen(true);
  }, []);

  const closeHeroVideo = () => {
    setIsHeroVideoOpen(false);
    const backgroundVideo = heroBackgroundVideoRef.current;
    if (backgroundVideo) {
      backgroundVideo.muted = true;
      backgroundVideo.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (!isHeroVideoOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeHeroVideo();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isHeroVideoOpen]);

  useEffect(() => () => {
    document.body.classList.remove("hero-revealing");
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsHeroRevealing(true);
    document.body.classList.add("hero-revealing");
    window.setTimeout(() => setShowPreloader(false), 820);
  }, []);

  return (
    <main className={`whuffl-page ${isHeroRevealing ? "is-hero-revealing" : ""}`.trim()} data-lang={lang}>
      <CaseStudyNav lang={lang} onLangChange={setLang} activeChapter={activeChapter} />

      {/* ─── 01 HERO ─── */}
      <section id="hero" className="chapter chapter--hero" aria-labelledby="hero-title">
        <div className="hero-media" role="presentation">
          <video
            ref={heroBackgroundVideoRef}
            className="hero-background-video"
            src="/assets/whuffl/hero/hero-bg.mp4"
            poster="/assets/whuffl/hero/hero-poster.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="hero-video-tint" />
          <div className="hero-green-glow" />
          <button
            type="button"
            className="hero-video-interaction"
            aria-label={langPair({ en: "Play Whuffl film", zh: "播放 Whuffl 完整影片" })}
          />
        </div>
        <div className="chapter-inner chapter-inner--hero">
          <p className="hero-disciplines">
            <span data-lang-only="en">/ PRODUCT DESIGN<br />/ EXPERIENCE DESIGN<br />/ UI DESIGN</span>
            <span data-lang-only="zh">/ 产品设计<br />/ 体验设计<br />/ UI 设计</span>
          </p>
          <p className="hero-role">
            <span data-lang-only="en">Independent concept project — research, product strategy, UI/UX, hardware product design / feasibility, sourcing logic, pricing model and GTM strategy.</span>
            <span data-lang-only="zh">独立概念项目—研究、产品策略、UI/<br />UX、硬件产品设计/硬件可行性、供应链<br />逻辑、定价模型与GTM策略</span>
          </p>
          <div className="hero-primary-row">
            <div className="hero-heading-group">
              <p className="hero-tag">
                <span data-lang-only="en">A smart dog collar + companion app for young urban dog owners</span>
                <span data-lang-only="zh">针对城市年轻养狗群体的宠物智能项圈+配套APP</span>
              </p>
              <h1 id="hero-title" className="hero-title">
                <span data-lang-only="en">Helping owners<br />understand a walk<br />from a dog’s point of view.</span>
                <span data-lang-only="zh">让主人从狗狗视角<br />重新理解一次散步</span>
              </h1>
              <p className="hero-recruitment-note">Shared For Recruitment Purposes Only</p>
            </div>
            <button className="hero-play-button" type="button" aria-label={langPair({ en: "Play full Whuffl film", zh: "播放 Whuffl 完整影片" })}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7.25v9.5L17 12 9 7.25Z" fill="currentColor" /></svg>
            </button>
          </div>
        </div>
        <HeroCursorAction lang={lang} onOpen={openHeroVideo} />
      </section>

      {/* ─── 02 WHY — Urban Context ─── */}
      <section ref={whyRef} id="why-context" className="page-section why-context" aria-labelledby="why-context-title">
        <div className="page-inner">
          <SectionIntro
            index="01"
            label={B("WHY", "WHY")}
            id="why-context-title"
            title={
              <>
                <span data-lang-only="en">Why do young people value companionship with their dogs more and more, while finding it harder to tell whether a walk has truly met their needs?</span>
                <span data-lang-only="zh">为什么年轻人越来越重视与狗狗的陪伴，却越来越难判断一次散步是否真正满足了它？</span>
              </>
            }
          />
          <div className="why-card-grid reveal-card-grid">
            {CONTEXT_CARDS.map((card, index) => (
              <RevealCard as="article" key={card.id} delay={index * 90} className={`why-card why-card--${card.id}`}>
                <div className="why-card-number">/{card.id}</div>
                <h3 className="why-card-headline"><ContextCardHeadline id={card.id} /></h3>
                <div className="why-card-body-zone">
                  {card.id === "02" ? (
                    <div className="why-card-chart-group">
                      <div className="why-card-chart-wrap">
                        <img
                          data-preload-src="/assets/whuffl/page-02-why/why-02-chart.png"
                          alt=""
                          className="why-card-chart"
                        />
                      </div>
                      <ContextCardCopy id={card.id} />
                    </div>
                  ) : (
                    <div className="why-card-copy-group"><ContextCardCopy id={card.id} /></div>
                  )}
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
        <img className="why-landscape" data-preload-src="/assets/whuffl/page-02-why/why-bottom-landscape.png" alt="Urban dog-walking context research collage" />
      </section>

      {/* ─── 03 WHY — High-quality Walk ─── */}
      <section ref={walkQualityRef} id="walk-quality" className="page-section walk-quality-section" aria-labelledby="walk-quality-title">
        <div className="page-inner">
          <SectionIntro
            index="01"
            label={B("WHY", "WHY")}
            id="walk-quality-title"
            title={B("What makes a high-quality walk?", "什么是一次高质量的散步?")}
            subtitle={B("Owners know walking matters, but its value is more complex than it first appears.", "主人承认散步重要，但散步本身带来的价值比想象中更复杂。")}
          />

          <div className="walk-survey">
            <p className="walk-survey-label">{langPair(surveyInsights.lead)}</p>
            <div className="walk-survey-track" role="img" aria-label="Emotional bond 36%, sense of control 31%, physical health 21%, social identity 12%">
              {surveyInsights.benefits.map((benefit) => <span key={benefit.id} style={{ width: `${benefit.share}%` }} />)}
            </div>
            <ul className="walk-survey-legend">
              {surveyInsights.benefits.map((benefit) => (
                <li key={benefit.id}><i aria-hidden="true" /><span>{langPair(benefit.label)}</span><em>{benefit.share}%</em></li>
              ))}
            </ul>
          </div>

          <div className="interview-grid reveal-card-grid">
            {interviews.items.map((it, index) => (
              <RevealCard as="figure" key={it.id} delay={index * 90} className="interview-card">
                <img data-preload-src={it.avatar} alt={langPair(it.name)} />
                <figcaption>
                  <p className="interview-question">{langPair(it.theme)}</p>
                  <blockquote>{langPair(it.quote)}</blockquote>
                  <p className="interview-meta">{langPair(it.name)} <span>·</span> {langPair(it.role)}</p>
                </figcaption>
              </RevealCard>
            ))}
          </div>

          <section className="perspective" aria-labelledby="perspective-title">
            <h3 id="perspective-title">{langPair(B("Owner interpretation VS dog interpretation", "主人的解读 VS 狗狗的解读"))}</h3>
            <div
              className="perspective-list has-active"
              onMouseLeave={() => setIsHovering(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setIsHovering(false);
              }}
            >
              {PERSPECTIVE_ROWS.map((row, index) => (
                <div key={row.key} className={`perspective-row ${activeIndex === index ? "is-active" : ""}`}>
                  <p className="human-copy">{langPair(row.human)}</p>
                  <button
                    type="button"
                    className="keyword"
                    onMouseEnter={() => { setIsHovering(true); setActiveIndex(index); }}
                    onFocus={() => { setIsHovering(true); setActiveIndex(index); }}
                  >{langPair(row.keyword)}</button>
                  <p className="dog-copy">{langPair(row.dog)}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="quality-insight">{langPair(walkQuality.designImplication)}</p>
          <RevealTextGroup as="p" className="why-conclusion reveal-text-group--self">
            <span data-lang-only="en">The problem is not that owners cannot see behavior. It is that they see it, yet cannot translate it into a confident judgment.</span>
            <span data-lang-only="zh">问题不是主人看不到行为，而是看到了，却无法把行为转译成一个有把握的判断。</span>
          </RevealTextGroup>
        </div>
      </section>

      {/* ─── 04 DECIDE ─── */}
      <section ref={decideRef} id="ch-decide" className="chapter chapter--decide" aria-labelledby="decide-title">
        <div className="decide-canvas">
          <SectionIntro
            className="decide-heading"
            index="02"
            label="DECIDE"
            id="decide-title"
            title={B("Why this opportunity, these users, this form factor", "为什么是这个机会，这些用户，这种产品形态")}
            subtitle={B(
                "Market research, competitive analysis, user research and product decisions converge on Whuffl’s direction.",
                "通过市场调研、竞品分析、用户研究与产品决策，共同收敛 Whuffl 的产品方向。"
              )}
          />

          <h3 className="decide-panel-title decide-panel-title--gap">
            {langPair(B("Where existing solutions fall short", "现有方案的不足"))}
          </h3>
          <article className="competitor-card" aria-labelledby="decide-gap-table-title">
            <h4 id="decide-gap-table-title" className="sr-only">
              {langPair(B("Current solution gaps", "现有方案缺口对比"))}
            </h4>
            <table className="competitor-table">
              <colgroup><col /><col /><col /></colgroup>
              <thead>
                <tr>
                  <th scope="col">{langPair(B("Solution", "方案"))}</th>
                  <th scope="col">{langPair(B("What it does", "能做到"))}</th>
                  <th scope="col">{langPair(B("Gap", "缺口"))}</th>
                </tr>
              </thead>
              <tbody>
                {currentSolutions.rows.map((row) => (
                  <tr key={langPair(row.type)}>
                    <th scope="row">{langPair(row.type)}</th>
                    <td>{langPair(row.strength)}</td>
                    <td>{langPair(row.gap)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="competitor-summary">
              {langPair(B(
                "The missing layer is not more data, but an explanation of what to do now.",
                "缺的不是更多数据，而是把数据转成“现在该怎么做”的解释层。"
              ))}
            </p>
          </article>

          <h3 className="decide-panel-title decide-panel-title--concept">
            {langPair(B("Why collar + app", "为什么是项圈 + App"))}
          </h3>
          <article className="concept-card" aria-labelledby="concept-title">
            <header className="concept-heading">
              <h4 id="concept-title">{langPair(B("Collar + App: division of roles", "项圈 + App：分工"))}</h4>
              <p className="concept-thesis">{langPair(B("The collar handles now; the app enables understanding.", "项圈负责“当下”，App 负责“理解”。"))}</p>
              <p className="concept-key">{langPair(B("Collar = real-time, glanceable, low interruption · App = interpretation, history and learning", "Collar = 实时、一瞥、低干扰 · App = 解读、历史与学习"))}</p>
            </header>

            <ol className="concept-loop" aria-label={langPair(B("Product system loop", "产品系统闭环"))}>
              {DECIDE_LOOP.map((node, index) => (
                <li key={node.id} className="concept-loop-item">
                  <div className={`concept-pill ${node.medium ? "is-medium" : ""}`}>
                    <span>{node.id}</span>{langPair(node.label)}
                  </div>
                  <p>{langPair(node.detail)}</p>
                  {index < DECIDE_LOOP.length - 1 ? <span className="concept-arrow" aria-hidden="true">→</span> : <span className="concept-arrow concept-arrow--return" aria-hidden="true">↺</span>}
                </li>
              ))}
            </ol>

            <ol className="product-decisions">
              {PRODUCT_DECISIONS.map((decision) => (
                <li key={decision.id}>
                  <span>{decision.id}</span>
                  <strong>{langPair(decision.title)}</strong>
                  <p>{langPair(decision.detail)}</p>
                </li>
              ))}
            </ol>
          </article>

          <p className="decision-highlight">
            {langPair(B(
              "Borrow real-time guidance from fitness products, but redefine ‘achievement’ around canine exploration, autonomy and state change—not steps or mileage.",
              "借鉴运动产品的实时引导，但把“达标”从步数和里程，改成狗狗的探索、自主与状态变化。"
            ))}
          </p>

          <h3 className="decide-persona-title">Persona</h3>
          <div className="decide-persona-grid reveal-card-grid">
            {personas.cards.map((persona, index) => <PersonaCard key={persona.id} persona={persona} delay={index * 90} />)}
          </div>

          <section className="concept-derivation" aria-labelledby="concept-derivation-title">
            <div className="concept-derivation-canvas">
              <h3 id="concept-derivation-title" className="concept-derivation-title section-display-title">
                <span data-lang-only="en">To solve the gap between knowing and understanding —</span>
                <span data-lang-only="zh">为弥合“看见”与“理解”之间的断层——</span>
              </h3>

              <svg className="concept-flow-lines" viewBox="0 0 1440 563" aria-hidden="true">
                <path d="M332 172 C364 172 344 226 385 239" />
                <path d="M332 284 C364 284 342 284 385 284" />
                <path d="M332 396 C364 396 344 342 385 329" />
                <path d="M548 239 C573 239 548 192 568 192" />
                <path d="M548 329 C573 329 548 374 568 374" />
              </svg>

              <div className="concept-insights">
                {CONCEPT_INSIGHTS.map((insight, index) => (
                  <p key={index} className={`concept-insight-card concept-insight-card--${index + 1}`}>
                    {langPair(insight)}
                  </p>
                ))}
              </div>

              <div className="concept-hmw" aria-label={langPair(B("How might we help owners understand what their dog is experiencing?", "我们如何帮助主人理解狗狗正在经历什么？"))}>
                <div className="concept-hmw-circle" aria-hidden="true" />
                <img className="concept-hmw-picture" data-preload-src="/assets/whuffl/page-04-decide/HMW-picture.png" alt="" />
                <p className="concept-hmw-core">
                  <span data-lang-only="en">Help owners understand<br />what their dog is experiencing</span>
                  <span data-lang-only="zh">帮助主人理解<br />狗狗正在经历什么</span>
                </p>
              </div>

              <div className="concept-ideation">
                <article className="concept-ideation-card concept-ideation-card--goal">
                  <h4><span data-lang-only="en">Behavior change<br />= Goal</span><span data-lang-only="zh">行为改变<br />= 目标</span></h4>
                  <p><span data-lang-only="en"># Micro-habit Rewards<br /># Loss Aversion<br /># Mutual Healing</span><span data-lang-only="zh"># 微习惯奖励<br /># 损失规避<br /># 双向疗愈</span></p>
                </article>
                <article className="concept-ideation-card concept-ideation-card--means">
                  <h4><span data-lang-only="en">Visualization<br />= Means</span><span data-lang-only="zh">可视化<br />= 手段</span></h4>
                  <p><span data-lang-only="en"># Emotion Recognition<br /># Scent Translation<br /># Visualized Insights</span><span data-lang-only="zh"># 状态识别<br /># 嗅闻转译<br /># 洞察可视化</span></p>
                </article>
              </div>

              <div className="concept-iteration-visual">
                <img data-preload-src="/assets/whuffl/page-04-decide/product iteration.png" alt={langPair(B("Product iteration sketches and collar prototypes", "产品迭代草图与项圈原型"))} />
                {ITERATION_HOTSPOTS.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    className="iteration-hotspot"
                    type="button"
                    aria-label={langPair(hotspot.label)}
                    style={{ left: hotspot.x, top: hotspot.y, "--bubble-size": `${hotspot.size}px` }}
                  >
                    <span className="hotspot-dot" aria-hidden="true" />
                    <span className="hotspot-bubble" aria-hidden="true">{langPair(hotspot.label)}</span>
                  </button>
                ))}
              </div>

              <div className="concept-process-line" aria-hidden="true" />
              {CONCEPT_STAGES.map((stage) => (
                <p key={stage.label} className={`concept-stage ${stage.className}`}>{stage.label}</p>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ─── 04 BUILD ─── */}
      <section ref={buildRef} id="ch-build" className="chapter chapter--build" aria-labelledby="build-title">
        <div className="build-inner">
          <SectionIntro
            className="build-header"
            index="03"
            label="BUILD"
            id="build-title"
            title="Size Calculation & Explosive View"
            surface="dark"
          />
          <BuildHardware lang={lang} />
          <article className="light-feedback">
            <RevealTextGroup as="header" className="case-section-header light-feedback-header">
              <h2 className="case-section-title reveal-text-group__title">Light Feedback</h2>
              <p className="case-section-subtitle reveal-text-group__subtitle">5 distinct light colors to indicate the dog&apos;s state and provide actionable prompts.</p>
            </RevealTextGroup>
            <LightStateSelector lang={lang} />
          </article>
          <article className="ui-design-section">
            <RevealTextGroup as="header" className="case-section-header">
              <h2 className="case-section-title reveal-text-group__title">UI Design</h2>
              <p className="case-section-subtitle reveal-text-group__subtitle">5-step experience flow</p>
            </RevealTextGroup>
            <BuildAppCarousel />
          </article>
        </div>
      </section>

      {/* ─── 04 EXPERIENCE ─── */}
      <section ref={experienceRef} id="ch-experience" className="chapter chapter--experience" aria-labelledby="experience-title">
        <div className="chapter-inner">
          <SectionIntro
            id="experience-title"
            index="04"
            label={B("EXPERIENCE", "EXPERIENCE")}
            title={
              <span>
                <span data-lang-only="en">When You Have Whuffl...</span>
                <span data-lang-only="zh">当你有了Whuffl...</span>
              </span>
            }
            subtitle={B(
              "How the hardware and app work together throughout a complete walk, and how pet owners communicate with their dogs.",
              "硬件与 App 在一次完整的散步里如何协作，宠物主和狗狗如何交流"
            )}
          />

          <article className="experience-storyboard-block">
            <div className="experience-storyboard">
              <div className="storyboard-grid">
                {experienceStoryboard.map((scene) => (
                  <article className="storyboard-card" key={scene.id}>
                    <div className="storyboard-image-wrap">
                      <img data-preload-src={scene.image} alt={scene.id} />
                    </div>
                    <div className="storyboard-caption">{langPair(scene.title)}</div>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="journey-section">
            <RevealTextGroup as="header" className="experience-subheader">
              <h3 className="experience-subtitle section-display-title reveal-text-group__title">
                {langPair({ en: "Complete User Journey Map", zh: "完整用户旅程图" })}
              </h3>
              <p className="experience-sublead reveal-text-group__subtitle">
                {langPair({
                  en: "The end-to-end flow from discovering Whuffl to using and sharing it.",
                  zh: "从接触Whuffl到进行使用-分享的完整流程"
                })}
              </p>
            </RevealTextGroup>
            <JourneyMapViewer
              src={journeyMap.asset}
              alt={langPair({ en: "User journey map", zh: "用户旅程图" })}
              openLabel={journeyMap.openLabel}
            />
            <section className="journey-principles" aria-labelledby="journey-principles-title">
              <h4 id="journey-principles-title" className="journey-principles-title">
                Designing Beyond The Happy Path
              </h4>
              <div className="journey-principles-grid">
                {journeyPrinciples.map((principle, index) => (
                  <RevealCard
                    as="article"
                    key={principle.id}
                    delay={index * 90}
                    className="journey-principle-card"
                  >
                    <h5>{langPair(principle.title)}</h5>
                    <p>{langPair(principle.body)}</p>
                  </RevealCard>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* ─── 06 VIABILITY ─── */}
      <section ref={viabilityRef} id="ch-viability" className="chapter chapter--viability" aria-labelledby="viability-title">
        <div className="chapter-inner">
          <SectionIntro
            id="viability-title"
            index="05"
            label={B("VIABILITY", "VIABILITY")}
            title={
              <span>
                <span data-lang-only="en">{`Cost, Pricing, GTM & Outcomes`}</span>
                <span data-lang-only="zh">{`成本、定价、GTM 与结果`}</span>
              </span>
            }
            subtitle={B(
              "A viable product must not only work—it must be manufacturable, priceable, and positioned with confidence.",
              "好产品不仅要有用，也要能制造、能定价，并找到清晰的市场位置。"
            )}
            surface="dark"
          />

          <article className="block block--narrative block--viability-sourcing">
            <ol className="sourcing-list">
              {sourcing.steps.map((s, i) => (
                <li key={i} className="sourcing-step">
                  <span className="sourcing-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sourcing-step-text">{langPair(s)}</span>
                </li>
              ))}
            </ol>
          </article>

          <section className="viability-main">
            <h2 className="viability-cost-title">{langPair({ en: "Hardware Cost & PSM", zh: "硬件成本 & PSM" })}</h2>
            <div className="viability-cost-grid">
              <BOMComparison data={bom} hideTotals />
              <aside className="viability-cost-aside">
                <BOMTotals data={bom} />
                <FullyLoadedCost data={fullyLoadedCost} />
              </aside>
            </div>
            <div className="psm-block viability-psm-grid">
              <HardwarePsmCurve />
              <PricingFeasibilityCard data={psmSummary} />
            </div>
            <OfferArchitecture />
          </section>
          <ViabilitySection />
        </div>
      </section>

      {isHeroVideoOpen ? <HeroVideoPlayer onClose={closeHeroVideo} /> : null}
      {showPreloader ? <HeroPreloader videoRef={heroBackgroundVideoRef} onComplete={handlePreloaderComplete} /> : null}
    </main>
  );
}

function HeroCursorAction({ lang, onOpen }) {
  const labelRef = useRef(null);
  const frameRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0, hasValue: false });
  const visibleRef = useRef(false);
  const onOpenRef = useRef(onOpen);

  const pillLabel = lang === "zh" ? "探索Whuffl" : "Explore Whuffl";

  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  const updatePillPosition = useCallback(() => {
    const pill = labelRef.current;
    if (!pill || !lastPointerRef.current.hasValue) return;

    const { x, y } = lastPointerRef.current;
    const { width, height } = pill.getBoundingClientRect();
    const maxLeft = Math.max(8, window.innerWidth - width - 8);
    const maxTop = Math.max(8, window.innerHeight - height - 8);
    const left = Math.min(Math.max(8, x + 18), maxLeft);
    const top = Math.min(Math.max(8, y + 18), maxTop);
    pill.style.transform = `translate3d(${left}px, ${top}px, 0) scale(1)`;
  }, []);

  const schedulePillPosition = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      updatePillPosition();
    });
  }, [updatePillPosition]);

  useLayoutEffect(() => {
    if (visibleRef.current) updatePillPosition();
  }, [pillLabel, updatePillPosition]);

  useEffect(() => {
    const media = document.querySelector(".hero-video-interaction");
    const playButton = document.querySelector(".hero-play-button");
    const pill = labelRef.current;
    if (!media || !playButton || !pill) return undefined;

    const move = (event) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY, hasValue: true };
      schedulePillPosition();
    };
    const setScale = (scale) => {
      const currentTransform = pill.style.transform || "translate3d(0, 0, 0)";
      const withoutScale = currentTransform.replace(/\s*scale\([^)]*\)/, "");
      pill.style.transform = `${withoutScale} scale(${scale})`;
    };
    const enter = () => {
      visibleRef.current = true;
      pill.style.opacity = "1";
      setScale(1);
    };
    const leave = () => {
      visibleRef.current = false;
      pill.style.opacity = "0";
      setScale(.94);
    };
    const open = () => onOpenRef.current?.();
    const targets = [media, playButton];
    targets.forEach((target) => {
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerenter", enter);
      target.addEventListener("pointerleave", leave);
    });
    targets.forEach((target) => target.addEventListener("click", open));

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerenter", enter);
        target.removeEventListener("pointerleave", leave);
      });
      targets.forEach((target) => target.removeEventListener("click", open));
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [schedulePillPosition, updatePillPosition]);

  return <div ref={labelRef} className="hero-cursor-action" aria-hidden="true">{pillLabel}</div>;
}

function HeroPreloader({ videoRef, onComplete }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const numberValueRef = useRef(null);
  const completeRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const startedAt = performance.now();
    const minimumDuration = 2000;
    let ready = Boolean(video && video.readyState >= 3);
    let frame = 0;
    let mounted = true;

    const markReady = () => { ready = true; };
    video?.addEventListener("loadeddata", markReady);
    video?.addEventListener("canplay", markReady);

    const tick = (now) => {
      if (!mounted) return;
      const elapsed = now - startedAt;
      let progress;
      if (elapsed < 500) progress = elapsed / 500 * .55;
      else if (elapsed < 1100) progress = .55 + (elapsed - 500) / 600 * .27;
      else if (elapsed < 1500) progress = .82 + (elapsed - 1100) / 400 * .12;
      else progress = .94 + Math.min(.05, (elapsed - 1500) / 500 * .05);
      if (ready && elapsed >= minimumDuration) progress = 1;
      lineRef.current?.style.setProperty("--load-progress", String(Math.min(progress, .999)));
      if (numberValueRef.current) numberValueRef.current.textContent = String(Math.round(Math.min(progress, .999) * 100));
      if (progress >= 1 && !completeRef.current) {
        completeRef.current = true;
        lineRef.current?.style.setProperty("--load-progress", "1");
        if (numberValueRef.current) numberValueRef.current.textContent = "100";
        rootRef.current?.classList.add("is-complete");
        window.setTimeout(() => onComplete(), 220);
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => {
      mounted = false;
      video?.removeEventListener("loadeddata", markReady);
      video?.removeEventListener("canplay", markReady);
      window.cancelAnimationFrame(frame);
    };
  }, [onComplete, videoRef]);

  return (
    <div ref={rootRef} className="hero-preloader" aria-live="polite">
      <div className="hero-preloader-panel">
        <img className="loader-logo" src="/assets/whuffl/common/logo-grey.png" alt="Whuffl" />
        <div className="loader-line" aria-hidden="true"><span ref={lineRef} className="loader-line-progress" /></div>
        <div className="loader-number"><span className="loader-number-value" ref={numberValueRef}>0</span><span>%</span></div>
      </div>
    </div>
  );
}

function HeroVideoPlayer({ onClose }) {
  const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);
  return (
    <div className="hero-video-player" role="dialog" aria-modal="true" aria-label="Whuffl film">
      <video ref={videoRef} src="/assets/whuffl/hero/hero-full.mp4" preload="none" playsInline controls autoPlay />
      <button className="hero-video-close" type="button" onClick={onClose} aria-label="Close video">×</button>
    </div>
  );
}

// Inline bilingual helper used only inside the page.
function B(en, zh) { return { en, zh }; }

function ContextCardHeadline({ id }) {
  if (id === "01") {
    return (
      <>
        <span data-lang-only="en">Dog walking is shifting from daily care<br />into a high-burden urban task.</span>
        <span data-lang-only="zh">遛狗正在从日常照护，<br />变成高负担的城市任务</span>
      </>
    );
  }
  if (id === "02") {
    return (
      <>
        <span data-lang-only="en">Time gets fragmented, and owners can only “complete the walk,”<br />while struggling to tell whether it was actually a “good walk.”</span>
        <span data-lang-only="zh">时间被切碎，主人只能“完成遛狗”，<br />却很难判断是否“遛得好”</span>
      </>
    );
  }
  return (
    <>
      <span data-lang-only="en">For young people, dogs have become emotional companions,<br />but tools for understanding them are still lacking.</span>
      <span data-lang-only="zh">对年轻人来说，狗已经是情感伙伴，<br />但缺少理解狗狗状态的工具</span>
    </>
  );
}

function ContextCardCopy({ id }) {
  if (id === "01") {
    return (
      <p className="why-card-body">
        <strong>78%</strong> {langPair(B("of dog owners cite walking as one of the biggest burdens in daily pet care.", "的养狗者将遛狗视为日常养宠中最主要的负担之一。"))}<br />
        <strong>60%</strong> {langPair(B("of urban complaints are related to ‘out-of-control’ dog behavior.", "的城市相关投诉与“失控”的狗狗行为有关。"))}<br />
        {langPair(B("Common pain points cluster around Leash Chaos / Dog-Dog Tension / Neighbor Conflict / Safety Anxiety.", "常见痛点集中在 Leash Chaos / Dog-Dog Tension / Neighbor Conflict / Safety Anxiety。"))}
      </p>
    );
  }
  if (id === "02") {
    return (
      <p className="why-card-caption">
        <span data-lang-only="en">In reality, walks are often fragmented into multiple short sessions,<br />making sustained, high-quality interaction difficult to maintain.</span>
        <span data-lang-only="zh">实际遛狗往往被拆成多个短时段，<br />持续、高质量互动难以维持。</span>
      </p>
    );
  }
  return (
    <p className="why-card-body">
      <strong>75%</strong> {langPair(B("of pet owners see pets as family members.", "的宠物主人将宠物视为家庭成员。"))}<br />
      Gen Z {langPair(B("and Millennials make up", "与 Millennials 占宠物消费市场的"))} <strong>60%+</strong>。<br />
      {langPair(B("Pet apps, short video and content platforms are already used to record, interact, learn and solve pet-care problems.", "宠物 App、短视频和内容平台正在被用于记录、互动、获取知识和处理养宠问题。"))}
    </p>
  );
}
