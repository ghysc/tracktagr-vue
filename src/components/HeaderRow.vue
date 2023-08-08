
<script setup>
import HeaderText from './HeaderText.vue'
import HeaderTag from './HeaderTag.vue'

const title = "Title";
const artist = "Artist(s)";
const length = "Length";
const genre = "Genre";
</script>

<template>
    <tr class="header">
        <th><HeaderText :placeholder=title></HeaderText></th>
        <th><HeaderText :placeholder=artist></HeaderText></th>
        <th>{{ length }}</th>
        <th><HeaderTag :name=genre></HeaderTag></th>
    </tr>
</template>

<style>
.header {
    /* Add a grey background color to the table header and on hover */
    background-color: #535353;
}

.header th {
    /* Left-align text */
    text-align: left;
    /* Add padding */
    padding: 12px;
}
</style>