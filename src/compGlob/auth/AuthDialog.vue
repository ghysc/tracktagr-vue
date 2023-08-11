
<script setup>
import { ref } from 'vue'
import {
    useCurrentUser
} from 'vuefire'
import AuthEmailPassword from './AuthEmailPassword.vue'
import AuthGoogle from './AuthGoogle.vue'
import AuthSignout from './AuthSignout.vue'

const emits = defineEmits(['onSignin', 'onSignout', 'onFailure']);

const dialogElement = ref(null);

function onSignin(userCredential) {
    console.log("Signin depuis AuthDialog");
    dialogElement.value.close();
    // TODO some other feedbacks
    emits('onSignin', userCredential);
}

function onSignout() {
    console.log("Signout depuis AuthDialog");
    dialogElement.value.close();
    // TODO some other feedbacks
    emits('onSignout');
}

function onFailure(error) {
    console.log("Failure depuis AuthDialog");
    emits('onFailure', error);
}
</script>

<template>
    <dialog ref="dialogElement">
        <div v-show="useCurrentUser().value == null">
            <AuthEmailPassword @onSuccess="onSignin" @onFailure="onFailure"></AuthEmailPassword>
            <br/>
            <AuthGoogle @onSuccess="onSignin" @onFailure="onFailure"></AuthGoogle>
            <br/>
            <br/>
        </div>
        <div v-show="useCurrentUser().value != null">
            <AuthSignout @onSuccess="onSignout" @onFailure="onFailure"></AuthSignout>
            <br/>
            <br/>
        </div>
        <button @click="dialogElement.close()">Close</button>
    </dialog>

    <button @click="dialogElement.showModal()">Sign in</button>
</template>

<style>
dialog {
    display: flex;
    flex-direction: column;
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
</style>