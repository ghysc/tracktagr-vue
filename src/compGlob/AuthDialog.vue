
<script setup>
import { ref } from 'vue'
// import {
    //     signOut
// } from 'firebase/auth'
// import {
    // useFirebaseAuth,
    // useCurrentUser
// } from 'vuefire'
import AuthEmailPassword from './AuthEmailPassword.vue'
import AuthGoogle from './AuthGoogle.vue'

// const vuefireAuth = useFirebaseAuth();
const dialogElement = ref(null);

function onSuccess() {
    dialogElement.value.close();
    // TODO some other feedbacks
}
</script>

<template>
    <dialog ref="dialogElement">
        <AuthEmailPassword @onSuccess="onSuccess"></AuthEmailPassword>
        <br/>
        <AuthGoogle @onSuccess="onSuccess"></AuthGoogle>
        <br/>
        <br/>
        <button @click="dialogElement.close()">Close</button>
    </dialog>

    <button @click="dialogElement.showModal()">Sign in</button>
</template>

<style>
dialog {
    opacity: 0;
    scale: 0;
    display: block;
    transition: all .5s;
}

dialog[open] {
    opacity: 1;
    scale: 2;
}

dialog::backdrop {
    background-blend-mode: screen;
    background-color: rgba(0, 0, 0, 0.5);
}

form {
    display: flex;
    flex-direction: column;
}

form:valid {}

form:invalid {}
</style>