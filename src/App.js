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
  const [view, setView] = useState(0);
  const [ordering, setOrdering] = useState(0);
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
      fetchData();
    }
  }, [isDataFetched]);

  useEffect(() => {
    if (userData != null) {
      let sortedUsers = [...userData.tickets];

      if (ordering === 1) {
        sortedUsers = sortBasedOnPriority(sortedUsers);
      } else if (ordering === 0) {
        sortedUsers = sortBasedOnTitle(sortedUsers);
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        tickets: sortedUsers,
      }));
    }
  }, [ordering]);

  function sortBasedOnTitle(users) {
    return users.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  function sortBasedOnPriority(users) {
    return users.slice().sort((a, b) => a.priority - b.priority);
  }

  const handleChangeGroup = (e) => {
    if (e.target.value === "status") {
      setView(0);
    } else if (e.target.value === "user") {
      setView(1);
    } else if (e.target.value === "priority") {
      setView(2);
    }
  };

  const handleChangeOrder = (e) => {
    if (e.target.value === "priority") {
      setOrdering(0);
    } else if (e.target.value === "title") {
      setOrdering(1);
    }
  };

  function renderGroupContent() {
    if (view === 0) {
      return <Status userData={userData} />;
    } else if (view === 1) {
      return <User userData={userData} />;
    } else {
      return <Priority userData={userData} />;
    }
  }
  useEffect(() => {
    const savedUserData = JSON.parse(sessionStorage.getItem("userData"));
    if (savedUserData !== null) {
      setUserData(savedUserData);
    }
    const savedOrdering = sessionStorage.getItem("ordering");
    const savedView = sessionStorage.getItem("view");
    if (savedOrdering !== null) {
      setOrdering(parseInt(savedOrdering));
    }
    if (savedView !== null) {
      setView(parseInt(savedView));
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("ordering", ordering.toString());
    sessionStorage.setItem("view", view.toString());
    sessionStorage.setItem("userData", JSON.stringify(userData));
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
