import { langPair } from "../../lib/lang.js";
import ChartRangeBar from "./ChartRangeBar.jsx";

/**
 * 11 — PSMRange
 * Hardware / Subscription / Persona OPP-RPR ranges. Always labeled
 * "Pricing feasibility model" — never claim a 300-person real-user
 * validation.
 */
export default function PSMRange({ data }) {
  const h = data.hardware;
  const s = data.subscription;
  return (
    <div className="chart-psm">
      <p className="chart-psm-disclosure">
        {langPair(data.disclosure)} · {langPair({ en: "labeled to disclose modeling assumption", zh: "已显式标注为“建模”而非“市场验证”" })}
      </p>

      <section className="chart-psm-block">
        <h3 className="chart-psm-title">{langPair({ en: "Hardware — overall", zh: "硬件 — 总体" })}</h3>
        <div className="chart-psm-range">
          <ChartRangeBar
            rprLow={h.rprLow}
            rprHigh={h.rprHigh}
            opp={h.opp}
            reference={h.anchorMsrp}
            referenceLabel="MSRP"
          />
        </div>
        <ul className="chart-psm-stats">
          <li><span>OPP</span><strong>¥{h.opp}</strong></li>
          <li><span>RPR</span><strong>¥{h.rprLow}–{h.rprHigh}</strong></li>
          <li><span>IPP</span><strong>¥{h.ipp}</strong></li>
          <li><span>{langPair({ en: "Launch", zh: "建议" })}</span><strong>{langPair(h.recommendation)}</strong></li>
        </ul>
      </section>

      <section className="chart-psm-block">
        <h3 className="chart-psm-title">{langPair({ en: "Subscription — overall", zh: "订阅 — 总体" })}</h3>
        <div className="chart-psm-range chart-psm-range--sub">
          <ChartRangeBar
            rprLow={s.rprLow}
            rprHigh={s.rprHigh}
            opp={s.opp}
            width={520}
          />
        </div>
        <ul className="chart-psm-stats">
          <li><span>OPP</span><strong>¥{s.opp}/月</strong></li>
          <li><span>RPR</span><strong>¥{s.rprLow}–{s.rprHigh}/月</strong></li>
          <li><span>IPP</span><strong>¥{s.ipp}/月</strong></li>
          <li><span>{langPair({ en: "Annual", zh: "年付" })}</span><strong>¥{s.annualAnchor}/年</strong></li>
        </ul>
      </section>

      <section className="chart-psm-block">
        <h3 className="chart-psm-title">{langPair({ en: "Hardware — by persona", zh: "硬件 — 按人群" })}</h3>
        <ul className="chart-psm-persona-list">
          {data.persona.map((p) => (
            <li key={p.id} className="chart-psm-persona">
              <span className="chart-psm-persona-name">{langPair(p.label)}</span>
              <div className="chart-psm-range">
                <ChartRangeBar
                  rprLow={p.rprLow}
                  rprHigh={p.rprHigh}
                  opp={p.opp}
                  width={420}
                />
              </div>
              <ul className="chart-psm-stats is-inline">
                <li><span>OPP</span><strong>¥{p.opp}</strong></li>
                <li><span>RPR</span><strong>¥{p.rprLow}–{p.rprHigh}</strong></li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
