import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./user.css";
import { Card } from "../../cards/Card";
import { ProfilePic } from "../../profile-pic/ProfilePic";
export const User = (props) => {
  const [userData, setUserData] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    if (props.userData != null) {
      setUserData(props.userData.users);
      setTicketData(props.userData.tickets);
    }
  }, [props]);

  function countUser(id) {
    var c = 0;
    ticketData?.map((ele) => {
      if (id === ele.userId) {
        c++;
      }
    });
    return c;
  }
  function usersCards(id) {
    const userTicket = ticketData?.filter((ele) => {
      return ele.userId === id;
    });
    return userTicket;
  }
  return (
    <div className="container">
      {userData != null
        ? userData?.map((ele, ind) => (
            <div className="users">
              <div className="main">
                <div className="user-section">
                  <div className="profile-pic">
                    {<ProfilePic name={ele.name} isActive={ele.available} />}
                  </div>
                  <div className="user-name">{ele.name}</div>
                  <div className="count-user-ticket">{countUser(ele.id)}</div>
                </div>
                <div className="menu-add">
                  <div className="add">+</div>
                  <div className="menu">
                    <MoreHorizIcon fontSize="smaller" />
                  </div>
                </div>
              </div>
              <div className="users-card">
                {usersCards(ele.id)?.map((ele) => (
                  <Card
                    isavailable={true}
                    isdot={true}
                    item={ele}
                    userdata={userData}
                    isprofile={false}
                  />
                ))}
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
