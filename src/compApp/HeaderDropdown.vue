
<script setup>
import {
    ref,
    computed,
    inject
} from 'vue'

const props = defineProps({
    id: String
});

const tags = inject('tags');
const currentTag = tags.value.find(tag => tag.id.includes(props.id));

const dropdownDialogButtonOpenClass = ref("dropdownDialogButtonOpenClass");
const dropdownDialogClass = ref("dropdownDialogClass");
const dropdownDialogElement = ref(null);

// https://vuejs.org/guide/essentials/list.html#displaying-filtered-sorted-results
const sortedValues = computed(() => {
    return currentTag.filter.slice().sort((a, b) => {
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        if (a.order < b.order)
            return -1;
        else if (a.order > b.order)
            return 1;
        return 0;
    });
});

function onClick(event) {
    const currentFilter = currentTag.filter.find(el => el.name.includes(event.target.id));
    if (currentFilter != undefined)
        currentFilter.on = event.target.checked;
    else
        console.error("Current filter not found, with " + event.target.id);
}
</script>

<template>
    <button :class="dropdownDialogButtonOpenClass" @click="dropdownDialogElement.showModal()">
        {{ currentTag.label }}
    </button>

    <dialog :class="dropdownDialogClass" ref="dropdownDialogElement">
        <fieldset>
            <legend>Tags</legend>

            <div v-for="value in sortedValues" :key="value.order">
                <input type="checkbox" :id="value.name" :checked="value.on" @click="event => onClick(event)" />
                <label :for="value.name">{{ value.name }}</label>
            </div>
        </fieldset>
        <button @click="dropdownDialogElement.close()">Close</button>
    </dialog>
</template>

<style scoped>
.dropdownDialogClass {
    position: absolute;
    top: inherit;
    left: inherit;
    bottom: inherit;
    right: inherit;
}

.dropdownDialogClass::backdrop {
    background-blend-mode: screen;
    background-color: rgba(0, 0, 0, 0);
}
</style>