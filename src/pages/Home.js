import React, { useEffect, useState } from "react";
import { getToken } from "../auth/auth";
import axios from "axios";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import OverViewCard from "../components/overviewCard/OverViewCard";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get(
        "https://capstone-bulk-email-tool-backend-4.onrender.com/api/v1/user/dashboard",
        config
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <Navbar />
        <section className="home">
          <div style={{ marginTop: "100px" }}>
            <div className="overview_container">
              <Link to="/groups">
                <OverViewCard
                  icon={"fa-solid fa-envelopes-bulk"}
                  number={data.groups}
                  subtitle="Created Groups"
                />
              </Link>
              <Link to="/sentdetails">
                <OverViewCard
                  icon={"fa-solid fa-envelope-circle-check"}
                  number={data.sents}
                  subtitle="Mails Sent"
                />
              </Link>
              <Link to="/templates">
                <OverViewCard
                  icon={"fa-sharp fa-solid fa-table"}
                  number={data.templates}
                  subtitle="Created Templates"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
