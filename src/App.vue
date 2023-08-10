
<script setup>
// import { useCollection } from 'vuefire'
// import { collection } from 'firebase/firestore'
import { ref } from 'vue'
import AuthDialog from './compGlob/AuthDialog.vue'
import HeaderRow from './compApp/HeaderRow.vue'
import TrackRow from './compApp/TrackRow.vue'

const title = "Title";
const artist = "Artist(s)";
const duration = "Duration";
const genre = "Genre";

// const todos = useCollection(collection(db, 'tracks'));
const trackList = ref([
  { id: 0, title: 'Setting Sun', artist: 'George FitzGerald', duration: 374, genre: 'Rap' },
  { id: 1, title: 'mirage', artist: 'sir bennett', duration: 165, genre: 'Classic' }
]);
</script>

<template>
  <header>
    <img src="./assets/logo.png">
    <AuthDialog></AuthDialog>
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
