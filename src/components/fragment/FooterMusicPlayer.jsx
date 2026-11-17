import React, { useContext, useEffect, useRef, useState } from "react";
import "../assets/scss/FooterPlayer.scss";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Slider from "@material-ui/core/Slider";
import { Avatar, IconButton, InputBase, Snackbar } from "@material-ui/core";
import ControlsToggleButton from "./ControlsToggleButton";
import Name from "./Name";
import { ThemeContext } from "../../api/Theme";
import { useDispatch, useSelector } from "react-redux";
import {
  setBannerOpen,
  setCurrentPlaying,
  setLike,
} from "../../actions/actions";
import Button from "@material-ui/core/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addLike, removeLike, sendNoti } from "../lib/helper";
import CommentPopup from "./category/CommentPopup";

function FooterMusicPlayer({ music }) {
  const [{ _id, id, userId, name, author_name, img, musicName }, setCurrTrack] =
    useState(music);
  const [isRepeatClicked, setRepeatClick] = useState(false);
  const [isPrevClicked, setPrevClicked] = useState(false);
  const [isNextClicked, setNextClicked] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isVolumeClicked, setVolumeClicked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [bannerToggle, setBannerToggle] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const audioElement = useRef();
  const dispatch = useDispatch();
  const { playlists, likedSongs } = useSelector((state) => state.musicReducer); // Get likedSongs from Redux state
  const useStyle = useContext(ThemeContext);
  const pointer = { cursor: "pointer", color: useStyle.theme };
  const user = useSelector((state) => state?.musicReducer?.user);
  const location = useLocation(); // Get the current location
  const { routeSongId } = useParams();
  // Get the song ID from route params
  const [currentSongId, setCurrentSongId] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (type, val) => {
    switch (type) {
      case "repeat":
        setRepeatClick(val);
        break;
      case "prev":
        setPrevClicked(val);
        break;
      case "play-pause":
        setPlaying(val);
        break;
      case "next":
        setNextClicked(val);
        break;
      case "volume":
        setVolumeClicked(val);
        break;
      default:
        break;
    }
  };

  const sendNotification = async (type) => {
    const reqData = {
      sender: user?._id,
      recipient: userId,
      type: type,
      message: `${user?.name} has ${type} your song`,
    };
    try {
      const res = await sendNoti(reqData);
      if (res) {
        console.log(res);
      }
    } catch (error) { }
  };

  useEffect(() => {
    audioElement.current.addEventListener("loadeddata", () => {
      setPlaying(true);
      audioElement.current.play();
    });

    audioElement.current.addEventListener("ended", () => {
      setPlaying(false);
    });
  }, []);

  const isLiked = likedSongs[_id] || false; // Check if the current song is liked

  const handleLike = async () => {
    if (user) {
      if (isLiked) {
        // If the song is already liked, unlike it
        const response = await removeLike({ songId: _id, userId: user._id });
        if (response) {
          dispatch(setLike(_id, false)); // Dispatch action to update Redux state
          sendNotification("like");
        }
      } else {
        // If the song is not liked, like it
        const response = await addLike({ songId: _id, userId: user._id });
        if (response) {
          dispatch(setLike(_id, true)); // Dispatch action to update Redux state
        }
      }
    } else {
      navigate("/signin");
    }
  };

  const handleComment = () => {
    if (user) {
      setIsCommentBoxOpen(true);
    } else {
      navigate("/signin");
    }
  };

  const handleCloseCommentPopup = () => {
    setIsCommentBoxOpen(false);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };
  const handleSubmitComment = () => {
    if (user) {
      console.log("Comment submitted:", commentText);
      setCommentText("");
    } else {
      navigate("/signin");
    }
  };

  const [commentedUser, setCommentedUser] = useState(false);

  useEffect(() => {
    if (commentedUser) {
      sendNotification("comment");
    }
  }, [commentedUser]);

  const handleShare = () => {
    if (user) {
      // Copy the current song name to the clipboard
      const url = `${window.location.origin}/home?routeSongId=${_id}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setIsSnackbarOpen(true); // Show success snackbar
          sendNotification("share");
        })
        .catch((err) => {
          console.error("Failed to copy URL:", err);
        });
    } else {
      navigate("/signin");
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleSeekChange = (event, newValue) => {
    audioElement.current.currentTime = (newValue * duration) / 100;
    setSeekTime(newValue);
  };
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  const handleBannerToggle = () => {
    setBannerToggle(!bannerToggle);
  };

  useEffect(() => {
    dispatch(setBannerOpen(bannerToggle));
  }, [dispatch, bannerToggle]);

  useEffect(() => {
    isPlaying
      ? audioElement.current
        .play()
        .then(() => { })
        .catch((e) => {
          audioElement.current.pause();
          audioElement.current.currentTime = 0;
        })
      : audioElement.current.pause();
    audioElement.current.loop = isRepeatClicked;
    audioElement.current.volume = volume / 100;
    audioElement.current.muted = isVolumeClicked;
    audioElement.current.onloadeddata = () => {
      if (audioElement.current != null)
        setDuration(audioElement.current.duration);
    };
    setInterval(() => {
      if (audioElement.current !== null)
        setCurrTime(audioElement.current.currentTime);
    });
  });

  useEffect(() => {
    setCurrTrack(music);
  }, [music]);

  useEffect(() => {
    setSeekTime(currTime / (duration / 100));
  }, [currTime, duration]);

  useEffect(() => {
    audioElement.current.onended = () => {
      setNextClicked(true);
    };
  });

  useEffect(() => {
    if (isNextClicked) {
      let currTrackId = (_id + 1) % playlists.length;
      dispatch(setCurrentPlaying(playlists[currTrackId]));
      setNextClicked(false);
    }
    if (isPrevClicked) {
      let currTrackId = (_id - 1) % playlists.length;
      if (_id - 1 < 0) {
        currTrackId = playlists.length - 1;
      }
      dispatch(setCurrentPlaying(playlists[currTrackId]));
      setPrevClicked(false);
    }
  }, [dispatch, _id, isNextClicked, isPrevClicked, playlists]);

  function formatTime(secs) {
    const t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    let s = t.toTimeString().substr(0, 8);
    if (secs > 86399)
      s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return s.substring(3);
  }

  return (
    <div style={useStyle.component} className={"footer-player"}>
      <div className="playback">
        {!isNaN(seekTime) && (
          <Slider
            style={{ color: useStyle.theme }}
            className={"playback-completed"}
            value={seekTime}
            onChange={handleSeekChange}
          />
        )}
      </div>
      <Button
        startIcon={<Avatar variant="square" src={img} alt={name} />}
        onClick={handleBannerToggle}
        className="curr-music-container"
      >
        <div className="curr-music-details">
          <Name name={name} className={"song-name"} length={name.length} />
          <Name
            name={author_name}
            className={"author-name"}
            length={author_name.length}
          />
        </div>
      </Button>
      <div className="playback-controls">
        <ControlsToggleButton
          style={pointer}
          type={"repeat"}
          defaultIcon={<RepeatIcon fontSize={"large"} />}
          changeIcon={<RepeatOneIcon fontSize={"large"} />}
          onClicked={handleToggle}
        />

        <ControlsToggleButton
          style={pointer}
          type={"prev"}
          defaultIcon={<SkipPreviousIcon fontSize={"large"} />}
          changeIcon={<SkipPreviousIcon fontSize={"large"} />}
          onClicked={handleToggle}
        />

        <audio ref={audioElement} src={musicName} preload="metadata" />
        <ControlsToggleButton
          style={pointer}
          type="play-pause"
          defaultIcon={<PlayArrowIcon fontSize="large" />}
          changeIcon={<PauseIcon fontSize="large" />}
          onClicked={handleToggle}
          playing={isPlaying}
        />
        <ControlsToggleButton
          style={pointer}
          type={"next"}
          defaultIcon={<SkipNextIcon fontSize={"large"} />}
          changeIcon={<SkipNextIcon fontSize={"large"} />}
          onClicked={handleToggle}
        />
      </div>
      <div className="additional-icons">
        <IconButton style={pointer} onClick={handleLike}>
          {isLiked ? (
            <FavoriteIcon fontSize="large" style={{ color: "red" }} />
          ) : (
            <FavoriteIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton style={pointer} onClick={handleComment}>
          <CommentIcon fontSize="large" />
        </IconButton>
        {isCommentBoxOpen && (
          <CommentPopup
            setCommentedUser={setCommentedUser}
            songId={music._id}
            onClose={handleCloseCommentPopup}
          />
        )}

        <IconButton onClick={handleShare} style={{ color: "#07689F" }}>
          <ShareIcon fontSize="large" />
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Song shared successfully"
        />
      </div>
      <div className="playback-widgets">
        <div className="timer">
          <p>
            <span>{formatTime(currTime)}</span>/
            <span>{formatTime(duration)}</span>
          </p>
        </div>
        <div className={"slider"}>
          <Slider
            style={{ color: useStyle.theme }}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <ControlsToggleButton
          style={pointer}
          type={"volume"}
          defaultIcon={<VolumeUpIcon />}
          changeIcon={<VolumeOffIcon />}
          onClicked={handleToggle}
        />
      </div>
    </div>
  );
}

export default FooterMusicPlayer;
