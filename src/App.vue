
<script setup>
import {
  ref,
  //watch 
} from 'vue'
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import {
  loginUser
} from './database'
import AuthDialog from './compGlob/auth/AuthDialog.vue'
import HeaderRow from './compApp/HeaderRow.vue'
import TrackRow from './compApp/TrackRow.vue'

const auth = getAuth();

const userTags = ref([]);

const trackList = ref([
  { id: 0, title: 'Setting Sun', artist: 'George FitzGerald', duration: 374, genre: 'Rap' },
  { id: 1, title: 'mirage', artist: 'sir bennett', duration: 165, genre: 'Classic' }
]);

// Callback method automatically called when Firebase Authentification state changes 
onAuthStateChanged(auth, async user => {
  // If a user just logged in
  if (user) {

    // Add the user's tags
    const userData = await loginUser(user);
    userData.tags.forEach(tag => {
      userTags.value.push(tag);
    });

  }
  // If the user logged out
  else {

    // Empty the tags
    while (userTags.value.length > 0) {
      userTags.value.pop();
    }

  }
});

//#region AUTH EMITS CALLBACKS
function onAuthSignin() {
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
    <HeaderRow :tags="userTags"></HeaderRow>

    <TrackRow v-for="track in trackList" :title="track.title" :artist="track.artist" :duration="track.duration"
      :genre="track.genre" :key="track.id"></TrackRow>
  </table>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  height: 8vh;
  background-color: #3a3a3a;
  padding: 0px 50px;
  margin-bottom: 10px;
}

header img {
  float: left;
  max-width: 100%;
  max-height: 100%;
}

body {
  background-color: #121212;
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
