import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUserAlt, FaEnvelope, FaLock, FaUnlockAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import react-modal
import './SignupForm.css';
// import { baseURL } from '../../../Config';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-js-loader";

const SignupForm = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            category: "default",
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            category: Yup.string()
        }),

        onSubmit: async (values) => {
            setLoader(true);
            console.log(values)
            try {
                const response = await axios.post('http://localhost:3007/api/user/signUp', values);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success(response?.data?.message, {
                        duration: 3000,
                        position: "top-right",
                        style: {
                            backgroundColor: '#5cb85c', color: "white"
                        }
                    });
                    setLoader(false);
                    navigate('/signin'); // Ensure navigate is called after setLoader
                } else {
                    toast.error(response?.data?.message, {
                        duration: 3000,
                        position: "top-right",
                        style: {
                            backgroundColor: 'red', color: "white"
                        }
                    });
                    setLoader(false);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'An error occurred', {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        backgroundColor: 'red', color: "white"
                    }
                });
                setLoader(false);
            }
        },
    });

    return (
        <div className='signup-body'>
            {loader ?
                <div className="loader-container">
                    <Loader type="ekvalayzer" bgColor='#a2d5f2' color='blue' title="" size={150} />
                </div>
                :
                null}
            <Toaster />
            <div className='wrapper2'>

                <form onSubmit={formik.handleSubmit}>
                    <h1>Sign Up</h1>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            id='name'
                            name='name'
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        <FaEnvelope className='icon' />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                        <div className='error'>{formik.errors.name}</div>
                    ) : null}

                    <div className='input-box'>
                        <input
                            type='email'
                            placeholder='Enter your Email'
                            id='email'
                            name='email'
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <FaEnvelope className='icon' />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className='error'>{formik.errors.email}</div>
                    ) : null}

                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            name='password'
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <FaLock className='icon' />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className='error'>{formik.errors.password}</div>
                    ) : null}

                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            id='confirmPassword'
                            name='confirmPassword'
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        <FaUnlockAlt className='icon' />
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className='error'>{formik.errors.confirmPassword}</div>
                    ) : null}
                    <div className="signup-button">
                        <button type='submit'>Sign Up</button>
                    </div>

                    <div className='register-link'>
                        <p>
                            Already have an account? <Link to='/signin'>Sign In</Link>
                        </p>
                    </div>

                    {/* Modal for successful registration */}
                    {/* <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="User Registration Successful"
                    >
                        <h2>User Registered Successfully!</h2>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </Modal> */}
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
