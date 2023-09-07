import { db } from './firebase'
import {
    doc,
    getDoc,
    updateDoc,
    setDoc,
    Timestamp
} from 'firebase/firestore'

async function loginUser(user) {

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    // If the user exists
    if (docSnap.exists()) {
        await updateDoc(docRef, {
            lastConnectionDate: Timestamp.now()
        });
        console.log("User logged in in database.js");
    }
    // Else if it's a new user 
    else {
        await setDoc(docRef, {
            mail: user.email,
            creationDate: Timestamp.now(),
            lastConnectionDate: Timestamp.now(),
            tier: 0
        });
        console.log("User created in database.js");
    }

}

export { loginUser };