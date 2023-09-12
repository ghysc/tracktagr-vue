
<script setup>
import {
  ref,
  //watch
} from 'vue'
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import DB from './database'
import AuthDialog from './compGlob/auth/AuthDialog.vue'
import HeaderRow from './compApp/HeaderRow.vue'
import TrackRow from './compApp/TrackRow.vue'

const auth = getAuth();

let currentUser = undefined;

const userTags = ref([]);
const defaultTags = [
  { id: "title", label: "Title", type: "String", order: 0, },
  { id: "artist", label: "Artist(s)", type: "String", order: 1 },
  { id: "duration", label: "Duration", type: "Number", order: 2 }
];

const userTracks = ref([]);
const track01 = {
  id: 0,
  tags: [
    { key: "title", value: "Setting Sun" },
    { key: "artist", value: "George FitzGerald" },
    { key: "duration", value: 374 }
  ]
};

// Callback method automatically called when Firebase Authentification state changes 
onAuthStateChanged(auth, async userAuth => {
  if (userAuth) {
    currentUser = userAuth;

    // Try to get user
    const userDB = await DB.retrieveUser(currentUser);

    // If they doesn't exist, create them
    if (userDB == undefined) {
      await DB.createUser(currentUser, defaultTags);

      // TEMP manually add default tracks
      await DB.addTrack(currentUser, track01);
    }

    // Add user's tags to page
    DB.processTags(currentUser, (tag) => {
      userTags.value.push(tag);
    });

    // Add user's tracks to page
    DB.processTracks(currentUser, (track) => {
      userTracks.value.push(track.tags)
    });
  }
  else {
    // Empty the tags
    while (userTags.value.length > 0) {
      userTags.value.pop();
    }
    // Empty the tracks
    while (userTracks.value.length > 0) {
      userTracks.value.pop();
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

    <TrackRow v-for="track in userTracks" :tags="userTags" :track=track :key=track.id></TrackRow>
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
