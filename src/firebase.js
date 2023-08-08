import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCNtU8XGgzsmwM48MHQ0H1k317MbaOl0W4",
    authDomain: "tracktagr.firebaseapp.com",
    projectId: "tracktagr",
    storageBucket: "tracktagr.appspot.com",
    messagingSenderId: "461529816149",
    appId: "1:461529816149:web:5b692610f1878eb753c8dc",
    databaseURL: "https://tracktagr-default-rtdb.europe-west1.firebasedatabase.app/"
});

// used for the databas refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const tracksRef = collection(db, 'tracks');