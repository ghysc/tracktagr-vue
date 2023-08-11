
<script setup>
import { ref } from 'vue'
import {
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import {
    useFirebaseAuth
} from 'vuefire'
import InputEmail from './InputEmail.vue'
import InputPasswordNewUser from './InputPasswordNewUser.vue'
import InputPassword from './InputPassword.vue'

const emits = defineEmits(['onSuccess', 'onFailure']);

const vuefireAuth = useFirebaseAuth();

const enteringEmail = ref(true);
const newUser = ref(false);
const email = ref('');

function validateEmail(emailParam) {
    fetchSignInMethodsForEmail(vuefireAuth, emailParam.value)
        .then((method) => {
            if (method.includes("password") == false)
                newUser.value = true;
            else
                newUser.value = false;
            email.value = emailParam.value;
        })
        .catch((error) => {
            emits('onFailure', error);
        });

    enteringEmail.value = false;
}

function createUserEmailAndPassword(passwordParam) {
    createUserWithEmailAndPassword(vuefireAuth, email.value, passwordParam.value)
        .then((userCredential) => {
            // Signed in
            emits('onSuccess', userCredential);
        })
        .catch((error) => {
            emits('onFailure', error);
        });
}

function signInEmailAndPassword(passwordParam) {
    signInWithEmailAndPassword(vuefireAuth, email.value, passwordParam.value)
        .then((userCredential) => {
            // Signed in!
            emits('onSuccess', userCredential);
        })
        .catch((error) => {
            emits('onFailure', error);
        });
}
</script>

<template>
    <div v-if="enteringEmail">
        Welcome to TrackTagr
        <InputEmail @validate="validateEmail"></InputEmail>
    </div>
    <div v-else>
        <div v-if="newUser">
            Welcome new user
            <InputPasswordNewUser @validate="createUserEmailAndPassword"></InputPasswordNewUser>
        </div>
        <div v-else>
            Welcome back
            <InputPassword @validate="signInEmailAndPassword"></InputPassword>
        </div>
    </div>
</template>

<style></style>