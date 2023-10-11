import React, { useEffect, useState } from "react";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./status.css";
import { Card } from "../../cards/Card";

const statusData = [
  {
    title: "Backlog",
    icon: <CloudOffIcon fontSize="smaller" />,
    status: "Backlog",
  },
  { title: "Todo", icon: <CircleIcon fontSize="smaller" />, status: "Todo" },
  {
    title: "In Progress",
    icon: <TimelapseIcon fontSize="smaller" />,
    status: "In progress",
  },
  {
    title: "Done",
    icon: <CheckCircleIcon fontSize="smaller" />,
    status: "Done",
  },
  {
    title: "Canceled",
    icon: <CancelIcon fontSize="smaller" />,
    status: "Canceled",
  },
];

export const Status = (props) => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData.users);
      setTicketData(props.userData.tickets);
      countStatus();
    }
  }, [props]);

  function countStatus() {
    const counts = {};
    ticketData?.forEach((ele) => {
      if (counts[ele.status]) {
        counts[ele.status]++;
      } else {
        counts[ele.status] = 1;
      }
    });
    setStatusCounts(counts);
  }

  return (
    <div className="container">
      {statusData.map((statusItem) => (
        <div
          className={`${statusItem.status.toLowerCase()}-cards`}
          key={statusItem.status}
        >
          {console.log(statusItem)}
          <div
            className={
              statusItem.status === "In progress"
                ? "in-progress"
                : `${statusItem.status.toLowerCase()}`
            }
          >
            <div className="icon-type-count">
              <div className="icon">{statusItem.icon}</div>
              <div className="title-comp">{statusItem.title}</div>
              <div className="count">
                {statusCounts[statusItem.status] || 0}
              </div>
            </div>
            <div className="menu-add">
              <div className="add">+</div>
              <div className="menu">
                <MoreHorizIcon fontSize="smaller" />
              </div>
            </div>
          </div>
          <div className="cards">
            {ticketData?.map((ele) => {
              if (ele.status === statusItem.status) {
                return (
                  <div key={ele.id}>
                    <Card
                      isavailable={true}
                      item={ele}
                      userdata={userData}
                      isprofile={true}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
