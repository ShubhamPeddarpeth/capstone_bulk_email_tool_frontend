import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../auth/auth";
import MailList from "../components/mailList/MailList";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function SentDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const config = {
          headers: { Authorization: token },
        };
        axios
          .get(
            "https://capstone-bulk-email-tool-backend-4.onrender.com/api/v1/user/sentdetails",
            config
          )
          .then((res) => {
            setData(res.data.mails);
          });
      } catch (error) {
        console.error("Error fetching sent details:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <Navbar />
        <section className="home">
          <div style={{ marginTop: "100px", padding: "20px" }}>
            <MailList data={data} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SentDetails;
