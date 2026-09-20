import { langPair } from "../lib/lang.js";
import PhoneFrame from "./PhoneFrame.jsx";

/**
 * ProcessStep — Pattern C: step number + 1 phone + 1 sentence.
 */
export default function ProcessStep({ step, index, phone }) {
  return (
    <article className="process-step">
      <p className="process-step-num">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="process-step-title">{langPair(step.title)}</h3>
      <p className="process-step-body">{langPair(step.body)}</p>
      {phone ? <PhoneFrame src={phone.src} alt={phone.alt} size="md" /> : null}
    </article>
  );
}
