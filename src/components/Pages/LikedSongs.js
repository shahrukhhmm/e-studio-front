import React, { useContext, useEffect, useState } from "react";
import './css/Home.scss';
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
import MusicCardLikedContainer from "../fragment/MusicCardLikedContainer";
import { Box } from "@material-ui/core";
import MusicCard from "../fragment/MusicCard";

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

function LikedSongs() {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currMusic, setCurrMusic] = useState(null);
    const [Page, setCurrPage] = useState(<MusicCardContainer />);
    const [loaded, setLoaded] = useState(false);
    const { user, playlists } = useSelector((state) => state.musicReducer);

    let pathname = window.location.pathname;

    useEffect(() => {
        setCurrPage(getCurrPage(pathname));
    }, [pathname]);

    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const useStyle = useContext(ThemeContext);
    const { playing, bannerOpen } = useSelector((state) => state.musicReducer);

    useEffect(() => {
        setCurrMusic(playing);
    }, [playing]);

    useEffect(() => {
        setLoaded(true);
    }, []);


    // Ensure playlist is an array and user is defined
    const filteredLikedSongs = playlists?.filter(song => song.likes?.includes(user?._id));
    // console.log(filteredLikedSongs)

    return (
        <>
            <div>
                <section className={"home-music-container"}>

                    <div className="main-home">
                        {filteredLikedSongs.length === 0 ? (
                            <div style={{ color: "red" }}>
                                There are no songs liked
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {filteredLikedSongs.map((song) => (
                                    <MusicCard music={song} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>


            </div>
        </>
    )

}

export default LikedSongs;
