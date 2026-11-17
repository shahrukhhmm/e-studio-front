import React, { useContext, useState, useEffect } from "react";
import "../assets/scss/Navigation.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DropDownLanguageList from "./DropDownLanguageList";
import SearchBar from "./SearchBar";
import Brand from "./Brand";
import DropDownProfile from "./DropDownProfile";
import { Avatar, Button, Badge } from "@material-ui/core";
import { ThemeContext } from "../../api/Theme";
import { useNavigate } from "react-router-dom";
import NotificationsActiveOutlined from "@material-ui/icons/NotificationsActiveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions/actions";
import { getNot } from "../lib/helper";
import NotificationPopup from "./NotificationPopup"; // Import the new component

function Navigation() {
  const [messagesData, setMessageData] = useState([]);
  const [isLanguageListOpen, setLangList] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isMessagesOpen, setMessagesOpen] = useState(false);
  const [messages, setMessages] = useState(messagesData);
  const [replies, setReplies] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null); // State for selected notification
  const [isNotificationOpen, setNotificationOpen] = useState(false); // State for popup visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = localStorage.getItem("login");

  useEffect(() => {
    setUnreadCount(messages.filter((message) => message.unread).length);
  }, [messages]);

  function handleOpenLanguageList() {
    if (isOpenProfile) setOpenProfile(false);
    setLangList(!isLanguageListOpen);
  }

  function handleOpenProfile() {
    if (isLanguageListOpen) setLangList(false);
    setOpenProfile(!isOpenProfile);
  }

  function handleOpenMessages() {
    if (isLanguageListOpen) setLangList(false);
    if (isOpenProfile) setOpenProfile(false);
    setMessagesOpen(!isMessagesOpen);
    if (!isMessagesOpen) {
      setMessages(messages.map((msg) => ({ ...msg, unread: false })));
    }
  }

  const handleReplyChange = (id, text) => {
    setReplies({ ...replies, [id]: text });
  };

  const handleSendReply = (id) => {
    console.log(`Reply to message ${id}: ${replies[id]}`);
    setReplies({ ...replies, [id]: "" }); // Clear the input after sending
  };

  const useStyle = useContext(ThemeContext);

  const handleLogout = async () => {
    localStorage.removeItem("login");
    window.localStorage.clear();
    navigate("/signin");
  };

  const { user } = useSelector((state) => state?.musicReducer);

  const getNoti = async () => {
    try {
      const res = await getNot(user?._id);
      if (res) {
        setMessageData(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getNoti();
    }, 10000); // 10 seconds in milliseconds

    return () => clearInterval(interval);
  }, [!isOpenProfile]); // Runs once on mount

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
    setSelectedNotification(null);
  };

  return (
    <nav style={useStyle.component}>
      <Brand />
      <div className="navigation">
        {/* Navigation buttons can be added here */}
      </div>
      <SearchBar />
      <div className="language" onClick={handleOpenLanguageList}>
        <Button
          className="Dropdown-btn"
          endIcon={isLanguageListOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        >
          <div className="wrapper">
            <p>Music Languages</p>
          </div>
        </Button>
      </div>
      <div>
        {login ? (
          <Button className="Dropdown-btn" onClick={handleLogout}>
            <div className="wrapper">
              <p>Logout</p>
            </div>
          </Button>
        ) : (
          <Button
            className="Dropdown-btn"
            onClick={() => {
              if (!user) {
                navigate("/signin");
              } else {
                dispatch(setUser(null));
                localStorage.removeItem("user");
              }
            }}
          >
            <div className="wrapper">
              <p>{user ? "Sign out" : "Sign In"}</p>
            </div>
          </Button>
        )}
        {isLanguageListOpen && <DropDownLanguageList />}
      </div>
      {user && (
        <div className="messages" onClick={handleOpenMessages}>
          <Badge badgeContent={unreadCount} color="secondary">
            <Button
              className="Dropdown-btn"
              startIcon={<NotificationsActiveOutlined />}
            ></Button>
          </Badge>
          {isMessagesOpen && (
            <div
              className="dropdown-content"
              style={{ height: "300px", overflow: "scroll" }}
            >
              {messagesData.map((message) => (
                <div
                  key={message._id}
                  className="message"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <p>
                    <strong>{message?.sender?.name}:</strong> {message?.message}
                  </p>
                  <button onClick={() => handleViewNotification(message)}>
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {user && (
        <div className="profile" onClick={handleOpenProfile}>
          <Button
            className="Dropdown-btn"
            startIcon={
              <Avatar
                style={{ width: "30px", height: "30px", padding: "18px" }}
              >
                {user?.name?.slice(0, 1)}
              </Avatar>
            }
            endIcon={isOpenProfile ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          ></Button>
          {isOpenProfile && <DropDownProfile />}
        </div>
      )}
      {selectedNotification && (
        <NotificationPopup
          open={isNotificationOpen}
          handleClose={handleCloseNotification}
          notification={selectedNotification}
        />
      )}
    </nav>
  );
}

export default Navigation;
