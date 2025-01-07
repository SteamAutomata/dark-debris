import { useState } from "react";

export default function SlamOrSisr() {
  const [visible, setVisible] = useState(false);
  const [promptContent, setPromptContent] = useState(
    "Configurer des routeurs ?"
  );

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  const hide = { display: "none" };

  return (
    <div className="sos-panel">
      <div style={visible ? {} : hide}>
        <p>SLAM ou SISR ?</p>
        <textarea
          value={promptContent}
          onChange={(e) => setPromptContent(e.target.value)}
        />
        <button onClick={handleSubmit}></button>
      </div>
      <button
        type="button"
        className="sos-bubble"
        onClick={() => setVisible(!visible)}
      >
        ?
      </button>
    </div>
  );
}
