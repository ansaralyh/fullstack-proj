import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {toaster} from 'react-hot-toast'
import {useFormik} from 'formik'

export default function username() {
  return (
    <div className="container max-auto">
      <div className='flex justify-center items-center h-screen'>

        <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className='text-4xl font-bold py-1'>Hello Again</h4>
          <span className='py-2 text-xl w-2/3 text-center text-gray-500'>
            Explore with connecting with us !
          </span>
        </div>
        <form className='py-1'>

        <div className='profile flex justify-center py-4'>
          <img src={avatar} className={styles.profile_img} alt="profile image" />

        </div>

          <div className="textbox flex flex-col items-center  gap-6">
            <input className={styles.textbox} type="text" placeholder='Username' />
            <button className={styles.btn} type='submit'>Let's go</button>

          </div>

          <div className="text-center py-4">
            <span className='text-gray-500'>Not a member <Link className='text-red-500'  to="/Register">Register Now</Link></span>

          </div>



        </form>

        </div>

      </div>

    </div>
  )
}
