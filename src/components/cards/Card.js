import React, { useEffect, useState } from "react";
import "./card.css";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecord";
import { ProfilePic } from "../profile-pic/ProfilePic";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
export const Card = (props) => {
  const [available, __setAvailability] = useState(props?.isavailable);
  const [ticketData, __setTicketData] = useState(props?.item);
  const [userData, __setUserData] = useState(props?.userdata);
  const [isProfile, __setIsProfile] = useState(props?.isprofile);
  const [tags, __setTags] = useState(props?.item?.tag);
  const [isDot, __setIsDot] = useState(props?.isdot);
  const [userName, setUserName] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    isUserAvailable();
  }, [props]);

  const isUserAvailable = () => {
    userData.forEach((element) => {
      if (ticketData.userId === element.id) {
        setUserName(element.name);
        setIsActive(element.available);
      }
    });
  };

  return (
    <div>
      <div className="card">
        <div className="header">
          <div className="id">{props.item?.id} </div>
          <span className="profile-pic">
            {" "}
            {isProfile === true ? (
              <ProfilePic name={userName} isActive={isActive} />
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="title">
          {isDot === true ? (
            <span className="dot">
              <CircleOutlinedIcon fontSize="smaller" />
            </span>
          ) : (
            ""
          )}
          {props.item?.title}
        </div>
        <div className="footer">
          {available === true ? (
            <div className="available">
              <SignalCellularAltIcon />
            </div>
          ) : (
            ""
          )}
          <div className="tags">
            {tags.map((ele) => (
              <span className="dot">
                <FiberManualRecordSharpIcon
                  fontSize="small"
                  style={{ color: "#bec2c8" }}
                />
                <span className="tag">{ele}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
