import React, { useEffect, useState } from "react";
import "../assets/scss/MusicCard.scss";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { useDispatch, useSelector } from "react-redux";
import { increaseTimesPlayed, setCurrentPlaying } from "../../actions/actions";
import Name from "./Name";
import { Skeleton } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

function MusicCard(props) {
  const { name, img, author_name } = props.music;
  const [isHovered, setHovered] = useState(false);
  const user = useSelector((state) => state?.musicReducer?.user);


  function handleResponse() {
    setHovered(!isHovered);
  }

  const dispatch = useDispatch();

  function handlePlay() {
    dispatch(setCurrentPlaying(props.music));
    dispatch(increaseTimesPlayed(props.music.id));
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={"music-card"}>
      {!loaded ? (
        <div className={"Skeleton-top"}>
          <Skeleton variant="rect" width={210} height={210} />
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </div>
      ) : (
        <>
          <div
            onClick={handlePlay}
            className={"music-card-cover"}
            onMouseOver={handleResponse}
          >
            <img src={img} alt={name} />
            <div className="play-circle">
              <PlayCircleFilledWhiteIcon />
            </div>
          </div>
          <React.Fragment>
            <Name name={name} className={"song-name"} length={name.length} />
            <Name
              name={author_name}
              className={"author-name"}
              length={author_name.length}
            />
            <Link to={user ? `/user/${props?.music?.userId}` : "/signin"}>
              View Profile
            </Link>
            {/* <Link to={`/user/${props?.music?.userId}`}>View Profile</Link> */}
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default MusicCard;