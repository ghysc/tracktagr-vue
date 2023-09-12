import { db } from './firebase'
import {
    doc,
    collection,
    getDoc,
    getDocs,
    //onSnapshot,
    //updateDoc,
    setDoc,
    //Timestamp
} from 'firebase/firestore'

// https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
async function retrieveUser(user) {
    // docSnap.data() will be undefined if docSnap.exists() == false
    const docSnap = await getDoc(doc(db, "users", user.uid));
    return docSnap.data();
}

async function createUser(user, defaultTags) {
    const userRef = doc(db, "users", user.uid);

    await setDoc(userRef, {
        mail: user.email,
        tags: defaultTags,
        tier: 0
    });

    const userSnap = await getDoc(userRef);
    return userSnap.data();
}

// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
async function processTags(user, processing) {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
        docSnap.data().tags.forEach(tag => {
            processing(tag);
        });
    }
}

// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
async function processTracks(user, processing) {
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "tracks"));
    querySnapshot.forEach((track) => {
        // doc.data() is never undefined for query doc snapshots
        processing(track.data());
    });
}

async function addTrack(user, track) {
    console.log(user.uid);
    const trackRef = doc(db, 'users', user.uid + '/tracks/' + track.id.toString()); //doc(db, "users/" + user.uid + "/tracks/" + track.id);

    await setDoc(trackRef, {
        tags: track.tags
    });

    const trackSnap = await getDoc(trackRef);
    return trackSnap.data();
}

export default { retrieveUser, createUser, processTags, processTracks, addTrack };