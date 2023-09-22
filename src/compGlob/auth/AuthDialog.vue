
<script setup>
import { ref } from 'vue'
import {
    useCurrentUser
} from 'vuefire'
import AuthEmailPassword from './AuthEmailPassword.vue'
import AuthGoogle from './AuthGoogle.vue'
import AuthSignout from './AuthSignout.vue'
const emits = defineEmits(['onSignin', 'onSignout', 'onFailure']);

const authDialogButtonOpenClass = ref("authDialogButtonOpenClass");
const authDialogClass = ref("authDialogClass");
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
    <button :class="authDialogButtonOpenClass" @click="authDialogElement.showModal()">
        My Profile
    </button>

    <dialog :class="authDialogClass" ref="authDialogElement">
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
</template>

<style scoped>
.authDialogClass::backdrop {
    background-blend-mode: screen;
    background-color: rgba(0, 0, 0, 0.5);
}

.authDialogButtonOpenClass {
    float: right;
    color: black;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;
}

.authDialogButtonOpenClass:hover {
  background-color: #ddd;
  color: black;
}

.authDialogButtonOpenClass.active {
  background-color: dodgerblue;
  color: white;
}
</style>