// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'morning-dispatch-55ddd.firebaseapp.com',
  projectId: 'morning-dispatch-55ddd',
  storageBucket: 'morning-dispatch-55ddd.firebasestorage.app',
  messagingSenderId: '969340323698',
  appId: '1:969340323698:web:34b2a83a7d4535dcf9ffeb',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
