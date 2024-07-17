<template>
    <div class="LoaderOverlay absolute-full flex flex-center q-z-max">
        <q-spinner size="4em" color="primary" />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.LoaderOverlay {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
}
</style>