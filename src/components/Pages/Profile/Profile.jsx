import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import { CiCamera } from "react-icons/ci";
import ProfileUpdateModal from "../../Modal/ProfileUpdate/ProfileUpdateModal";
import LikedSongs from "../LikedSongs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import MusicCard from "../../fragment/MusicCard";
import CurrentPlayingLarge from "../../fragment/CurrentPlayingLarge";
import FooterMusicPlayer from "../../fragment/FooterMusicPlayer";
import FooterSelectMusic from "../../fragment/FooterSelectMusic";

function Profile() {
  const [value, setValue] = React.useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { playlists, bannerOpen, playing } = useSelector(
    (state) => state.musicReducer
  );
  const [screenSize, setScreenSize] = useState(undefined);
  const [currMusic, setCurrMusic] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const id = userId;
      try {
        const response = await axios.get(
          `http://localhost:3007/api/user/getById/${id}`
        );
        if (response.statusText === "OK") {
          setIsLoading(false);
          setUserData(response.data.data);

          // Set background image if profile cover image exists
          if (response?.data.data.profileCover.profile_url) {
            setBackgroundImage(response?.data?.data?.profileCover?.profile_url);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.put(
        `http://localhost:3007/api/user/update-profile-image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.statusText === "OK") {
        setIsLoading(false);
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleBlueDivClick = () => {
    const fileInput = document.getElementById("handleUploadCoverImage");
    fileInput.click(); // Trigger the file input click event
  };

  const handleUploadCoverImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("profileCoverImage", file);

    try {
      const response = await axios.put(
        `http://localhost:3007/api/user/update-profile-cover/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.statusText === "OK") {
        setIsLoading(false);
        setUserData(response.data.data);
        if (response?.data?.data?.user?.profileCover?.public_id) {
          setBackgroundImage(response.data.data.user.profileCover.public_id);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleBio = async (e) => {
    const bio = e.target.value; // Get the value of the bio text input

    try {
      const response = await axios.put(
        `http://localhost:3007/api/user/update-bio/${userId}`,
        { bio },
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      if (response.statusText === "OK") {
        setIsLoading(false);
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/user/${userId}`;
    navigator.clipboard.writeText(url);
  };

  const filteredLikedSongs = playlists?.filter((song) =>
    song.userId?.includes(userId)
  );

  useEffect(() => {
    setCurrMusic(playing);
  }, [playing]);
  return (
    <div className="profile-container">
      <ProfileUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={userId}
      />
      <div
        className="profile-header"
        style={{
          backgroundImage: `url(${userData?.profileCover?.public_url || backgroundImage
            })`,
        }}
      >
        <div className="profile-content">
          <div className="profile-image">
            {userData?.profileImage?.profile_url ? (
              <img src={userData?.profileImage?.profile_url} />
            ) : (
              <div className="profile-image-holder">
                <h1 style={{ fontSize: "10rem", fontWeight: "bolder" }}>
                  {userData?.name[0]}
                </h1>
              </div>
            )}
            <div className="profile-img-btn">
              <CiCamera />
              <input
                type="file"
                accept="image/*"
                id="update-profile-image"
                onChange={handleUploadProfileImage}
                style={{ display: "none" }}
              />
              <label htmlFor="update-profile-image">Update Image</label>
            </div>
          </div>
          <div className="profile-heading">
            <h1>{userData?.name}</h1>
            <h4>{userData?.email}</h4>
            {/* <div className="bio">
              <h1>{ }</h1>
              <input
                type="text"
                id="textInput"
                accept="text/*"
                onChange={handleBio}
                placeholder="Bio"
              />
            </div> */}
          </div>
        </div>

        <div className="upload-cover-container">
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleUploadCoverImage}
          />
          <label htmlFor="imageInput" className="upload-button">
            Upload Cover
          </label>
        </div>
      </div>
      <div className="menu-section">
        <div className="top-menu">
          <div className="tabs-container">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="My Playlist" value="1" />
                    <Tab label="Liked songs" value="2" />
                  </TabList>
                </Box>

                <TabPanel value="1" style={{ width: "75vw" }}>
                  {" "}
                  <>
                    {filteredLikedSongs.length === 0 ? (
                      <div style={{ color: "red" }}>
                        There are no songs uploaded
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginTop: "15px",
                        }}
                      >
                        {filteredLikedSongs.map((song) => (
                          <MusicCard music={song} />
                        ))}
                      </div>
                    )}
                  </>
                </TabPanel>
                <TabPanel value="2" style={{ width: "85vw" }}>
                  <LikedSongs />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div className="right-side">
            <div className="btn-box">
              <button type="button" onClick={handleOpenModal}>
                Edit
              </button>
              {/* <button type="button" onClick={handleShare}>
                Share
              </button> */}
              {/* <button type="button" onClick={handleShare} style={{ marginLeft: "10px" }}>
                Send Sponsorship
              </button> */}
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
    </div>
  );
}

export default Profile;
