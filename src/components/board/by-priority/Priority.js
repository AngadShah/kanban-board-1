import React, { useEffect, useState } from "react";
import { Card } from "../../cards/Card";
import "./priority.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";

const priorityData = [
  {
    title: "No priority",
    icon: <MoreHorizIcon fontSize="smaller" />,
    priority: 0,
  },
  {
    title: "Urgent",
    icon: <SecurityUpdateWarningIcon fontSize="smaller" />,
    priority: 4,
  },
  {
    title: "High",
    icon: <SignalCellularAltIcon fontSize="smaller" />,
    priority: 3,
  },
  {
    title: "Medium",
    icon: <SignalCellularAlt2BarIcon fontSize="smaller" />,
    priority: 2,
  },
  {
    title: "Low",
    icon: <SignalCellularAlt1BarIcon fontSize="smaller" />,
    priority: 1,
  },
];

export const Priority = (props) => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [priorityCounts, setPriorityCounts] = useState({});

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData.users);
      setTicketData(props.userData.tickets);
      countPriority();
    }
  }, [props]);

  function countPriority() {
    const counts = {};
    priorityData.forEach((priorityItem) => {
      const count = ticketData?.reduce((acc, ele) => {
        if (ele.priority === priorityItem.priority) {
          return acc + 1;
        }
        return acc;
      }, 0);
      counts[priorityItem.priority] = count;
    });
    setPriorityCounts(counts);
  }

  return (
    <div className="container">
      {priorityData.map((priorityItem) => (
        <div
          className={`${priorityItem.title.toLowerCase()}-cards`}
          key={priorityItem.title}
        >
          <div
            className={
              priorityItem.title === "No priority"
                ? "no-comp"
                : `${priorityItem.title.toLowerCase()}`
            }
          >
            <div className="icon-type-count">
              <div className="icon">{priorityItem.icon}</div>
              <div className="title-comp">{priorityItem.title}</div>
              <div className="count">
                {priorityCounts[priorityItem.priority] || 0}
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
              if (ele.priority === priorityItem.priority) {
                return (
                  <div key={ele.id}>
                    <Card
                      isavailable={false}
                      isdot={true}
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
