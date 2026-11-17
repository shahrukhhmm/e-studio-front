// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const CategorySong = () => {
//     const { category } = useParams();
//     const [songs, setSongs] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSongs = async () => {
//             try {
//                 // console.log(category)
//                 const response = await axios.get(`http://localhost:3007/api/song/getByCategory/${category}`);
//             //    console.log(response.songs)
//                 setSongs(response.data.songs);
//                 setError(null);
//             } catch (error) {
//                 setError('Error fetching songs. Please try again later.');
//                 console.error('Error fetching songs:', error);
//             }
//         };

//         fetchSongs();
//     }, [category]);

//     return (
//         <div className="song-card-container">
//             <h2>Songs in {category}</h2>
//             {error && <div className="error">{error}</div>}
//             <div className="songs">
//                 {songs.length === 0 ? (
//                     <div>No songs available in {category} category.</div>
//                 ) : (
//                     songs.map((song) => (
//                         <div key={song._id} className="song-card">
//                             {/* {console.log(song._id)} */}
//                             <img src={`http://localhost:3007/api/song/getThumbnails/${song._id}`} alt="Song Thumbnail" />
//                             {/* <img src={``} alt="Song Thumbnail" /> */}
//                             <div className="song-info">
//                                 <h3>{song.songName}</h3>
//                                 <p>{song.singerName}</p>
//                                 <audio controls>
//                                     <source src={`http://localhost:3007/api/song/getAudio/${song._id}`} type="audio/mpeg" />
//                                     Your browser does not support the audio element.
//                                 </audio>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategorySong;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import MusicCard from "./MusicCard";
import { Skeleton } from "@mui/material";
import MobileTopNavigation from "./MobileTopNavigation";
import { Navigation, Search } from "@material-ui/icons";
import CurrentPlayingLarge from "./CurrentPlayingLarge";
import SideBar from "./SideBar";
import FooterMusicPlayer from "./FooterMusicPlayer";
import FooterSelectMusic from "./FooterSelectMusic";
import BottomNavigationMobile from "./BottomNavigationMobile";
import MusicCardLikedContainer from "./MusicCardLikedContainer";
import Profile from "../Pages/Profile/Profile";
import About from "../Pages/About";
import Playlist from "./Playlist";
import AddMusic from "../fragment/AddSong";
import MusicCardContainer from "../fragment/MusicCardHomeContainer";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../api/Theme";

function getCurrPage(pathName) {
  switch (pathName) {
    case "/home":
      return <MusicCardContainer />;
    case "/likedsongs":
      return <MusicCardLikedContainer />;
    case "/search":
      return <Search />;
    case "/profile":
      return <Profile />;
    case "/add":
      return <AddMusic />;
    case "/about":
      return <About />;
    default:
      if (pathName.startsWith("/playlist")) {
        return <Playlist />;
      }
      return null;
  }
}

const CategorySong = () => {
  const { category } = useParams();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const { playing, bannerOpen } = useSelector((state) => state.musicReducer);
  const useStyle = useContext(ThemeContext);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currMusic, setCurrMusic] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [Page, setCurrPage] = useState(<MusicCardContainer />);

  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3007/api/song/getByCategory/${category}`
        );
        setSongs(response.data.songs);
        setError(null);
      } catch (error) {
        setError("Error fetching songs. Please try again later.");
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [category]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrMusic(playing);
  }, [playing]);

  return (
    <div style={useStyle.component} className="home-container">
      {!loaded ? (
        <div className="Home-skeleton">
          <Skeleton animation="wave" variant="rect" height="100vh" />
        </div>
      ) : (
        <>
          {/* // {screenSize <= 970 ? <MobileTopNavigation /> : <Navigation />} */}
          <section className="home-music-container">
            <div className="sidebar-home">
              <SideBar />
            </div>
            <div className="main-all-songs">
              {songs.length === 0 ? (
                <div>No songs available in {category} category.</div>
              ) : (
                songs.map((song) => <MusicCard music={song} />)
              )}
            </div>
          </section>
          {bannerOpen && (
            <section className="current-large-banner">
              <CurrentPlayingLarge />
            </section>
          )}
          <React.Fragment>
            {currMusic ? (
              <FooterMusicPlayer music={currMusic} />
            ) : (
              <FooterSelectMusic />
            )}
            {screenSize <= 970 && <BottomNavigationMobile />}
          </React.Fragment>
        </>
      )}
    </div>
  );
};

export default CategorySong;
