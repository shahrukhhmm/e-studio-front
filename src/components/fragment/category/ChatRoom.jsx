import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  deleteChat,
  getChat,
  getMeetingURL,
  sendMessage,
} from "../../lib/helper";
import SongTogether from "./SongTogether";
import Recorder from "recorder-js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../lib/firebase.config";

const ChatRoom = () => {
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

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [loader, setLoader] = useState(false);
  const recorder = useRef(null);
  const audioContext = useRef(null);

  const startRecording = async () => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    recorder.current = new Recorder(audioContext.current);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder.current.init(stream);
    recorder.current.start();
    setRecording(true);
  };

  const stopRecording = async () => {
    try {
      const { blob } = await recorder.current.stop();
      const audioFile = new File([blob], "recording.wav", {
        type: "audio/wav",
      });
      setLoader(true);

      // Upload to Firebase
      const storageRef = ref(storage, `recordings/${audioFile.name}`);
      await uploadBytes(storageRef, audioFile);
      const url = await getDownloadURL(storageRef);
      setAudioURL(url);

      // Use the URL to send the message
      const requestData = {
        chatId: groupId,
        sender: id,
        content: url, // Use the fetched URL here
        type: "text",
      };

      // Add logic to send the message to the chat here
      const response = await sendMessage(requestData);

      if (response) {
        setMessage("");
        setSend(false);
        setRecording(false);
        getUserChat(); // Refresh the chat after sending a message
        setLoader(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Reset the loader and recording state in case of an error
      setRecording(false);
      setLoader(false);
    }
  };

  const joinMeeting = async () => {
    try {
      const url = await getMeetingURL(groupId);
      window.open(url, "_blank");
    } catch (err) {
      alert("No URL available at the moment");
    }
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
              {groupData?.isGroupChat ? "Leave Group" : "Leave Chat"}
            </button>
            <Link to="/home" className="home-button">
              Back to Home
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
                  className={`message ${msg?.sender?._id === id ? "sent" : "received"
                    }`}
                >
                  <h3>{msg?.sender?.name}</h3>
                  {msg.content.includes("firebasestorage.googleapis.com") ? (
                    <audio controls>
                      <source src={msg.content} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p>{msg.content}</p>
                  )}
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

            {groupData?.isGroupChat && (
              <button style={{ margin: "0 10px" }} onClick={handlepop}>
                Create Song Together
              </button>
            )}
            <button
              style={{ margin: "0 10px" }}
              onClick={recording ? stopRecording : startRecording}
              disabled={loader}
            >
              {recording
                ? "Stop Recording"
                : loader
                  ? "Loading"
                  : "Start Recording"}
            </button>
            <button onClick={joinMeeting}>Join Meeting</button>
          </div>
        </div>
      </div>
      {isCommentBoxOpen && (
        <SongTogether onClose={handlepopclose} group={groupData?.groupName} />
      )}
    </>
  );
};

export default ChatRoom;
