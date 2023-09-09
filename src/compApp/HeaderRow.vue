
<script setup>
import {
    computed
} from 'vue'
import HeaderText from './HeaderText.vue'
import HeaderTag from './HeaderTag.vue'

const props = defineProps({
    tags: Array
});

// https://vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results
const sortedTags = computed(() => {
    return props.tags.slice().sort(compare);
});

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function compare(a, b) {
    if (a.order < b.order)
        return -1;
    else if (a.order > b.order)
        return 1;
    return 0;
}
</script>

<template>
    <!-- <tr v-if="tags.value == undefined" class="header">
        <th>Please add a tag hhh</th>
    </tr> -->
    <tr class="header">
        <th v-for="tag in sortedTags" :key=tag.order>
            <HeaderText v-if="tag.type == 'String'" :placeholder=tag.label></HeaderText>
            <HeaderTag v-else-if="tag.type == 'Tag'" :name=tag.label></HeaderTag>
            <div v-else-if="tag.type == 'Number'">{{ tag.label }}</div>
        </th>
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