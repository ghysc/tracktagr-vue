
<script setup>
defineProps({
    name: String
});
</script>

<template>
    <button type="button" class="tagsButton"> <!--onclick="showHideFilterTags(this)"-->
        {{ name }}
    </button>

    <fieldset class="tagsSet" hidden="true">
        <legend>Tags</legend>

        <form action="" method="post" class="tagsForm" onsubmit="return validateTagsForm(this)">
            <input type="text" placeholder="Create tag here" name="newtag" required>
            <input type="submit" value="Submit">
        </form>
    </fieldset>
</template>

<style></style>