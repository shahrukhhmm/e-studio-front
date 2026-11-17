import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/Home.scss";
import Navigation from "../fragment/Navigation";
import MobileTopNavigation from "../fragment/MobileTopNavigation";
import SideBar from "../fragment/SideBar";
import FooterMusicPlayer from "../fragment/FooterMusicPlayer";
import BottomNavigationMobile from "../fragment/BottomNavigationMobile";
import MusicCardContainer from "../fragment/MusicCardHomeContainer";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../api/Theme";
import Profile from "./Profile/Profile";
import AddMusic from "../fragment/AddSong";
import FooterSelectMusic from "../fragment/FooterSelectMusic";
import CurrentPlayingLarge from "../fragment/CurrentPlayingLarge";
import Search from "./Search";
import About from "./About";
import Playlist from "../fragment/Playlist";
import { Skeleton } from "@material-ui/lab";
import MusicCard from "../fragment/MusicCard";

function getCurrPage(pathName) {
  switch (pathName) {
    case "/home":
      return <MusicCardContainer />;
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

function Home() {
  const location = useLocation();
  const [screenSize, setScreenSize] = useState(undefined);
  const [currMusic, setCurrMusic] = useState(null);
  const [Page, setCurrPage] = useState(<MusicCardContainer />);
  const [isSearching, setIsSearching] = useState(false); // New state variable for search
  const { playlists, filteredPlaylists } = useSelector((state) => state.musicReducer);
  const [loaded,setLoaded] = useState(false)
  let pathname = window.location.pathname;

  useEffect(() => {
    setCurrPage(getCurrPage(pathname));
  }, [pathname]);

  window.addEventListener("resize", handleResize);

  function handleResize() {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const useStyle = useContext(ThemeContext);
  const { playing, bannerOpen } = useSelector((state) => state.musicReducer);

  useEffect(() => {
    setCurrMusic(playing);
  }, [playing]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const routeSongId = params.get("routeSongId");
    if (routeSongId) {
      const song = playlists.find((item) => item._id === routeSongId);
      if (song) {
        setCurrMusic(song);
      }
    }
  }, [location.search, playlists]);

  useEffect(() => {
    setIsSearching(filteredPlaylists.length > 0);
  }, [filteredPlaylists]);

  const displayedPlaylists = isSearching ? filteredPlaylists : playlists.filter((item) => item.individual === false || item.individual === undefined);

  return (
    <div style={useStyle.component} className={"home-container"}>
      {!loaded ? (
        <div className="Home-skeleton">
          <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
        </div>
      ) : (
        <>
          {screenSize <= 970 ? <MobileTopNavigation /> : <Navigation />}
          <section className={"home-music-container"}>
            <div className="sidebar-home">
              <SideBar />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }} className="main-home">
              {displayedPlaylists.map((item) => (
                <MusicCard key={item._id} music={item} />
              ))}
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
}

export default Home;
