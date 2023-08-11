
<script setup>
import { ref } from 'vue'

const password = ref('');

const emit = defineEmits(['validate']);

function submit() {
    emit('validate', password);
    //e.preventDefault();
}
</script>

<template>
    <div>
        <input type="password" v-model="password" placeholder="******" />
        <button @click="submit">Submit</button>
    </div>
</template>

<style></style>