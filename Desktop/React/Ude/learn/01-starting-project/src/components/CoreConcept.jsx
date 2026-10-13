import { CORE_CONCEPTS } from "../data.js";
import CoreConcepts from "./Component";

export default function CoreConcept() {
    return (
        <section id="core-concepts">
        <h2>Core Components</h2>
        <ul>
          {CORE_CONCEPTS.map((concept) => (
            <CoreConcepts key={concept.title} {...concept} />
          ))}
        </ul>
      </section>
    )
    
}