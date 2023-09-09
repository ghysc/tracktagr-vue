import { db } from './firebase'
import {
    doc,
    getDoc,
    //onSnapshot,
    //updateDoc,
    setDoc,
    //Timestamp
} from 'firebase/firestore'

async function loginUser(user) {

    const userRef = doc(db, "users", user.uid);
    let userSnap = await getDoc(userRef);

    // If the user exists
    if (userSnap.exists()) {
        console.log("User logged in in database.js");
    }
    // Else if it's a new user 
    else {
        await setDoc(userRef, {
            mail: user.email,
            tags: 
            [
                { label:"Title", type:"String", order:0 },
                { label:"Artist(s)", type:"String", order:1 },
                { label:"Duration", type:"Number", order:2 }
            ],
            tier: 0
        });
        console.log("User created in database.js");
    }

    userSnap = await getDoc(userRef);
    return userSnap.data();

}

export { loginUser };