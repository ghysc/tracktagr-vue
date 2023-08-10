
<script setup>
import { ref } from 'vue'

const password1 = ref('');
const password2 = ref('');
const password2Element = ref('');

const emit = defineEmits(['validate']);

function clearValidity() {
    password2Element.value.setCustomValidity('');
    password2Element.value.reportValidity();
}

function submit() {
    if (password1.value == password2.value) {
        password2Element.value.setCustomValidity('');
        emit('validate', password1);
    } else {
        password2Element.value.setCustomValidity("Passwords Don't Match");
        password2Element.value.reportValidity();
    }
    //e.preventDefault();
}
</script>

<template>
    <div>
        <input type="password" v-model="password1" placeholder="Create password" />
        <input type="password" v-model="password2" @keydown="clearValidity" placeholder="Confirm password"
            ref="password2Element" />
        <button @click="submit">Submit</button>
    </div>
</template>

<style></style>