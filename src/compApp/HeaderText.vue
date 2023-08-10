
<script setup>
defineProps({
    placeholder: String
});
</script>

<template>
    <input type="search" class="search" :placeholder="placeholder"> <!--oninput="filterText(this)"-->
</template>

<style>
.search {
    /* Full-width */
    width: 90%;
    /* Increase font-size */
    font-size: 16px;
    /* Add some padding */
    padding: 12px 20px 12px 12px;
    /* Add a grey border */
    border: 1px solid #ddd;
    /* Add some space below the input */
    margin-bottom: 8px;
}
</style>