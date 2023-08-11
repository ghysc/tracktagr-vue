
<script setup>
import { ref } from 'vue'
import { db } from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { 
  ref as dbRef,
  push,
  set
 } from 'firebase/database'
import { 
  // useFirebaseAuth,
  // useDatabaseList,
  // useDatabaseObject,
  // getCurrentUser
 } from 'vuefire'
import AuthDialog from './compGlob/auth/AuthDialog.vue'
import HeaderRow from './compApp/HeaderRow.vue'
import TrackRow from './compApp/TrackRow.vue'

// const vuefireAuth = useFirebaseAuth();
const auth = getAuth();

const title = "Title";
const artist = "Artist(s)";
const duration = "Duration";
const genre = "Genre";

const trackList = ref([
  { id: 0, title: 'Setting Sun', artist: 'George FitzGerald', duration: 374, genre: 'Rap' },
  { id: 1, title: 'mirage', artist: 'sir bennett', duration: 165, genre: 'Classic' }
]);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Firebase has user below");
    const users = dbRef(db, 'users');
    const newUser = push(users);
    set(newUser, {
      allo: "dread"
    });
    console.log(user);
  } else {
    console.log("Firebase no user");
  }
});

//#region AUTH EMITS CALLBACKS
function onAuthSignin(userCredential) {
  // const users = ref(db, 'users');
  // push(users);
  // console.log(users);
  console.log("User below signed in ");
  console.log(userCredential);
}

function onAuthSignout() {
}

function onAuthFailure(error) {
  console.error(error.code + ' : ' + error.message);
}
//#endregion
</script>

<template>
  <header>
    <img src="./assets/logo.png">
    <AuthDialog @onSignin="onAuthSignin" @onSignout="onAuthSignout" @onFailure="onAuthFailure"></AuthDialog>
  </header>

  <table id="table">
    <HeaderRow 
    :title=title
    :artist=artist
    :duration=duration
    :genre=genre></HeaderRow>

    <TrackRow v-for="track in trackList" 
    :title="track.title" 
    :artist="track.artist" 
    :duration="track.duration"
    :genre="track.genre" 
    :key="track.id"></TrackRow>
  </table>
</template>

<style>
body {
  background-color: #121212;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#table {
  /* Collapse borders */
  border-collapse: collapse;
  /* Full-width */
  width: 90%;
  /* Add a grey border */
  border: 1px solid #ddd;
  /* Increase font-size */
  font-size: 18px; 
  color: #ddd;
  margin-left: auto;
  margin-right: auto;
}
</style>
