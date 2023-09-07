
<script setup>
import { ref } from 'vue'
import {
    useCurrentUser
} from 'vuefire'
import AuthEmailPassword from './AuthEmailPassword.vue'
import AuthGoogle from './AuthGoogle.vue'
import AuthSignout from './AuthSignout.vue'
const emits = defineEmits(['onSignin', 'onSignout', 'onFailure']);

const authDialogButtonOpen = ref("authDialogButtonOpen");
const authDialogElement = ref(null);

function onSignin(userCredential) {
    authDialogElement.value.close();
    // TODO some other feedbacks
    emits('onSignin', userCredential);
}

function onSignout() {
    authDialogElement.value.close();
    // TODO some other feedbacks
    emits('onSignout');
}

function onFailure(error) {
    emits('onFailure', error);
}
</script>

<template>
    <dialog ref="authDialogElement">
        <div v-show="useCurrentUser().value == null">
            <AuthEmailPassword @onSuccess="onSignin" @onFailure="onFailure"></AuthEmailPassword>
            <br />
            <AuthGoogle @onSuccess="onSignin" @onFailure="onFailure"></AuthGoogle>
            <br />
            <br />
        </div>
        <div v-show="useCurrentUser().value != null">
            <AuthSignout @onSuccess="onSignout" @onFailure="onFailure"></AuthSignout>
            <br />
            <br />
        </div>
        <button @click="authDialogElement.close()">Close</button>
    </dialog>

    <a :class="authDialogButtonOpen" @click="authDialogElement.showModal()">My Profile</a>
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

.authDialogButtonOpen {
    float: right;
    color: black;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;
}

.authDialogButtonOpen:hover {
  background-color: #ddd;
  color: black;
}

.authDialogButtonOpen.active {
  background-color: dodgerblue;
  color: white;
}
</style>