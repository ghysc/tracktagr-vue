
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
            emits('onFailure', error);
        });
}
</script>

<template>
    <button @click="signinPopup">Sign in with Google</button>
</template>

<style></style>