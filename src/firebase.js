
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { OAuthProvider } from "firebase/auth";
// import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTlBT3cSnNMu_TCxSYTB0DH0G_u499F6Y",
  authDomain: "bahrain-air.firebaseapp.com",
  projectId: "bahrain-air",
  storageBucket: "bahrain-air.appspot.com",
  messagingSenderId: "999687358297",
  appId: "1:999687358297:web:ca06d6012b7c3fdf2eae48"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new OAuthProvider('microsoft.com');
export {auth,provider};