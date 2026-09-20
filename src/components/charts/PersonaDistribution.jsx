import { langPair } from "../../lib/lang.js";
import ChartSegmentedBar from "./ChartSegmentedBar.jsx";

/**
 * 04 — PersonaDistribution
 * Single horizontal bar with three segments; P1 highlighted.
 */
export default function PersonaDistribution({ data }) {
  return (
    <div className="chart-persona-dist">
      <p className="chart-persona-dist-headline">
        {langPair({
          en: "Three personas, one weighted split.",
          zh: "三类画像，权重不均。",
        })}
      </p>
      <ChartSegmentedBar
        segments={data.distribution.map((d) => ({
          share: d.share,
          label: langPair(d.label),
          accent: !!d.accent,
        }))}
      />
    </div>
  );
}
