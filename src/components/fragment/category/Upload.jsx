import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../../lib/firebase.config";
import { uploadSong } from "../../lib/helper";
import "./SongUploadForm.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.musicReducer?.user);
  const [formData, setFormData] = useState({
    userId: user?._id,
    name: "",
    author_name: user?.name,
    lang: "",
    type: "",
    attribution: {
      song: "",
      musicBy: "",
    },
    thumbnail: "",
    audioFile: "",
    category: "",
    individual: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("attribution.")) {
      const key = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        attribution: {
          ...prevState.attribution,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") {
      setThumbnailFile(files[0]);
    } else if (name === "audioFile") {
      setAudioFile(files[0]);
    }
  };

  const uploadFile = async (file, folderName) => {
    const fileRef = ref(storage, `${folderName}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    // if (Object.values(formData).some((value) => value === "")) {
    //   // Show toast error if any field is empty
    //   alert("Please fill in all fields");
    //   return;
    // }

    // Disable the upload button
    setUploading(true);

    const folderName = formData.name;
    const thumbnailURL = await uploadFile(thumbnailFile, folderName);
    const audioFileURL = await uploadFile(audioFile, folderName);

    const songData = {
      ...formData,
      thumbnail: thumbnailURL,
      audioFile: audioFileURL,
    };

    try {
      const response = await uploadSong(songData);
      if (response) {
        window.location.replace("/home");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
    } finally {
      // Enable the upload button after uploading is finished
      setUploading(false);
    }
  };

  return (
    <div className="main">
      <form className="song-upload-form" onSubmit={handleSubmit}>
        <div>
          <label>Song Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author Name</label>
          <input
            type="text"
            name="author_name"
            value={user?.name}
            // onChange={handleChange}
            // required
            disabled
          />
        </div>
        <div>
          <label>Language</label>
          <input
            type="text"
            name="lang"
            value={formData.lang}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Song Attribution</label>
          <input
            type="text"
            name="attribution.song"
            value={formData.attribution.song}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Music By</label>
          <input
            type="text"
            name="attribution.musicBy"
            value={formData.attribution.musicBy}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            defaultValue={"select"}
            name="category"
            // onChange={formik.handleChange}
            value={formData.category}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="select">select</option>

            <option value="vocalist">vocalist</option>
            <option value="guitarist">guitarist</option>
            <option value="bassist">bassist</option>
            <option value="piano">piano</option>
            <option value="drummer">drummer</option>
            {/* <option value="keyboardist">keyboardist</option> */}
            <option value="violinist">violinist</option>
            <option value="flutist">flutist</option>
            {/* <option value="saxophonist">saxophonist</option> */}
            <option value="rapper">rapper</option>
          </select>
          <div>
            <label>Audio File</label>
            <input
              type="file"
              name="audioFile"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>
        {/* Show "Uploading Song" text while uploading */}
        {/* {uploading && <p>Uploading Song...</p>} */}
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Song"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
