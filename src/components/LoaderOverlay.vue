<template>
    <div class="LoaderOverlay">
        <q-spinner size="4em" color="primary" />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.LoaderOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
</style>