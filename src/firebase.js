import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDTWqD5dt1ljwjwBNKrNcofPmqUa5drw0",
    authDomain: "loginfirebase-2aca9.firebaseapp.com",
    projectId: "loginfirebase-2aca9",
    storageBucket: "loginfirebase-2aca9.appspot.com",
    messagingSenderId: "181420751764",
    appId: "1:181420751764:web:00f342648fba1a38776d81"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);