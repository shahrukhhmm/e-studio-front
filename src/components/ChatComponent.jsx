import React, { useState } from "react";
import "./assets/scss/ChatRoom.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUsers, setSelectedRoomName, toggleUserSelection } from "../actions/actions";
import Users from "./fragment/category/Users";
import toast, { Toaster } from "react-hot-toast";
import { createRoom } from "./lib/helper";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const [chatRoomName, setChatRoomName] = useState("");

  const id = useSelector((state) => state?.musicReducer?.user?._id);
  const { selectedUsers } = useSelector((state) => state.musicReducer);
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Select at least one user!");
      return;
    }
    if (!chatRoomName) {
      toast.error("Enter room name!");

      return;
    }
    const selectedUserIds = selectedUsers.map((user) => user._id);

    const requestData = {
      participants: [...selectedUserIds, id],
      isGroupChat: true,
      groupName: chatRoomName,
    };
    const response = await createRoom(requestData);

    if (response.isGroupChat) {
      dispatch(setSelectedRoomName(response?.groupName)); // Dispatch action to set room name
      navigate(`/chat-room/${response?._id}`, { replace: true });
      dispatch(clearSelectedUsers()); // Dispatch action to clear selected users
    } else {
      console.log("error creating room");
    }
  };

  const handleToggleUserSelection = (user) => {
    dispatch(toggleUserSelection(user, chatRoomName));
  };

  const selectedUsersCount = selectedUsers?.length;

  return (
    <>
      <div className="chat-room">
        <div className="room-name-input">
          <input
            type="text"
            placeholder="Enter your Band Name"
            value={chatRoomName}
            onChange={(e) => setChatRoomName(e.target.value)}
          />
          <button onClick={handleCreateChat} className="create-chat-button">
            Create
          </button>
        </div>

        <Users handleToggleUserSelection={handleToggleUserSelection} />

        {selectedUsersCount > 0 && (
          <div className="selected-users-info">
            <p>
              {selectedUsersCount} {selectedUsersCount === 1 ? "user" : "users"}{" "}
              selected
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
