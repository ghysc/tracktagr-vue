
<script setup>
import {
    computed
} from 'vue'
import TrackDuration from './TrackDuration.vue'

const props = defineProps({
    tags: Array,
    track: Array
});

// https://vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results
const sortedTracks = computed(() => {
    return props.track.slice().sort(compare);
});

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function compare(a, b) {
    const tagA = props.tags.find(tag => tag.id === a.key);
    const tagB = props.tags.find(tag => tag.id === b.key);
    if (tagA.order < tagB.order)
        return -1;
    else if (tagA.order > tagB.order)
        return 1;
    return 0;
}
</script>

<template>
    <tr class="track">
        <td v-for="(track, index) in sortedTracks" :key=index>
            <div v-if="typeof track.value == 'string'">{{ track.value }}</div>
            <TrackDuration v-else-if="typeof track.value == 'number'" :duration="track.value"></TrackDuration>
        </td>
    </tr>
</template>

<style>
.track {
    /* Add a bottom border to all table rows */
    border-bottom: 1px solid #ddd;
}

.track td {
    text-align: left; /* Left-align text */
    padding: 12px; /* Add padding */
}

.track:hover {
    /* Add a grey background color to the table header and on hover */
    background-color: #535353;
}
</style>