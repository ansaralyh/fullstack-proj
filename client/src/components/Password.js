import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import {Toaster, toaster} from 'react-hot-toast'

export default function password() {
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    }
  });

  return (
    <div className="container max-auto">

<Toaster position='top-center' reverseOrder = {false}></Toaster>
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
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='password' />
              <button className={styles.btn} type='submit'>Sign up</button>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>Forgot password !<Link className='text-red-500' to="/Recovery">Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
