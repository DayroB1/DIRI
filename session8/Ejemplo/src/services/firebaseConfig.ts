import { getApps, initializeApp } from "firebase/app";
//import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAvpTCIwskLSVeVInTv9itF8WSXRe42kAs",
    authDomain: "foodapp-15bc4.firebaseapp.com",
    databaseURL: "https://foodapp-15bc4-default-rtdb.firebaseio.com",
    projectId: "foodapp-15bc4",
    storageBucket: "foodapp-15bc4.firebasestorage.app",
    messagingSenderId: "942419334286",
    appId: "1:942419334286:web:a35466599ff5a4173565df",
    measurementId: "G-B3EXPV6P8V"
};

export const app = !getApps.length ? initializeApp(firebaseConfig):getApps()[0];