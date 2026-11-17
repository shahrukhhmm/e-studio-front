import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deleteChat, getChat, sendMessage } from "../../lib/helper";
import SongTogether from "./SongTogether";

const SingleChat = () => {
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);
  const [groupData, setGroupData] = useState({
    groupName: "",
    participants: [],
    messages: [],
  });
  const id = useSelector((state) => state?.musicReducer?.user?._id);
  const query = useLocation();
  const groupId = query.pathname.substring(query.pathname.lastIndexOf("/") + 1);
  const selectedUsers = useSelector(
    (state) => state.musicReducer.selectedUsers
  );

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const getUserChat = async () => {
    const response = await getChat(groupId);
    if (response) {
      setGroupData(response);
      console.log(groupId)
    } else {
      console.log("error fetching chat");
    }
  };

  const deleteUserChat = async (groupId) => {
    try {
      console.log(`Initiating request to delete chat with ID: ${groupId}`);
      const response = await deleteChat(groupId);
      console.log("Response received:", response);

      if (response) {
        window.location.replace("/home");
        console.log("Chat deleted successfully");
      } else {
        console.error(
          `Failed to delete chat: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserChat();
  }, [send]);

  useEffect(() => {
    getUserChat();
    console.log("initial")
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setSend(true);
      const requestData = {
        chatId: groupId,
        sender: id,
        content: message,
        type: "text",
      };
      // Add logic to send the message to the chat here
      const response = await sendMessage(requestData);
      if (response) {
        setMessage("");
        setSend(false);
        getUserChat(); // Refresh the chat after sending a message
      } else {
        console.log("error sending message");
      }
      // Clear the input after sending the message
    }
  };
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  const handlepop = () => {
    setIsCommentBoxOpen(true);
  };
  const handlepopclose = () => {
    setIsCommentBoxOpen(false);
  };
  return (
    <>
      <div className="chat-room-container">
        <div className="chat-sidebar">
          <h2>{groupData?.groupName}</h2>
          <div className="chat-actions">
            <button
              className="leave-button"
              onClick={() => deleteUserChat(groupId)}
            >
              Leave Group
            </button>
            <Link to="/home" className="home-button">
              Home Page
            </Link>
          </div>
          {groupData?.participants?.length > 0 ? (
            groupData.participants.map((user, index) => (
              <div key={index} className="chat-user">
                <div className="user-avatar">
                  <img
                    alt="user avatar"
                    src={`https://dummyimage.com/84x84&text=${user.name.charAt(
                      0
                    )}`}
                  />
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>No participants</p>
          )}
        </div>
        <div className="chat-box">
          <div className="chat-box-messages">
            {groupData?.messages?.length > 0 ? (
              groupData.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg?.sender?._id === id ? "sent" : "received"
                  }`}
                >
                  <h3>{msg?.sender?.name}</h3>
                  <p>{msg.content}</p>
                </div>
              ))
            ) : (
              <p>No messages</p>
            )}
          </div>
          <div className="chat-box-input">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={handleMessageChange}
            />
            <button onClick={handleSendMessage}>Send</button>
            <button style={{ margin: "0 10px" }} onClick={handlepop}>
              Create Song Together
            </button>
          </div>
        </div>
      </div>
      {isCommentBoxOpen && (
        <SongTogether onClose={handlepopclose} group={groupData?.groupName} />
      )}
    </>
  );
};

export default SingleChat;
