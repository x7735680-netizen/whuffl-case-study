import { langPair } from "../../lib/lang.js";

/**
 * 06 — SolutionDecisionMatrix (chart variant)
 * 3-option table; "Collar + App" highlighted. Page-level matrix
 * reuses the same data shape with rich text.
 */
export default function SolutionDecisionMatrix({ data }) {
  return (
    <div className="chart-sdm">
      <p className="chart-sdm-headline">{langPair(data.headline)}</p>
      <p className="chart-sdm-lead">{langPair(data.lead)}</p>
      <table className="chart-sdm-table">
        <thead>
          <tr>
            <th scope="col">{langPair({ en: "Solution", zh: "方案" })}</th>
            <th scope="col">{langPair({ en: "Strength", zh: "强项" })}</th>
            <th scope="col">{langPair({ en: "Gap", zh: "缺口" })}</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r, i) => (
            <tr key={i}>
              <th scope="row">{langPair(r.type)}</th>
              <td>{langPair(r.strength)}</td>
              <td>{langPair(r.gap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
