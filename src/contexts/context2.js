import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut} from "firebase/auth";
import {auth} from '../firebase'


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user,setUser] = useState(null)
  const [service12,setService12] = useState(null)
  const [date,setDate] = useState(new Date())
  const [users,setUsers] = useState([])

  const [baseurl,setBaseurl] = useState('localhost:5000')
  const [status,setStatus] = useState(false)
  const [token,setToken] = useState(null)
  const [customer,setCustomer] = useState(null)
  const [link,setLink] = useState('')
  const [awscred,setAwscred] = useState({accesskey:'',secret:'',region:''})
  const [azurecred,setAzurecred] = useState({subscription:'',tenant:'',clientid:'',clientsecret:''})
  const [user1, load, error] = useAuthState(auth);

  const SignOut = () => {

  if(user1)
            {
                  signOut(auth)
                  localStorage.removeItem('myMicData');
            }

  localStorage.removeItem('myData');
  setUser(null)

  console.log('HI')
  window.location.reload();
 }


  
 const addUser = (formdata) => {

   return new Promise((resolve, reject) => {

  axios.post(`http://${baseurl}/user/adduser`,formdata)
      .then(function (response) {

        toast.success('Connector successfully added')
       setStatus(!status)
        console.log(response.data.result)
        resolve(true)
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
      });

      });
 }
 const editUser = (formdata) => {

  return new Promise((resolve, reject) => {

  axios.post(`http://${baseurl}/user/edituser`,formdata)
      .then(function (response) {


       setStatus(!status)
        console.log(response.data)
        resolve(true)
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
      });

      });
 }

 const deleteUser = (data) => {

  return new Promise((resolve, reject) => {

   axios.delete(`http://${baseurl}/user/deleteuser/${data.id}`)
      .then(function (response) {


       setStatus(!status)
        console.log(response.data)
         resolve(true)
      })
      .catch(function (error) {
        console.log(error)
         resolve(false)
      });

      });

 }

 const AddConnect = (connectdata) => {
  
  return new Promise((resolve, reject) => {

  axios.post(`http://${baseurl}/action/connector`,connectdata)
      .then(function (response) {


       setStatus(!status)
        console.log(response.data.message)
         resolve(true)
        
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
        
      });
      });


     


 }

 const Upload = (data) => {
  
  return new Promise((resolve, reject) => {

  axios.post(`http://${baseurl}/action2/upload`,data)
      .then(function (response) {


       setStatus(!status)
        console.log(response.data)
         resolve(true)
        
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
        
      });
      });


     


 }

 const DeletePost = (data) => {
  
  return new Promise((resolve, reject) => {

  axios.post(`http://${baseurl}/action/deletepost`,{id:data})
      .then(function (response) {


       setStatus(!status)
        console.log(response.data)
         resolve(true)
        
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
        
      });
      });


     


 }


 const sendEmail = (msgdata) => {

  const newmsgdata = {

    emailbody:msgdata,
    name:JSON.parse(localStorage.getItem('myData')).result.name,
    id:JSON.parse(localStorage.getItem('myData')).result._id
  }
  
  return new Promise((resolve, reject) => {

  axios.post(`http://${baseurl}/action/email`,newmsgdata)
      .then(function (response) {


       
        console.log(response.data)
         resolve(true)
        
      })
      .catch(function (error) {
        console.log(error)
        resolve(false)
        
      });
      });

  
     


 }



// const AuthZab = (connectdata) => {

//   // Perform a POST request to 'http://localhost:5000/action/authzab'
//   fetch('http://localhost:5000/action/authzab', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       connectdata
//     })
//   })
//     .then(response => {
//       // Handle the response (this code doesn't log the actual response data)
//       console.log(response.data);
//     })
//     .catch(error => {
//       // Handle any errors that occur during the fetch
//       console.log(error);
//     });
// }

  return (
    <AppContext.Provider
      value={{ loading,baseurl,DeletePost,service12,setService12,customer,date,setDate,setCustomer,user,setAzurecred,azurecred,Upload,setUser,users,setAwscred,awscred,SignOut,sendEmail,setUsers,addUser,editUser,deleteUser,status,AddConnect,setToken,token,link,setLink}}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }