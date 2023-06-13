import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import {Toaster, toaster} from 'react-hot-toast'
import { resetPasswordValidation } from '../helper/validate';  

export default function reset() {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidation,
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
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold py-1'>Reset</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
          </div>
          <form className='py-20' onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New password' />
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repeat password' />
              <button className={styles.btn} type='submit'>Reset</button>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  );
}
