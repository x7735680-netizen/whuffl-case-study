import { langPair } from "../lib/lang.js";

/**
 * SolutionDecisionMatrix — 3-option comparison with the selected row
 * highlighted. The decision label sits in the rightmost column.
 */
export default function SolutionDecisionMatrix({ rows, decision }) {
  return (
    <div className="decision-matrix">
      <table className="decision-table">
        <thead>
          <tr>
            <th scope="col">{langPair({ en: "Option", zh: "方案" })}</th>
            <th scope="col">{langPair({ en: "Experience", zh: "体验" })}</th>
            <th scope="col">{langPair({ en: "Feasibility", zh: "可行性" })}</th>
            <th scope="col">{langPair({ en: "Cost", zh: "成本" })}</th>
            <th scope="col">{langPair({ en: "Decision", zh: "决定" })}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={r.selected ? "is-selected" : ""}>
              <th scope="row">{langPair(r.option)}</th>
              <td>{langPair(r.experience)}</td>
              <td>{langPair(r.feasibility)}</td>
              <td>{langPair(r.cost)}</td>
              <td className="decision-cell">
                {r.selected ? (
                  <span className="decision-pill">
                    {langPair({ en: "Selected", zh: "已选" })}
                  </span>
                ) : (
                  <span className="decision-dim">
                    {langPair({ en: "Rejected", zh: "未选" })}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {decision ? <p className="decision-note">{langPair(decision)}</p> : null}
    </div>
  );
}
