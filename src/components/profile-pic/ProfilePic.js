import React from "react";
import "./profile-pic.css";

export const ProfilePic = (props) => {
  const getInitials = (fullName) => {
    if (!fullName) {
      return "";
    }
    const words = fullName.split(" ");

    let initials = "";

    for (let i = 0; i < words.length; i++) {
      if (words[i]) {
        initials += words[i][0].toUpperCase();
      }
    }

    return initials;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    const getBrightness = (hexColor) => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return (r * 299 + g * 587 + b * 114) / 1000;
    };
    do {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (getBrightness(color) > 100);

    return color;
  };
  const randomColor = getRandomColor();

  const style = {
    backgroundColor: randomColor,
    width: "1.5em",
    height: "1.5em",
    textAlign: "center",
    lineHeight: "2vh",
    fontSize: "14px",
    color: "#fff",
    marginTop: "5px",
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      <div className="user-pic">
        <div style={style}>{getInitials(props?.name)}</div>
        <span
          className={`status-dot ${props?.isActive ? "active" : "non-active"}`}
        ></span>
      </div>
    </div>
  );
};
