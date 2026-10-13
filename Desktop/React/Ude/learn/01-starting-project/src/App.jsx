import { useState } from "react";
import { EXAMPLES } from "./data.js";

import Header from "./components/Header/Header";

import CoreConcept from "./components/CoreConcept";
import Examples from "./components/Examples";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("");
  let tabContent = <p>please make sure u enter</p>;
  if (selectedTopic) {
    tabContent = <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <code>{EXAMPLES[selectedTopic].code}</code>
    </div>;
  }
  function handleClick(clickedButton) {
    setSelectedTopic(clickedButton);
  }
  return (
    <div>
      <Header />

      <CoreConcept />
      <Examples
        selectedTopic={selectedTopic}
        onSelect={handleClick}
        tabContent={tabContent}
      />
    </div>
  );
}

export default App;
