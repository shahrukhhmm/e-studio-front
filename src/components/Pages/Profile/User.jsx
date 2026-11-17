import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import ProfileUpdateModal from "../../Modal/ProfileUpdate/ProfileUpdateModal";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addFollower,
  createRoom,
  removeFollower,
  sendNoti,
} from "../../lib/helper";
import { useSelector } from "react-redux";
import MusicCard from "../../fragment/MusicCard";
import CurrentPlayingLarge from "../../fragment/CurrentPlayingLarge";
import FooterMusicPlayer from "../../fragment/FooterMusicPlayer";
import FooterSelectMusic from "../../fragment/FooterSelectMusic";
import BottomNavigationMobile from "../../fragment/BottomNavigationMobile";
import SponsorshipFormModal from "./Sponsership";
import toast from "react-hot-toast";

function User() {
  const [value, setValue] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSponsorshipModalOpen, setIsSponsorshipModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const location = useLocation();
  const pathParts = location.pathname.split("/user/");
  const userId = pathParts[pathParts.length - 1];
  const currentUserId = localStorage.getItem("userId");
  const [isFollowing, setIsFollowing] = useState(false);
  const { playlists, bannerOpen, playing, user } = useSelector(
    (state) => state.musicReducer
  );
  const [screenSize, setScreenSize] = useState(undefined);
  const [currMusic, setCurrMusic] = useState(null);
  const navigate = useNavigate();

  const sendNotification = async () => {
    const reqData = {
      sender: currentUserId,
      recipient: userId,
      type: "message",
      message: `${user?.name} started following you.`,
    };
    try {
      const res = await sendNoti(reqData);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3007/api/user/getById/${userId}`
      );
      if (response.statusText === "OK") {
        setUserData(response.data.data);
        setBackgroundImage(response.data.data.profileCover?.profile_url);
      }
      if (response.data.data.followers.includes(currentUserId)) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseSponsorshipModal = () => {
    setIsSponsorshipModalOpen(false);
  };

  const addNewFollower = async () => {
    try {
      const requestData = {
        userId: currentUserId,
        followUserId: userId,
      };

      if (!isFollowing) {
        const response = await addFollower(requestData);
        if (response) {
          getUser();
          sendNotification();
        } else {
          console.log("error");
        }
      } else {
        const requestData = {
          userId: currentUserId,
          unfollowUserId: userId,
        };
        const response = await removeFollower(requestData);
        setIsFollowing(false);
        if (response && response.data) {
          getUser();
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const filteredLikedSongs = playlists?.filter((song) =>
    song.userId?.includes(userData?._id)
  );

  useEffect(() => {
    setCurrMusic(playing);
  }, [playing]);

  const chatWithUser = () => {
    window.location.replace(`/chat/${userId}`);
  };

  const handleCreateChat = async () => {
    const requestData = {
      participants: [userId, currentUserId],
      isGroupChat: false,
      groupName: userData?.name,
    };

    try {
      // Check if a chat already exists
      const existingChatResponse = await axios.get(
        `http://localhost:3007/api/chat/user/${userId}`
      );
      const existingChatData = existingChatResponse.data;

      // Filter existing chats to find non-group chats where both users are participants
      const nonGroupChats = existingChatData.filter(
        chat =>
          !chat.isGroupChat &&
          chat.participants.some(participant => participant._id === userId) &&
          chat.participants.some(participant => participant._id === currentUserId)
      );

      if (nonGroupChats.length > 0) {
        // If non-group chat(s) exist, navigate to the first one found
        navigate(`/chat-room/${nonGroupChats[0]._id}`, { replace: true });
      } else {
        // No existing non-group chat found, create a new chat room
        const response = await createRoom(requestData);

        if (response) {
          navigate(`/chat-room/${response._id}`, { replace: true });
        } else {
          console.log("Error creating room");
        }
      }
    } catch (error) {
      console.error("Error checking for existing chat or creating new chat:", error);
    }
  };


  const sendSponsorshipNotification = async (message) => {
    const reqData = {
      sender: currentUserId,
      recipient: userId,
      type: "message",
      message,
    };
    try {
      const res = await sendNoti(reqData);
      if (res) {
        toast.success("Sponsorship Sent Successfully");
        setIsSponsorshipModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(userData);
  return (
    <div className="profile-container">
      <ProfileUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={userId}
      />
      <SponsorshipFormModal
        isOpen={isSponsorshipModalOpen}
        onClose={handleCloseSponsorshipModal}
        onSend={sendSponsorshipNotification}
      />
      <div
        className="profile-header"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="profile-content">
          <div className="profile-image">
            {userData?.profileImage?.profile_url ? (
              <img src={userData.profileImage.profile_url} alt="Profile" />
            ) : (
              <div className="profile-image-holder">
                <h1 style={{ fontSize: "10rem", fontWeight: "bolder" }}>
                  {userData?.name?.charAt(0)}
                </h1>
              </div>
            )}
          </div>
          <div className="profile-heading">
            <h1>{userData?.name}</h1>
            <h4>{userData?.email}</h4>
          </div>
        </div>
      </div>
      <div className="menu-section">
        <div className="top-menu">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="profile tabs">
                  <Tab label="UPLOADED SONGS" value="1" />
                </TabList>
              </Box>
              <TabPanel value="1" >
                <div>
                  <section className={"home-music-container"}>
                    <div className="main-home" >
                      {filteredLikedSongs.length === 0 ? (
                        <div style={{ color: "red" }}>
                          There are no songs uploaded
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {filteredLikedSongs.map((song) => (
                            <MusicCard key={song._id} music={song} />
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </TabPanel>
              <div>
                {bannerOpen && (
                  <section className="current-large-banner">
                    <CurrentPlayingLarge />
                  </section>
                )}
                {currMusic ? (
                  <FooterMusicPlayer music={currMusic} />
                ) : (
                  <FooterSelectMusic />
                )}
              </div>
            </TabContext>
          </Box>
          <div className="right-side">
            <div className="btn-box" style={{ display: "flex", gap: "20px" }}>
              <button type="button" onClick={addNewFollower}>
                {isFollowing ? "UnFollow" : "Follow"}
              </button>
              <button type="button" onClick={handleCreateChat}>
                Chat
              </button>
              <button
                type="button"
                onClick={() => setIsSponsorshipModalOpen(true)}
              >
                Sponsorship
              </button>
            </div>
            <div className="following-box">
              <div>
                <span>Follower</span>
                <span>{userData?.followers?.length}</span>
              </div>
              <div>
                <span>Following</span>
                <span>{userData?.following?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
