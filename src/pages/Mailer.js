import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../auth/auth";
import "react-toastify/dist/ReactToastify.css";
import "../styles/dashboard.css";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import TemplateOption from "../components/templateOption/TemplateOption";

function Send() {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(" ");
  const [template, setTemplate] = useState("none");
  const [templateMessage, setTemplateMessage] = useState(""); // State to store template message

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };

    axios
      .get(
        "https://capstone-bulk-email-tool-backend-4.onrender.com/api/v1/user/viewgroups",
        config
      )
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = () => {
    console.log("clicked!");
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };

    const messageToSend = template === "none" ? message : templateMessage;
    axios
      .post(
        "https://capstone-bulk-email-tool-backend-4.onrender.com/api/v1/user/sendmail",
        {
          group,
          subject,
          message: messageToSend,
          template: template,
        },
        config
      )
      .then((res) => {
        toast.success("Successfully send mails", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };
  const handleTemplateOption = (id, templateMessage) => {
    setTemplate(id);
    setTemplateMessage(templateMessage);
    setMessage(templateMessage); // This will set the message in the textarea to the template message
  };

  return (
    <div>
      <div className="container">
        <Sidebar />
        <Navbar />
        <section className="home">
          <div style={{ marginTop: "100px" }}>
            <div className="mailer-container">
              <div className="email-card">
                <h2 className="email-card__title">Compose New Email</h2>
                <form className="email-card__form">
                  <div className="form-group">
                    <label htmlFor="emailTo">To:</label>
                    <select
                      className="form-control"
                      id="emailTo"
                      onChange={(e) => setGroup(e.target.value)}
                    >
                      <option>Select a group</option>
                      {groups.map((group) => (
                        <option key={group._id} value={group._id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailSubject">Subject:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailSubject"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailMessage">Message:</label>
                    <textarea
                      className="form-control"
                      id="emailMessage"
                      rows="8"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="email-card__actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleSubmit()}
                      //disabled={subject !== "" && group !== ""}
                    >
                      Send <i className="fa-sharp fa-solid fa-paper-plane" />
                    </button>
                    <button type="button" className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <div className="template-option">
                <TemplateOption handleTemplateOption={handleTemplateOption} />
              </div>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Send;
