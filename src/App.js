import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { FiSettings } from 'react-icons/fi';
import { lazy, Suspense } from 'react';

import './App.css';
import { Navbar, Footer, Sidebar, Theme, Chatbot } from './components';
// import { Dashboard, AzureVM, Finance, AzureCost, AzureMetrics, CostServices, CostManage, Kanban, Calender, Azure, Kibana, FAQ, Instance, Items, Hosts, ZReports, ZReports2, S3, Ansible, AWS, KibanaDash, Cost, Zabbix, Connector, Users, Login } from './pages';
import { useStateContext } from './contexts/context';
import { useGlobalContext } from './contexts/context2'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'
// import SLA from './pages/SLA/SLA';
// import SLAReport from './pages/SLA/SLAReport';


const Dashboard = lazy(()=> import("./pages/Dashboard/Dashboard"))
const AzureVM = lazy(()=> import("./pages/Azure/AzureVM/AzureVM"))
const Finance = lazy(()=> import("./pages/Finance/Finance"))
const AzureCost = lazy(()=> import("./pages/Azure/AzureCost/AzureCost"))
const AzureMetrics = lazy(()=> import("./pages/Azure/AzureMetrics/AzureMetrics"))
const CostServices = lazy(()=> import("./pages/CostManage/CostServices/CostServices"))
const CostManage = lazy(()=> import("./pages/CostManage/CostManage"))
const Kanban = lazy(()=> import("./pages/Kanban/Kanban"))
const Calender = lazy(()=> import("./pages/Calender/Calender"))
const Azure = lazy(()=> import("./pages/Azure/Azure"))
const Kibana = lazy(()=> import("./pages/Kibana/Kibana"))
const FAQ = lazy(()=> import("./pages/FAQ/FAQ"))
const Instance = lazy(()=> import("./pages/AWS/Instance/Instance"))
const Items = lazy(()=> import("./pages/Zabbix/Items/Item"))
const Hosts = lazy(()=> import("./pages/Zabbix/Hosts"))
const ZReports = lazy(()=> import("./pages/Zabbix/ZReports"))
const ZReports2 = lazy(()=> import("./pages/Zabbix/ZReports2"))
const S3 = lazy(()=> import("./pages/AWS/S3/S3"))
const Ansible = lazy(()=> import("./pages/Ansible/Ansible"))
const AWS = lazy(()=> import("./pages/AWS/AWS"))
const KibanaDash = lazy(()=> import("./pages/Kibana/KibanaDash"))
const Cost = lazy(()=> import("./pages/AWS/Cost/Cost"))
const Zabbix = lazy(()=> import("./pages/Zabbix/Zabbix"))
const Login = lazy(()=> import("./pages/Login/Login"))
const Users = lazy(()=> import("./pages/Users/Users"))
const Connector = lazy(()=> import("./pages/Connectors/Connector"))
const SLA = lazy(()=> import("./pages/SLA/SLA"))
const SLAReport = lazy(()=> import("./pages/SLA/SLAReport"))


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

  }, [user, user2])



  const isTokenExpired = () => {
    if (JSON.parse(localStorage.getItem('myData')) === null) {
      return false
    }
    const token = JSON.parse(localStorage.getItem('myData')).token
    const expirationTime = JSON.parse(localStorage.getItem('expirationTime'))
    if (!token || !expirationTime) {
      return true;
    }
    currentTime = new Date().getTime() / 1000;
    console.log(currentTime, expirationTime)
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
          (JSON.parse(localStorage.getItem('myMicData')) == null || undefined) && (JSON.parse(localStorage.getItem('myData')) == null || undefined) ? (
            // <Login />
            <Suspense fallback={<>...</>}> <Login /></Suspense>
          ) : (
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
                    <Route path="/" element={<Suspense fallback={<>...</>}><Dashboard /></Suspense>} />
                    <Route path="/dashboard" element={<Suspense fallback={<>...</>}><Dashboard /></Suspense>} />

                    {/* pages  */}
                    <Route path="/users" element={<Suspense fallback={<>...</>}><Users /></Suspense>} />
                    <Route path="/connectors" element={<Suspense fallback={<>...</>}><Connector /></Suspense>} />
                    <Route path="/hosts/:id" element={<Suspense fallback={<>...</>}><Hosts /></Suspense>} />
                    <Route path="/zreports" element={<Suspense fallback={<>...</>}><ZReports /></Suspense>} />
                    <Route path="/zreports2" element={<Suspense fallback={<>...</>}><ZReports2 /></Suspense>} />
                    <Route path="/kibanadash" element={<Suspense fallback={<>...</>}><KibanaDash /></Suspense>} />
                    <Route path="/item/:id" element={<Suspense fallback={<>...</>}><Items /></Suspense>} />
                    <Route path="/s3" element={<Suspense fallback={<>...</>}><S3 /></Suspense>} />
                    <Route path="/Cost" element={<Suspense fallback={<>...</>}><Cost /></Suspense>} />
                    <Route path="/ec2" element={<Suspense fallback={<>...</>}><Instance /></Suspense>} />
                    <Route path="/azurevm" element={<Suspense fallback={<>...</>}><AzureVM /></Suspense>} />
                    <Route path="/CostManagement" element={<Suspense fallback={<>...</>}><CostManage /></Suspense>} />
                    <Route path="/costservices" element={<Suspense fallback={<>...</>}><CostServices /></Suspense>} />
                    <Route path="/azuremetrics" element={<Suspense fallback={<>...</>}><AzureMetrics /></Suspense>} />
                    <Route path="/AzureCost" element={<Suspense fallback={<>...</>}><AzureCost /></Suspense>} />
                    <Route path="/Finance" element={<Finance />} />
                    <Route path="/SLA" element={<Suspense fallback={<>...</>}><SLA /></Suspense>} />
                    <Route path="/SLAReport" element={<Suspense fallback={<>...</>}><SLAReport /></Suspense>} />


                    {/* apps  */}
                    <Route path="/Ansible" element={<Suspense fallback={<>...</>}><Ansible /></Suspense>} />
                    <Route path="/Monitor" element={<Suspense fallback={<>...</>}><Zabbix /></Suspense>} />
                    <Route path="/EventManagement" element={<Suspense fallback={<>...</>}><Calender /></Suspense>} />
                    <Route path="/Kibana" element={<Suspense fallback={<>...</>}><Kibana /></Suspense>} />
                    <Route path="/aws" element={<Suspense fallback={<>...</>}><AWS /></Suspense>} />
                    <Route path="/Azure" element={<Suspense fallback={<>...</>}><Azure /></Suspense>} />
                    <Route path="/FAQ" element={<Suspense fallback={<>...</>}><FAQ /></Suspense>} />
                    <Route path="/Tasks" element={<Suspense fallback={<>...</>}><Kanban /></Suspense>} />


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
