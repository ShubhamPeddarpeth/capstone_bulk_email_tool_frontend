import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../auth/auth";
import "./templateOption.css";

function TemplateOption({ handleTemplateOption }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get(
        "https://bulk-email-tool-backend-v04p.onrender.com/api/v1/user/viewtemplates",
        config
      )
      .then((res) => {
        setTemplates(res.data.templates);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const selectedTemplateId = event.target.value;
    const selectedTemplate = templates.find(
      (template) => template._id === selectedTemplateId
    );
    handleTemplateOption(
      selectedTemplateId,
      selectedTemplate ? selectedTemplate.content : ""
    );
  };
  return (
    <div>
      <div className="card-temp">
        <h2 className="card-temp-title">Select Template</h2>
        <div className="card-temp-image">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/006/685/711/small_2x/illustration-graphic-cartoon-character-of-email-services-free-vector.jpg"
            alt="Template option"
          />
        </div>
        <div className="card-temp-select">
          <label htmlFor="select-option">Select Option:</label>
          <select id="select-option" onChange={handleChange}>
            <option value="none">None</option>
            {templates.map((template) => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TemplateOption;
