import { langPair } from "../../lib/lang.js";

/**
 * 08 — ProductSystemDiagram
 * DOG → COLLAR → SIGNAL → APP → OWNER → DOG loop with input/output
 * categories listed beneath.
 */
export default function ProductSystemDiagram({ data }) {
  return (
    <div className="chart-sys">
      <p className="chart-sys-headline">{langPair(data.headline)}</p>
      <p className="chart-sys-lead">{langPair(data.lead)}</p>
      <ol className="chart-sys-loop" aria-label="System loop">
        {data.loop.map((step, i) => (
          <li key={i} className={`chart-sys-node ${i === 1 || i === 3 ? "is-product" : ""}`.trim()}>
            <span className="chart-sys-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="chart-sys-name">{langPair(step)}</span>
            {i < data.loop.length - 1 ? (
              <span className="chart-sys-arrow" aria-hidden="true">→</span>
            ) : (
              <span className="chart-sys-arrow is-loop" aria-hidden="true">↺</span>
            )}
          </li>
        ))}
      </ol>
      <div className="chart-sys-io">
        <div className="chart-sys-col">
          <h4 className="chart-sys-col-title">{langPair({ en: "Inputs", zh: "输入" })}</h4>
          <ul>
            {data.inputs.map((s, i) => <li key={i}>{langPair(s)}</li>)}
          </ul>
        </div>
        <div className="chart-sys-col">
          <h4 className="chart-sys-col-title">{langPair({ en: "Output", zh: "输出" })}</h4>
          <ul>
            {data.output.map((s, i) => <li key={i}>{langPair(s)}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
