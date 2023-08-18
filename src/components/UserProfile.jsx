import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import {auth} from '../firebase'
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/context';
import avatar from '../data/empty.jpg';
import { useGlobalContext } from '../contexts/context2';
import {Link,useNavigate} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

const UserProfile = () => {

 const { currentColor ,handleClose,isClicked} = useStateContext();

 const {setUser,SignOut} = useGlobalContext()
const navigate = useNavigate()
const [user1, loading, error] = useAuthState(auth);


	return (
		<div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
         <button
            type="button"
            onClick={() => handleClose('userProfile')}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{JSON.parse(localStorage.getItem('myMicData')) ?JSON.parse(localStorage.getItem('myMicData'))?.user?.displayName:JSON.parse(localStorage.getItem('myData'))?.result?.name}</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Administrator   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {JSON.parse(localStorage.getItem('myMicData')) ?JSON.parse(localStorage.getItem('myMicData'))?.user?.email:'placeholder@gmail.com'}  </p>
        </div>
      </div>
     
      <div className="mt-5">
        
         <button
      type="button"
      onClick={() => SignOut()}
      style={{ backgroundColor: currentColor, color:'white', borderRadius:'10px' }}
      className={` text-Logout p-3 w-full hover:drop-shadow-xl hover:bg-white`}
    >
      Logout
    </button>
      </div>
    </div>
		)
}

export default UserProfile