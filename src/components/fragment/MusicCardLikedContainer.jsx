import React from "react"
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from "./MusicCard";
import {useSelector} from "react-redux";
import Container from "./Container";

function MusicCardLikedContainer({likedSongs}) {

    const {playlists} = useSelector(state => state.musicReducer);
    // console.log(likedSongs)
    return (
        <Container>
            <div className={"music-card-container"}>
                {
                    likedSongs.map(item => (
                        <MusicCard key={item.id} music={item}/>
                    ))
                }
            </div>
        </Container>
    );
}

export default MusicCardLikedContainer;
