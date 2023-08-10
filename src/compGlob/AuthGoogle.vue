
<script setup>
import {
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import {
    useFirebaseAuth
} from 'vuefire'

const emits = defineEmits(['onSuccess', 'onFailure']);

const vuefireAuth = useFirebaseAuth();
const googleAuthProvider = new GoogleAuthProvider();

function signinPopup() {
    signInWithPopup(vuefireAuth, googleAuthProvider)
        .then((userCredential) => {
            // Signed in!
            emits('onSuccess', userCredential);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            emits('onFailure');
            console.error(errorMessage + ' : ' + errorCode);
        });
}
</script>

<template>
    <button @click="signinPopup()">SignIn with Google</button>
</template>

<style></style>