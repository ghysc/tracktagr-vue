
<script setup>
// import { useCollection } from 'vuefire'
// import { collection } from 'firebase/firestore'
import { ref } from 'vue'
import HeaderRow from './components/HeaderRow.vue'
import TrackRow from './components/TrackRow.vue'

// const todos = useCollection(collection(db, 'tracks'));
const trackList = ref([
  { id: 0, title: 'Setting Sun', artist: 'George FitzGerald', length: '6:14', genre: 'Rap' },
  { id: 1, title: 'mirage', artist: 'sir bennett', length: '2:45', genre: 'Classic' }
]);
</script>

<template>
  <table id="table">
    <HeaderRow></HeaderRow>
    <TrackRow v-for="track in trackList" 
    :title="track.title" 
    :artist="track.artist" 
    :length="track.length"
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
