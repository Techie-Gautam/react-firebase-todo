import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDajNxNGayz2L_uohZv9Dgn_aUAHccG8aY",
    authDomain: "react-firebase-f3857.firebaseapp.com",
    projectId: "react-firebase-f3857",
    storageBucket: "react-firebase-f3857.appspot.com",
    messagingSenderId: "625333610986",
    appId: "1:625333610986:web:c9bc244fe966b5ff57ea93",
    measurementId: "G-JQWHR39T2B"
};

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)




const loginUsingEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
    }
}

const registerUsingEmailAndPassword = async (name, email, password) => {
    try {
       const response =  await createUserWithEmailAndPassword(auth, email, password)
       const user = response.user
       
       await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email
       })
    } catch (error) {
        console.log(error);
    }
}


function logout() {
    signOut(auth)
}

export {auth, loginUsingEmailAndPassword, registerUsingEmailAndPassword, logout}

