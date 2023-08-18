import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/context';
import { AppProvider } from './contexts/context2';
import axios from 'axios'



axios.interceptors.request.use((req) => {
    if(localStorage.getItem('myData'))
      {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('myData')).token}`
      }
    if(localStorage.getItem('myMicData'))
      {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('myMicData'))?.user?.stsTokenManager?.accessToken}`
      }

      return req
    
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <AppProvider>
   <ContextProvider>
    <App />
     </ContextProvider>
     </AppProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

