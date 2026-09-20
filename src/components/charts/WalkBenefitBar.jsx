import { langPair } from "../../lib/lang.js";
import ChartSegmentedBar from "./ChartSegmentedBar.jsx";

/**
 * 02 — WalkBenefitBar
 * 100% horizontal segmented bar of survey benefits.
 */
export default function WalkBenefitBar({ data }) {
  return (
    <div className="chart-walk-benefit">
      <p className="chart-walk-benefit-headline">{langPair(data.headline)}</p>
      <p className="chart-walk-benefit-lead">{langPair(data.lead)}</p>
      <ChartSegmentedBar
        segments={data.benefits.map((b) => ({
          share: b.share,
          label: langPair(b.label),
          accent: !!b.accent,
        }))}
      />
      <p className="chart-walk-benefit-source">{langPair(data.source)}</p>
    </div>
  );
}
