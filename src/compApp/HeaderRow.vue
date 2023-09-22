
<script setup>
import {
    computed,
    inject
} from 'vue'
import HeaderText from './HeaderText.vue'
import HeaderDropdown from './HeaderDropdown.vue'

const tags = inject('tags');

// https://vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results
const sortedTags = computed(() => {
    return tags.value.slice().sort((a, b) => {
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        if (a.order < b.order)
            return -1;
        else if (a.order > b.order)
            return 1;
        return 0;
    });
});
</script>

<template>
    <tr class="header">
        <th v-for="tag in sortedTags" :key=tag.order>
            <HeaderText     v-if="tag.type == 'String'"         :id=tag.id></HeaderText>
            <HeaderDropdown v-else-if="tag.type == 'Dropdown'"  :id=tag.id></HeaderDropdown>
            <div            v-else-if="tag.type == 'Number'"> {{ tag.label }} </div>
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