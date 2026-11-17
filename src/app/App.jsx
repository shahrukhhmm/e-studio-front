import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { setPlaylist, setUser } from "../actions/actions";
import { ThemeContext, themes } from "../api/Theme";
import ChatComponent from "../components/ChatComponent";
import About from "../components/Pages/About";

import LikedSongs from "../components/Pages/LikedSongs";
import Login from "../components/Pages/Login";
import PremiumSongs from "../components/Pages/PremiumSongs";
import Profile from "../components/Pages/Profile/Profile";
import Search from "../components/Pages/Search";
import SigninForm from "../components/Pages/SignForm/SigninForm";
import SignupForm from "../components/Pages/SignForm/SignupForm";
import AllSong from "../components/fragment/AllSong";
import CategorySong from "../components/fragment/CategorySong";
// import Newsongs from "../components/fragment/Newsongs";
import Premium from "../components/fragment/Premium";
import musicDB from "../db/music";
import "./App.scss";
import Home from "../components/Pages/Home";
import ChatRoom from "../components/fragment/category/ChatRoom";
import CategorySelector from "../components/fragment/category/CategorySelector";
import Upload from "../components/fragment/category/Upload";
import { getAllSongs } from "../components/lib/helper";
import User from "../components/Pages/Profile/User";
import AllSongs from "../components/Pages/AllSongs";
import SingleChat from "../components/fragment/category/SingleChat";

const App = () => {
  const { language, fetched } = useSelector((state) => state.musicReducer);
  const [allSongs, setAllSongs] = useState([]);
  const dispatch = useDispatch();

  const getSongs = async () => {
    const response = await getAllSongs();
    if (response) {
      setAllSongs(response.songs);
      dispatch(setPlaylist(response.songs));
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  useEffect(() => {
    if (language === null || language.includes("any")) {
      dispatch(setPlaylist(allSongs));
    } else if (language.includes("hindi")) {
      alert("No hindi tracks available");
    } else {
      let x = allSongs.filter(
        (item) => item.lang && language.includes(item.lang.toLowerCase())
      );
      dispatch(setPlaylist(x));
    }
  }, [dispatch, language, allSongs]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <ThemeContext.Provider value={themes.light}>
      <Toaster />
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/chat-room/:id" element={<ChatRoom />} />
            <Route path="/chat/:id" element={<SingleChat />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/rooms" element={<CategorySelector />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/home/:id" element={<Home />} /> */}
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/uploadedsongs" element={<AllSongs />} />
            {/* <Route path="/addmusic" element={<AddMusic />} /> */}
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/premiumplans" element={<Premium />} />
            <Route path="/home/profile" element={<Profile />} />
            <Route path="/likedsongs" element={<LikedSongs />} />
            <Route path="/premiumsongs" element={<PremiumSongs />} />
            <Route path="/:category" element={<CategorySong />} />
            {/* <Route path="/newsongs" element={<Newsongs />} /> */}

            {/* <Route path="/uploadedsongs" element={MyUploadedSongs} /> */}
            {/* <Route path="/uploadedsongs" element={AllSong} /> */}
            {/* <Route path="/:category" element={<CategorySong} /> */}
            {/* <Route path="/uploadedsongs" element={<AllSong />} /> */}
          </Routes>
        </Router>
      </>
    </ThemeContext.Provider>
  );
};

export default App;
