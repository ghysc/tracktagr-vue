
<script setup>
defineProps({
    title: String,
    artist: String,
    length: Number,
    genre: String
});
</script>

<template>
    <tr class="track">
        <td>{{ title }}</td>
        <td>{{ artist }}</td>
        <td>{{ Math.trunc(length / 60) }}:{{ (length % 60) }}</td>
        <td>{{ genre }}</td>
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