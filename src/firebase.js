import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCNtU8XGgzsmwM48MHQ0H1k317MbaOl0W4",
    authDomain: "tracktagr.firebaseapp.com",
    databaseURL: "https://tracktagr-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "tracktagr",
    storageBucket: "tracktagr.appspot.com",
    messagingSenderId: "461529816149",
    appId: "1:461529816149:web:5b692610f1878eb753c8dc"
});

export const db = getDatabase(firebaseApp);
