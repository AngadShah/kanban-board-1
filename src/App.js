import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Status } from "./components/board/by-status/Status";
import { User } from "./components/board/by-user/User";
import { Priority } from "./components/board/by-priority/Priority";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function App() {
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [view, setView] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.matches(".select")
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setUserData(json);
        setIsDataFetched(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isDataFetched) {
      fetchData().then(() => {
        const savedUserData = JSON.parse(localStorage.getItem("userData"));
        if (savedUserData !== null) {
          setUserData(savedUserData);
        }
        const savedOrdering = localStorage.getItem("ordering");
        const savedView = localStorage.getItem("view");
        if (savedOrdering !== null) {
          setOrdering(savedOrdering);
        }
        if (savedView !== null) {
          setView(savedView);
        }
      });
    }
  }, [isDataFetched]);

  useEffect(() => {
    if (userData != null) {
      let sortedUsers = [...userData.tickets];

      if (ordering === "priority") {
        sortedUsers.sort((a, b) => a.priority - b.priority);
      } else if (ordering === "title") {
        sortedUsers.sort((a, b) => a.title.localeCompare(b.title));
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        tickets: sortedUsers,
      }));
    }
  }, [ordering]);

  const handleChangeGroup = (e) => {
    setView(e.target.value);
  };

  const handleChangeOrder = (e) => {
    setOrdering(e.target.value);
  };

  function renderGroupContent() {
    if (view === "status") {
      return <Status userData={userData} />;
    } else if (view === "user") {
      return <User userData={userData} />;
    } else {
      return <Priority userData={userData} />;
    }
  }

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
    localStorage.setItem("view", view);
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [ordering, view, userData]);

  return (
    <div className="App">
      <div className="nav-bar">
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropbtn">
            <span className="menu-icon">
              <MenuIcon fontSize="smaller" />
            </span>{" "}
            Display
            <span className="down-arrow">
              <ArrowDropDownIcon fontSize="small" />
            </span>
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}
          >
            <div>
              <span className="group">Grouping</span>
              <span>
                <select
                  name="groupBy"
                  className="select"
                  onChange={(e) => handleChangeGroup(e)}
                  value={view}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </span>
            </div>
            <div>
              <span className="order">Ordering</span>
              <span>
                <select
                  name="groupBy"
                  className="select"
                  onChange={(e) => handleChangeOrder(e)}
                  value={ordering}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="components">{renderGroupContent()}</div>
    </div>
  );
}

export default App;
