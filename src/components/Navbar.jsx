import React,{useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import avatar from '../data/empty.jpg';
import { Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/context';
import { useGlobalContext } from '../contexts/context2';


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  
);




const Navbar = () => {

 const {activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, currentColor,screenSize } = useStateContext();

const {setUser} = useGlobalContext()
const navigate = useNavigate()
const [user1, loading, error] = useAuthState(auth);


 


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);


	return (
		  <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu}  icon={<AiOutlineMenu />} />
      <div className="flex">
        
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
        
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {JSON.parse(localStorage.getItem('myMicData')) ? JSON.parse(localStorage.getItem('myMicData'))?.user?.displayName:JSON.parse(localStorage.getItem('myData'))?.result?.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        

        
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
		)
}

export default Navbar