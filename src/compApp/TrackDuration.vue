
<script setup>
defineProps({
    duration: Number
});
</script>

<template>
    <div>{{ Math.floor(duration / 60) }}:{{ duration % 60 }}</div>
</template>

<style>
</style>