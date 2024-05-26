import React from "react";
import "./mailList.css";

function MailList({ data }) {
  const date = (d) => {
    const dateString = d;
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th>Slno.</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.fromEmail}</td>
              <td>{data.subject}</td>
              <td>{data.message}</td>
              <td>{date(data.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MailList;
