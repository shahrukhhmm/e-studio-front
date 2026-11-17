
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';

// const AllSong = () => {
//     // const { category } = useParams();
//     const [songs, setSongs] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSongs = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3007/api/song/getAll`);
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
//         <div className="song-card-container" style={{
//             display:"flex",
//             justifyContent:"center",
//             alignContent:"center",
//             padding:"2rem",
//             flexDirection:"column"

//         }}>
//             <h2 style={{
// fontSize: '2rem',
// fontFamily: "auto",
// marginBottom: "2rem"
//             }}> ALL UPLOADS </h2>
//             {error && <div className="error">{error}</div>}
//             <div className="songs" style={{display:"flex", gap:"2rem", flexWrap:"wrap"}}>
//                 {songs.length === 0 ? (
//                     <div>No songs available.</div>
//                 ) : (
//                     songs.map((song) => (
//                         <Card key={song._id} style={{ width: '18rem', margin: '10px', background: '#ebe8e2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
//                             <Card.Img variant="top" src={`http://localhost:3007/api/song/getThumbnails/${song._id}`} style={{
//                                     width: "245px",
//                                     borderRadius: "10px"
                                
//                             }} />
//                             <Card.Body>
//                                 <Card.Title
//                                  style={{
//                                     fontSize: "1.2rem",
//                                     textTransform: "capitalize",
//                                     marginBottom: "1rem"
                                
//                                  }}>{song.songName}</Card.Title>
//                                 <Card.Text>
//                                     {song.singerName}
//                                 </Card.Text>
//                                 <audio controls>
//                                     <source src={`http://localhost:3007/api/song/getAudio/${song._id}`} type="audio/mpeg" style={{
//                                         width:"250px"
//                                     }}/>
//                                     Your browser does not support the audio element.
//                                 </audio>
//                             </Card.Body>
//                         </Card>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllSong;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const AllSong = () => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:3007/api/song/getAll`);
                setSongs(response.data.songs);
                setError(null);
            } catch (error) {
                setError('Error fetching songs. Please try again later.');
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    return (
        <div className="song-card-container" style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "2rem",
            flexDirection: "column"
        }}>
            <h2 style={{
                fontSize: '2rem',
                fontFamily: "auto",
                marginBottom: "2rem"
            }}> ALL UPLOADS </h2>
            {error && <div className="error">{error}</div>}
            <div className="songs" style={{ display: "flex", gap: ".1rem", flexWrap: "wrap" }}>
                {songs.length === 0 ? (
                    <div>No songs available.</div>
                ) : (
                    songs.map((song) => (
                        <Card key={song._id} style={{ width: '18rem', margin: '10px', background: '#ebe8e2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <Card.Img variant="top" src={`http://localhost:3007/api/song/getThumbnails/${song._id}`} style={{
                                width: "245px",
                                borderRadius: "10px"
                            }} />
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        fontSize: "1.2rem",
                                        textTransform: "capitalize",
                                        marginBottom: "1rem"
                                    }}>{song.songName}</Card.Title>
                                <Card.Text>
                                    {song.singerName}
                                </Card.Text>
                                <audio controls  style={{
                                        width: "250px",    
                                        marginTop: "1rem"
                                    }}>
                                    <source src={`http://localhost:3007/api/song/getAudio/${song._id}`} type="audio/mpeg" 
                                    />
                                    Your browser does not support the audio element.
                                </audio>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllSong;
