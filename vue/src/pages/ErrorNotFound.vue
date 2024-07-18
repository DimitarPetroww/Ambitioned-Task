<template>
  <section class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <article>
      <h1>
        404
      </h1>

      <h2 class="q-opacity-40">
        Oops. Nothing here...
      </h2>

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
    </article>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ErrorNotFound'
});
</script>
