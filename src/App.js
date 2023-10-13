import React,{useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import './App.css';
import { Navbar, Footer, Sidebar, Theme,Chatbot } from './components';
import { Dashboard,AzureVM,Finance,AzureCost,AzureMetrics,CostServices,CostManage,Kanban, Calender, Azure,Kibana, FAQ,Instance,Items,Hosts,ZReports,ZReports2,S3,Ansible, AWS,KibanaDash,Cost,Zabbix, Connector, Users ,Login} from './pages';
import { useStateContext } from './contexts/context';
import { useGlobalContext } from './contexts/context2'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './firebase'
function App() {

   const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
const [user2, loading, error] = useAuthState(auth);
   const { user } = useGlobalContext()
   let currentTime = 0
   useEffect(() => {

console.log('Hi')
console.log(JSON.parse(localStorage.getItem('myData')))
console.log(JSON.parse(localStorage.getItem('myMicData')))
console.log(JSON.parse(localStorage.getItem('myMicData'))?.user?.stsTokenManager?.accessToken)

},[user,user2])



   const isTokenExpired = () => {
    if(JSON.parse(localStorage.getItem('myData')) === null)
    {
      return false
    }
  const token = JSON.parse(localStorage.getItem('myData')).token 
  const expirationTime = JSON.parse(localStorage.getItem('expirationTime'))
  if (!token || !expirationTime) {
    return true;
  }
   currentTime = new Date().getTime() / 1000;
  console.log(currentTime,expirationTime)
  return currentTime > expirationTime;
};


   useEffect(() => {
    // Check if the token has expired every minute
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        // Remove the token and its expiration time from local storage
        localStorage.removeItem('myData');
        localStorage.removeItem('myMicData');
        localStorage.removeItem("expirationTime");

        // Redirect the user to the login page
        window.location.reload();
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);



  return (
 <div className={currentMode === 'Dark' ? 'dark' : ''} >
      <BrowserRouter>
      {
        (JSON.parse(localStorage.getItem('myMicData')) == null || undefined) && (JSON.parse(localStorage.getItem('myData')) == null || undefined)?(
          <Login />
          ):(
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
               {/* <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >

                <FiSettings />
              </button> */}
            <Chatbot />
           
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<Theme />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Dashboard />)} />
                <Route path="/dashboard" element={(<Dashboard />)} />

                {/* pages  */}
                <Route path="/users" element={<Users />} />
                <Route path="/connectors" element={<Connector />} />
                <Route path="/hosts/:id" element={<Hosts />} />
                <Route path="/zreports" element={<ZReports />} />
                <Route path="/zreports2" element={<ZReports2 />} />
                <Route path="/kibanadash" element={<KibanaDash />} />
                <Route path="/item/:id" element={<Items />} />
                <Route path="/s3" element={<S3 />} />
                <Route path="/Cost" element={<Cost />} />
                <Route path="/ec2" element={<Instance />} />
                 <Route path="/azurevm" element={<AzureVM />} />
                 <Route path="/CostManagement" element={<CostManage />} />
                 <Route path="/costservices" element={<CostServices />} />
                 <Route path="/azuremetrics" element={<AzureMetrics />} />
                 <Route path="/AzureCost" element={<AzureCost />} />
                 <Route path="/Finance" element={<Finance />} />
                

                {/* apps  */}
                <Route path="/Ansible" element={<Ansible />} />
                <Route path="/Monitor" element={<Zabbix />} />
                <Route path="/calendar" element={<Calender />} />
                <Route path="/Kibana" element={<Kibana />} />
                <Route path="/aws" element={<AWS />} />
                <Route path="/Azure" element={<Azure />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/Kanban" element={<Kanban />} />


                {/* charts  */}
               

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        )}
      </BrowserRouter>
    </div>
   
  );
}

export default App;
