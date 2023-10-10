import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./priority.css";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import { Card } from "../../cards/Card";

export const Priority = (props) => {
  console.log(props);
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [countNoPriority, setCountBackLog] = useState(0);
  const [count1Priority, setCountTodo] = useState(0);
  const [count2Priority, setCountInProgress] = useState(0);
  const [count3Priority, setCountDone] = useState(0);
  const [count4Priority, setCountCanceled] = useState(0);
  const [ordering, setOrdering] = useState(0);

  useEffect(() => {
    if (props.userData != null) {
      setUserData(props.userData.users);
      setTicketData(props.userData.tickets);
      setOrdering(props?.ordering);
      countStatus();
    }
  }, [props]);

  function countStatus() {
    var countNoPriority = 0,
      count1Priority = 0,
      count4Priority = 0,
      count2Priority = 0,
      count3Priority = 0;
    ticketData?.map((ele) => {
      if (ele.priority === 0) {
        countNoPriority++;
      }
      if (ele.priority === 1) {
        count1Priority++;
      }
      if (ele.priority === 2) {
        count2Priority++;
      }
      if (ele.priority === 3) {
        count3Priority++;
      }
      if (ele.priority === 4) {
        count4Priority++;
      }
    });
    setCountBackLog(countNoPriority);
    setCountCanceled(count4Priority);
    setCountDone(count3Priority);
    setCountInProgress(count2Priority);
    setCountTodo(count1Priority);
  }
  return (
    <div className="container">
      <div className="no-cards">
        <div className="no-comp">
          <div className="icon-type-count">
            <div className="icon">
              <MoreHorizIcon fontSize="smaller" />
            </div>
            <div className="title-comp">No priority</div>
            <div className="count">{countNoPriority}</div>
          </div>
          <div className="menu-add">
            <div className="add">+</div>
            <div className="menu">
              <MoreHorizIcon fontSize="smaller" />
            </div>
          </div>
        </div>
        <div className="cards">
          {ticketData?.map((ele) => (
            <div>
              {ele.priority === 0 ? (
                <>
                  <Card
                    isavailable={false}
                    isdot={true}
                    item={ele}
                    userdata={userData}
                    isprofile={true}
                  />{" "}
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="urgent-cards">
        <div className="urgent">
          <div className="icon-type-count">
            <div className="icon">
              <SecurityUpdateWarningIcon fontSize="smaller" />
            </div>
            <div className="title-comp">Urgent</div>
            <div className="count">{count1Priority}</div>
          </div>
          <div className="menu-add">
            <div className="add">+</div>
            <div className="menu">
              <MoreHorizIcon fontSize="smaller" />
            </div>
          </div>
        </div>
        <div className="cards">
          {ticketData?.map((ele) => (
            <div>
              {ele.priority === 4 ? (
                <Card
                  isavailable={false}
                  isdot={true}
                  item={ele}
                  userdata={userData}
                  isprofile={true}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="high-priority-cards">
        <div className="high-priority">
          <div className="icon-type-count">
            <div className="icon">
              <SignalCellularAltIcon fontSize="smaller" />
            </div>
            <div className="title-comp">High</div>
            <div className="count">{count2Priority}</div>
          </div>
          <div className="menu-add">
            <div className="add">+</div>
            <div className="menu">
              <MoreHorizIcon fontSize="smaller" />
            </div>
          </div>
        </div>
        <div className="cards">
          {ticketData?.map((ele) => (
            <div>
              {ele.priority === 3 ? (
                <Card
                  isavailable={false}
                  isdot={true}
                  item={ele}
                  userdata={userData}
                  isprofile={true}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="medium-priority-cards">
        <div className="medium-priority">
          <div className="icon-type-count">
            <div className="icon">
              <SignalCellularAlt2BarIcon fontSize="smaller" />
            </div>
            <div className="title-comp">Medium</div>
            <div className="count">{count3Priority}</div>
          </div>
          <div className="menu-add">
            <div className="add">+</div>
            <div className="menu">
              <MoreHorizIcon fontSize="smaller" />
            </div>
          </div>
        </div>
        <div className="cards">
          {ticketData?.map((ele) => (
            <div>
              {ele.priority === 2 ? (
                <Card
                  isavailable={false}
                  isdot={true}
                  item={ele}
                  userdata={userData}
                  isprofile={true}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="low-priority-cards">
        <div className="low-priority">
          <div className="icon-type-count">
            <div className="icon">
              <SignalCellularAlt1BarIcon fontSize="smaller" />
            </div>
            <div className="title-comp">Low</div>
            <div className="count">{count4Priority}</div>
          </div>
          <div className="menu-add">
            <div className="add">+</div>
            <div className="menu">
              <MoreHorizIcon fontSize="smaller" />
            </div>
          </div>
        </div>
        <div className="cards">
          {ticketData?.map((ele) => (
            <div>
              {ele.priority === 1 ? (
                <Card
                  isavailable={false}
                  isdot={true}
                  item={ele}
                  userdata={userData}
                  isprofile={true}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};
