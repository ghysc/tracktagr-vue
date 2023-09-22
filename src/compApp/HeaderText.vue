
<script setup>
import { inject } from 'vue'

const props = defineProps({
    id: String
});

const tags = inject('tags');
const currentTag = tags.value.find(tag => tag.id.includes(props.id));

function onInput(event) {
    currentTag.filter = event.target.value;
}
</script>

<template>
    <input type="search" class="search" :placeholder="currentTag.label" @input="event => onInput(event)" />
</template>

<style>
.search {
    /* Full-width */
    width: 90%;
    /* Increase font-size */
    font-size: 16px;
    /* Add some padding */
    padding: 12px 20px 12px 12px;
    /* Add a grey border */
    border: 1px solid #ddd;
    /* Add some space below the input */
    margin-bottom: 8px;
}
</style>