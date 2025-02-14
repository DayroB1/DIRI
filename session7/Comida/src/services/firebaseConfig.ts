import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCeB4SFb24FAzQLykcyqCIlMxJ68DONRqU",
    authDomain: "foodapp-rtk.firebaseapp.com",
    databaseURL: "https://foodapp-rtk-default-rtdb.firebaseio.com",
    projectId: "foodapp-rtk",
    storageBucket: "foodapp-rtk.firebasestorage.app",
    messagingSenderId: "414769862937",
    appId: "1:414769862937:web:f271ebf285d8b2f0ec8d88"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };