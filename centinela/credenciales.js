// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2yO63IY7-nQrozVzcTrfHm6eSmDSH76A",
  authDomain: "centinela-78372.firebaseapp.com",
  projectId: "centinela-78372",
  storageBucket: "centinela-78372.appspot.com",
  messagingSenderId: "549647632963",
  appId: "1:549647632963:web:8f9b77aa21ef8e038fe2f6"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase