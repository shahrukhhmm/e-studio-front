import React, { useState, useEffect } from "react";
import { Box, Popover } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./CommentPopup.scss";
import { addComment, getAllSongs } from "../../lib/helper";
import { setPlaylist } from "../../../actions/actions";

const CommentPopup = ({ songId, onClose, setCommentedUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { playlists } = useSelector((state) => state.musicReducer); // Get likedSongs from Redux state
  const user = useSelector((state) => state?.musicReducer?.user);
  const dispatch = useDispatch();

  const getSongs = async () => {
    const response = await getAllSongs();
    if (response) {
      // setAllSongs(response.songs);
      dispatch(setPlaylist(response.songs));
    }
  };
  useEffect(() => {
    const playlist = playlists.find((playlist) => playlist._id === songId);
    const comments = playlist ? playlist.comments : [];
    setComments(comments);
  }, [playlists]);

  const handleSubmitComment = async () => {
    // Add your API call here to submit the new comment
    // setComments([...comments, { _id: Date.now(), text: newComment }]);

    const requestData = {
      songId: songId,
      userId: user?._id,
      content: newComment,
    };
    try {
      const response = await addComment(requestData);
      if (response) {
        getSongs();
        setCommentedUser(true);
        setNewComment("");
      }
    } catch (error) {
      console.log("error adding comments", error);
    }
  };

  return (
    <Popover
      open={true}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      }}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
      className="comment-popup"
    >
      <Box sx={{ width: 500 }}>
        <div className="comment-popup__content">
          <h2>Comments</h2>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li key={comment._id}>- {comment.content}</li>
              ))
            ) : (
              <li>No comments yet</li>
            )}
          </ul>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-popup__input"
          />
          <button
            onClick={handleSubmitComment}
            className="comment-popup__button"
          >
            Submit
          </button>
          <button onClick={onClose} className="comment-popup__button">
            Close
          </button>
        </div>
      </Box>
    </Popover>
  );
};

export default CommentPopup;
