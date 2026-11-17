


// // correct 
// // import React, { useContext, useEffect, useState } from 'react';
// // import './AddMusic.scss';
// // import { Skeleton } from "@material-ui/lab";
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';

// // const AddMusic = () => {
// //     const [loaded, setLoaded] = useState(false);

// //     const formik = useFormik({
// //         initialValues: {
// //             songName: '',
// //             singerName: '',
// //             category: 'piano', // Default category
// //             premium: 'false', // Default premium value
// //             musicFile: null,
// //             thumbnailFile: null
// //         },
// //         validationSchema: Yup.object({
// //             songName: Yup.string().required('Song name is required'),
// //             singerName: Yup.string().required('Singer name is required'),
// //             category: Yup.string().required('Category is required'),
// //             premium: Yup.string().required('Premium selection is required'),
// //             musicFile: Yup.mixed().required('Music file is required'),
// //             thumbnailFile: Yup.mixed().required('Thumbnail file is required')
// //         }),
// //         onSubmit: async (values) => {
// //             try {
// //                 // Get user ID from local storage
// //                 const userId = localStorage.getItem('userId');

// //                 const formData = new FormData();
// //                 formData.append('userId', userId); // Append user ID to the form data
// //                 formData.append('songName', values.songName);
// //                 formData.append('singerName', values.singerName);
// //                 formData.append('category', values.category);
// //                 formData.append('premium', values.premium);
// //                 formData.append('music', values.musicFile);
// //                 formData.append('thumbnail', values.thumbnailFile);

// //                 // Send form data to backend
// //                 const response = await fetch('http://localhost:3007/api/song/create', {
// //                     method: 'POST',
// //                     body: formData
// //                 });

// //                 if (response.ok) {
// //                     // Song created successfully
// //                     console.log('Song created successfully');
// //                 } else {
// //                     // Error creating song
// //                     console.error('Error creating song');
// //                 }
// //             } catch (error) {
// //                 console.error('Error creating song:', error);
// //             }
// //         },
// //     });

// //     useEffect(() => {
// //         setLoaded(true);
// //     }, []);

// //     return (
// //         <>
// //             <div className={"home-container"}>
// //                 {!loaded ? (
// //                     <div className="Home-skeleton">
// //                         <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
// //                     </div>
// //                 ) : (
// //                     <div className="container">
// //                         <div className="main-home">
// //                             <h1>Add your Music</h1>
// //                             <div className="music-form">
// //                                 <form onSubmit={formik.handleSubmit}>
// //                                     <div className="form-group">
// //                                         <label htmlFor="songName">Song Name</label>
// //                                         <input
// //                                             type="text"
// //                                             id="songName"
// //                                             name="songName"
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                             value={formik.values.songName}
// //                                             className="form-control"
// //                                             required
// //                                         />
// //                                         {formik.touched.songName && formik.errors.songName ? (
// //                                             <div className='error'>{formik.errors.songName}</div>
// //                                         ) : null}
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label htmlFor="singerName">Singer Name</label>
// //                                         <input
// //                                             type="text"
// //                                             id="singerName"
// //                                             name="singerName"
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                             value={formik.values.singerName}
// //                                             className="form-control"
// //                                             required
// //                                         />
// //                                         {formik.touched.singerName && formik.errors.singerName ? (
// //                                             <div className='error'>{formik.errors.singerName}</div>
// //                                         ) : null}
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label htmlFor="category">Category</label>
// //                                         <select
// //                                             id="category"
// //                                             name="category"
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                             value={formik.values.category}
// //                                             className="form-control"
// //                                             required
// //                                         >
// //                                             <option value="piano">Piano</option>
// //                                             <option value="guitar">Guitar</option>
// //                                             <option value="saxophone">Saxophone</option>
// //                                             <option value="violin">Violin</option>
// //                                         </select>
// //                                         {formik.touched.category && formik.errors.category ? (
// //                                             <div className='error'>{formik.errors.category}</div>
// //                                         ) : null}
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label>Premium</label>
// //                                         <div>
// //                                             <input
// //                                                 type="radio"
// //                                                 id="premiumYes"
// //                                                 name="premium"
// //                                                 value="true"
// //                                                 checked={formik.values.premium === 'true'}
// //                                                 onChange={formik.handleChange}
// //                                             />
// //                                             <label htmlFor="premiumYes">Yes</label>
// //                                             <input
// //                                                 type="radio"
// //                                                 id="premiumNo"
// //                                                 name="premium"
// //                                                 value="false"
// //                                                 checked={formik.values.premium === 'false'}
// //                                                 onChange={formik.handleChange}
// //                                             />
// //                                             <label htmlFor="premiumNo">No</label>
// //                                         </div>
// //                                         {formik.touched.premium && formik.errors.premium ? (
// //                                             <div className='error'>{formik.errors.premium}</div>
// //                                         ) : null}
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label htmlFor="musicFile">Add Music (MP3 only)</label>
// //                                         <input
// //                                             type="file"
// //                                             id="musicFile"
// //                                             name="musicFile"
// //                                             onChange={(event) => formik.setFieldValue("musicFile", event.target.files[0])}
// //                                             className="form-control-file"
// //                                             accept=".mp3"
// //                                             required
// //                                         />
// //                                         {formik.touched.musicFile && formik.errors.musicFile ? (
// //                                             <div className='error'>{formik.errors.musicFile}</div>
// //                                         ) : null}
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label htmlFor="thumbnailFile">Add Thumbnail (Image)</label>
// //                                         <input
// //                                             type="file"
// //                                             id="thumbnailFile"
// //                                             name="thumbnailFile"
// //                                             onChange={(event) => formik.setFieldValue("thumbnailFile", event.target.files[0])}
// //                                             className="form-control-file"
// //                                             accept="image/*"
// //                                             required
// //                                         />
// //                                         {formik.touched.thumbnailFile && formik.errors.thumbnailFile ? (
// //                                             <div className='error'>{formik.errors.thumbnailFile}</div>
// //                                         ) : null}
// //                                     </div>
// //                                     <button type="submit" className="btn-submit">Add</button>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </>
// //     );
// // }

// // export default AddMusic;




import React, { useContext, useEffect, useState } from 'react';
import './AddMusic.scss';
import { Skeleton } from "@material-ui/lab";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddMusic = () => {
    const [loaded, setLoaded] = useState(false);
  

   

    const formik = useFormik({
        initialValues: {
            songName: '',
            singerName: '',
            category: 'piano', // Default category
            premium: 'false', // Default premium value
            musicFile: null,
            thumbnailFile: null
        },
        validationSchema: Yup.object({
            songName: Yup.string().required('Song name is required'),
            singerName: Yup.string().required('Singer name is required'),
            category: Yup.string().required('Category is required'),
            premium: Yup.string().required('Premium selection is required'),
            musicFile: Yup.mixed().required('Music file is required'),
            thumbnailFile: Yup.mixed().required('Thumbnail file is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // Get user ID from local storage
                const userId = localStorage.getItem('userId');

                const formData = new FormData();
             formData.append('userId', userId); // Append user ID to the form data
                formData.append('songName', values.songName);
                formData.append('singerName', values.singerName);
                formData.append('category', values.category);
                formData.append('premium', values.premium);
                formData.append('audioFile', values.musicFile);
                formData.append('thumbnail', values.thumbnailFile);

                // Send form data to backend
                console.log(formData)
                const response = await fetch(`http://localhost:3007/api/song/create`, {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    // Song created successfully
                    // toast.success('Song uploaded successfully');
                    alert("Song uploaded successfully")
                    resetForm();
                } else {
                    // Error creating song
                    console.error('Error creating song');
                    toast.error('Error uploading song');
                }
            } catch (error) {
                console.error('Error creating song:', error);
                toast.error('Error uploading song');
            }
        },
    });

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            <div className={"home-container"}>
                {!loaded ? (
                    <div className="Home-skeleton">
                        <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
                    </div>
                ) : (
                    <div className="container">
                        <div className="main-home">
                            <h1>Add your Music</h1>
                            <div className="music-form">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="songName">Song Name</label>
                                        <input
                                            type="text"
                                            id="songName"
                                            name="songName"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.songName}
                                            className="form-control"
                                            placeholder="Song Name"
                                            required
                                        />
                                        {formik.touched.songName && formik.errors.songName ? (
                                            <div className='error'>{formik.errors.songName}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="singerName">Singer Name</label>
                                        <input
                                            type="text"
                                            id="singerName"
                                            name="singerName"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.singerName}
                                            className="form-control"
                                            placeholder="Singer Name"
                                            required
                                        />
                                        {formik.touched.singerName && formik.errors.singerName ? (
                                            <div className='error'>{formik.errors.singerName}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.category}
                                            className="form-control"
                                            required
                                        >
                                            <option value="piano">piano</option>
                                        
                                            <option value="singer">singer</option>
                                         
                                            <option value="guitarist">guitarist</option>
                                            <option value="bassist">bassist</option>
                                            <option value="drummer">drummer</option>
                                            <option value="keyboardist">keyboardist</option>
                                            <option value="violinist">violinist</option>
                                            <option value="flutist">flutist</option>
                                            <option value="saxophonist">saxophonist</option>
                                            <option value="rapper">rapper</option>
                                        </select>
                                        {formik.touched.category && formik.errors.category ? (
                                            <div className='error'>{formik.errors.category}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="musicFile">Add Music (MP3 only)</label>
                                        <input
                                            type="file"
                                            id="musicFile"
                                            name="musicFile"
                                            onChange={(event) => formik.setFieldValue("musicFile", event.target.files[0])}
                                            className="form-control-file"
                                            accept=".mp3"
                                            required
                                        />
                                        {formik.touched.musicFile && formik.errors.musicFile ? (
                                            <div className='error'>{formik.errors.musicFile}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="thumbnailFile">Add Thumbnail (Image)</label>
                                        <input
                                            type="file"
                                            id="thumbnailFile"
                                            name="thumbnailFile"
                                            onChange={(event) => formik.setFieldValue("thumbnailFile", event.target.files[0])}
                                            className="form-control-file"
                                            accept="image/*"
                                            required
                                        />
                                        {formik.touched.thumbnailFile && formik.errors.thumbnailFile ? (
                                            <div className='error'>{formik.errors.thumbnailFile}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit" className="btn-submit">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddMusic;


