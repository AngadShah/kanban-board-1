import React, { useEffect, useState } from "react";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./status.css";
import { Card } from "../../cards/Card";
export const Status = (props) => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [countBackLog, setCountBackLog] = useState(0);
  const [countTodo, setCountTodo] = useState(0);
  const [countInProgress, setCountInProgress] = useState(0);
  const [countDone, setCountDone] = useState(0);
  const [countCanceled, setCountCanceled] = useState(0);
  const [ordering, setOrdering] = useState(0);
  useEffect(() => {
    if (props.userData != null) {
      setUserData(props.userData.users);
      setTicketData(props.userData.tickets);
      countStatus();
    }
  }, [props]);

  function countStatus() {
    var countBackLog = 0,
      countTodo = 0,
      countCanceled = 0,
      countInProgress = 0,
      countDone = 0;
    ticketData?.map((ele) => {
      if (ele.status === "Backlog") {
        countBackLog++;
      }
      if (ele.status === "Todo") {
        countTodo++;
      }
      if (ele.status === "In progress") {
        countInProgress++;
      }
      if (ele.status === "Done") {
        countDone++;
      }
      if (ele.status === "Canceled") {
        countCanceled++;
      }
    });
    setCountBackLog(countBackLog);
    setCountCanceled(countCanceled);
    setCountDone(countDone);
    setCountInProgress(countInProgress);
    setCountTodo(countTodo);
  }
  return (
    <div className="container">
      <div className="backlog-cards">
        <div className="back-log-comp">
          <div className="icon-type-count">
            <div className="icon">
              <CloudOffIcon fontSize="smaller" />
            </div>
            <div className="title-comp">BackLog</div>
            <div className="count">{countBackLog}</div>
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
              {ele.status === "Backlog" ? (
                <>
                  <Card
                    isavailable={true}
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
      <div className="todo-cards">
        <div className="todo">
          <div className="icon-type-count">
            <div className="icon">
              <CircleIcon fontSize="smaller" />
            </div>
            <div className="title-comp">Todo</div>
            <div className="count">{countTodo}</div>
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
              {ele.status === "Todo" ? (
                <Card
                  isavailable={true}
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
      <div className="in-progress-cards">
        <div className="in-progress">
          <div className="icon-type-count">
            <div className="icon">
              <TimelapseIcon fontSize="smaller" />
            </div>
            <div className="title-comp">In Progress</div>
            <div className="count">{countInProgress}</div>
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
              {ele.status === "In progress" ? (
                <Card
                  isavailable={true}
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
      <div className="done-cards">
        <div className="done">
          <div className="icon-type-count">
            <div className="icon">
              <CheckCircleIcon fontSize="smaller" />
            </div>
            <div className="title-comp">Done</div>
            <div className="count">{countDone}</div>
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
              {ele.status === "Done" ? (
                <Card
                  isavailable={true}
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
      <div className="canceled-cards">
        <div className="canceled">
          <div className="icon-type-count">
            <div className="icon">
              <CancelIcon fontSize="smaller" />
            </div>
            <div className="title-comp">Canceled</div>
            <div className="count">{countCanceled}</div>
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
              {ele.status === "Canceled" ? (
                <Card
                  isavailable={true}
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
    </div>
  );
};
