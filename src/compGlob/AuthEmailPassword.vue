
<script setup>
import { ref } from 'vue'
import {
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
    // createUserWithEmailAndPassword,
} from 'firebase/auth'
import {
    useFirebaseAuth
} from 'vuefire'
import InputEmail from './InputEmail.vue'
import InputPassword from './InputPassword.vue'

const emits = defineEmits(['onSuccess', 'onFailure']);

const vuefireAuth = useFirebaseAuth();

const enteringEmail = ref(true);
const newUser = ref(false);
const email = ref('');

function validateEmail(emailParam) {
    fetchSignInMethodsForEmail(vuefireAuth, emailParam.value)
        .then((method) => {
            if (method.length == 0)
                newUser.value = true;
            else
                newUser.value = false;
            email.value = emailParam.value;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            emits('onFailure');
            console.error(errorMessage + ' : ' + errorCode);
        });

    enteringEmail.value = false;
}

function validatePassword(passwordParam) {
    signInWithEmailAndPassword(vuefireAuth, email.value, passwordParam.value)
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

// function createUserEmailAndPassword() {
//     createUserWithEmailAndPassword(vuefireAuth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log(user + " is now connected!");
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error(errorMessage + ' : ' + errorCode);
//         });
// }
</script>

<template>
    <form method="post">

        <div v-if="enteringEmail">
            Welcome to TrackTagr
            <InputEmail @validate="validateEmail"></InputEmail>
        </div>
        <div v-else>
            <div v-if="newUser">
                Welcome new user
                <InputPassword @validate="validatePassword"></InputPassword>
                <InputPassword @validate="validatePassword"></InputPassword>
            </div>
            <div v-else>
                Welcome back
                <InputPassword @validate="validatePassword"></InputPassword>
            </div>
        </div>

    </form>
</template>

<style></style>