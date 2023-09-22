
<script setup>
import {
    computed,
    inject
} from 'vue'
import TrackDuration from './TrackDuration.vue'

const props = defineProps({
    track: Array
});

const tags = inject("tags");

// https://vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results
const orderedTrack = computed(() => {
    return props.track.slice().sort((a, b) => {
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        const tagA = tags.value.find(tag => tag.id === a.key);
        const tagB = tags.value.find(tag => tag.id === b.key);
        if (tagA.order < tagB.order)
            return -1;
        else if (tagA.order > tagB.order)
            return 1;
        return 0;
    });
});

// Returns whether or not the current track's tag is of type 'type'
function tagTypeSelection(trackTag, type) {
    const headerTag = tags.value.find(tag => tag.id == trackTag.key);
    return headerTag.type.includes(type);
}
</script>

<template>
    <tr class="track">
        <td v-for="(trackTag, index) in orderedTrack" :key=index>
            <div v-if="tagTypeSelection(trackTag, 'String')">{{ trackTag.value }}</div>
            <TrackDuration v-else-if="tagTypeSelection(trackTag, 'Number')" :duration="trackTag.value"></TrackDuration>
            <div v-else-if="tagTypeSelection(trackTag, 'Dropdown')">{{ trackTag.value[0] }}</div>
        </td>
    </tr>
</template>

<style>
.track {
    /* Add a bottom border to all table rows */
    border-bottom: 1px solid #ddd;
}

.track td {
    text-align: left;
    /* Left-align text */
    padding: 12px;
    /* Add padding */
}

.track:hover {
    /* Add a grey background color to the table header and on hover */
    background-color: #535353;
}
</style>