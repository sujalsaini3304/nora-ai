// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
  measurementId: import.meta.env.VITE_API_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Add these for better compatibility
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export {
  app, analytics, googleProvider, auth
}