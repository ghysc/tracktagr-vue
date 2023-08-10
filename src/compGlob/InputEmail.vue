
<script setup>
import { ref } from 'vue'

const email = ref('');

const emit = defineEmits(['validate']);

function next() {
    emit('validate', email);
    //e.preventDefault();
}
</script>

<template>
    <div>
        <input type="email" v-model="email" placeholder="name@email.com" />
        <button @click="next">Next</button>
    </div>
</template>

<style></style>