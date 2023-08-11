
<script setup>
import {
    signOut
} from 'firebase/auth'
import {
    useFirebaseAuth
} from 'vuefire'

const emits = defineEmits(['onSuccess', 'onFailure']);

const vuefireAuth = useFirebaseAuth();

function signout() {
    signOut(vuefireAuth)
        .then(() => {
            // Signed out!
            emits('onSuccess');
        })
        .catch((error) => {
            emits('onFailure', error);
        });
}
</script>

<template>
    <button @click="signout">Sign Out</button>
</template>

<style></style>