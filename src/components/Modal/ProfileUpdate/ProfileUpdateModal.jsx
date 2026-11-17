import axios from 'axios';
import './style.css';

import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';


const ProfileUpdateModal = ({ isOpen, onClose, userId}) => {

    const [username, setUsername] = useState('');
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [bio, setBio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            'name': username,
            'city': city,
            'country': country,
            'bio': bio
        }

        try {
            const response = await axios.put(`http://localhost:3007/api/user/update-profile-data/${userId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            )

            if (response.statusText === 'OK') {
                toast.success('Profile Update Successfully', {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        backgroundColor: '#5cb85c', color: "white"
                    }
                });
                onClose();
            }

        }
        catch (error) {
            onClose();
        }

    };

    const close = () => {

        setUsername('')
        setCity('')
        setCountry('')
        setBio('')
        onClose()
    }

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '22px', lineHeight: '22px', letterSpacing: 'normal', textAlign: 'start', color: '#333333' }}>Edit Profile</h2>
                    <span className="close" onClick={close}>&times;</span>
                </div>

                <form onSubmit={handleSubmit} className='profile-update-form'>

                    <label className='custom-field'>
                        <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <span className='placeholder'>Enter your name</span>
                    </label>

                    <label className='custom-field'>
                        <input type="text" id="name" value={city} onChange={(e) => setCity(e.target.value)} />
                        <span className='placeholder'>Enter your city</span>
                    </label>

                    <label className='custom-field'>
                        <input type="text" id="name" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <span className='placeholder'>Enter your country</span>
                    </label>

                    <label className='custom-field'>

                        <input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                        <span className='placeholder'>Write something about yourself</span>
                    </label>

                    <input type="submit" value="Save Changes" className="submit-btn" />
                </form>
            </div>
        </div>
    )
}

export default ProfileUpdateModal;