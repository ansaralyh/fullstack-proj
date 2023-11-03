import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { Toaster, toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';

export default function Username() { // Renamed to start with an uppercase letter
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  const username = useAuthStore(state => state.auth.username); // Assuming you're using this variable later

  useEffect(() => {
    console.log(username);
  }, [username]);

  const handleForm = () => {
    console.log(setUsername(formik.values.username));
  };

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    onSubmit: handleForm
  });

  return (
    <div className="container max-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold py-1'>Hello Again</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-500'>
              Explore by connecting with us!
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={styles.profile_img} alt="" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's go</button>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>Not a member <Link className='text-red-500' to="/Register">Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
