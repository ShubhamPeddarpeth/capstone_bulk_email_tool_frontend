import React, { useState } from "react";
import "./editor.css";

function Editor({ data }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
    data(newMessage);
  };

  return (
    <div>
      <textarea
        value={message}
        placeholder="Please enter your message."
        onChange={handleChange}
        rows={10}
        style={{
          fontSize: 16,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          padding: "15px",
          width: "100%",
        }}
      />
    </div>
  );
}

export default Editor;
