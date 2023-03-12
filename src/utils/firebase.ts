import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyA7ePzmR5xK8iU1mXOIXPFxP0JA2pW9T8o',
  authDomain: 'clone-3f4f2.firebaseapp.com',
  projectId: 'clone-3f4f2',
  storageBucket: 'clone-3f4f2.appspot.com',
  messagingSenderId: '728186167696',
  appId: '1:728186167696:web:ab833d6add64f204c8d315',
  measurementId: 'G-XYMM83WZG4',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { db, auth };
