import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import './SigninForm.css';
import { baseURL } from '../../../Config';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-js-loader";
import { useDispatch } from 'react-redux';
import { setUser } from '../../../actions/actions';


const SigninForm = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {

      setLoader(true);

      try {
        const response = await axios.post('http://localhost:3007/api/user/Login', values);

        if (response?.status === 200) {

          const userId = response.data.user._id
          const user = response.data.user;

          // Set the userId in local storage
          localStorage.setItem('userId', userId);
          toast.success(response?.data?.message, {
            duration: 3000,
            position: "top-right",
            style: {
              backgroundColor: '#5cb85c', color: "white"
            }
          });


          localStorage.setItem('user', JSON.stringify(user));
          dispatch(setUser(user));

          navigate('/home');
          setLoader(false);

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
        toast.error(error?.response?.data, {
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
    <div className='signin-body'>

      {loader ?
        <div className="loader-container">
          <Loader type="ekvalayzer" bgColor='#a2d5f2' color='blue' title="" size={150} />
        </div>
        :
        null}
      <div className='wrapper1'>
        <form onSubmit={formik.handleSubmit}>
          <h1>Log In</h1>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Email'
              id='email'
              name='email'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <FaUser className='icon' />
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

          {/* <div className='remember-forgot'>
            <label>
              <input
                type='checkbox'
                id='rememberMe'
                name='rememberMe'
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              Remember me
            </label>
            <a href='/'>Forgot password?</a>
          </div> */}
          <div className="signin-button">

            <button type='submit'>Log in</button>
          </div>

          <div className='register-link'>
            <p>
              Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;