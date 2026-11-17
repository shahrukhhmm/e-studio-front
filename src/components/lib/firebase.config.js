// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG6lBxWiidUbSP_koCECFM2gVBw9NuzCo",
    authDomain: "dummy-f7239.firebaseapp.com",
    projectId: "dummy-f7239",
    storageBucket: "dummy-f7239.appspot.com",
    messagingSenderId: "1093740486584",
    appId: "1:1093740486584:web:3f9288caf9b0549c8f794d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);