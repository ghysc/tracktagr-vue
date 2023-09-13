
<script setup>
import {
  ref,
  computed
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
  { id: "title", label: "Title", type: "String", order: 0, filter: "" },
  { id: "artist", label: "Artist(s)", type: "String", order: 1, filter: "" },
  { id: "duration", label: "Duration", type: "Number", order: 2, filter: 0 }
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
const track02 = {
  id: 1,
  tags: [
    { key: "title", value: "Otona Blue" },
    { key: "artist", value: "Atarashii Gakko!" },
    { key: "duration", value: 191 }
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
      await DB.addTrack(currentUser, track02);
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

const filteredTracks = computed(() => {
  const tracks = userTracks.value.slice();
  // Filtrer les pistes en fonction des tags et de leurs filtres correspondants
  return tracks.filter((track) => {
    return userTags.value.every((tag) => {
      const trackTag = track.find((t) => t.key === tag.id);
      // Comparer la valeur du tag dans la piste avec le filtre du tag utilisateur
      switch (tag.type) {
        case "String":
          return trackTag.value.toLowerCase().includes(tag.filter.toLowerCase());
        case "Number":
          return Number(trackTag.value) >= Number(tag.filter);
        default:
          // Si le tag correspondant n'est pas trouvé dans la piste, inclure la piste
          return true;
      }
    });
  });
});

//#region HEADER FILTER CALLBACKS
function onUpdateFilter(filter, tagID) {
  userTags.value.find(tag => tag.id == tagID).filter = filter;
}
//#endregion

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
    <HeaderRow :tags="userTags" @onUpdateFilter="onUpdateFilter"></HeaderRow>

    <TrackRow v-for="track in filteredTracks" :tags="userTags" :track=track :key=track.id></TrackRow>
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
