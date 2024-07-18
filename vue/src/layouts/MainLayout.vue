<template>
  <q-layout view="lHh Lpr lFf">
    <header class="row justify-between items-center q-pa-lg bg-primary text-white q-gutter-y-md" v-if="isAuthenticated">
      <p class="q-mb-none text-h5">{{ `Welcome, ${userEmail}` }}</p>
      <q-btn label="Logout" color="black" @click="logout" />
    </header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import auth from '../context/authContext';

defineOptions({
  name: 'MainLayout'
});

const router = useRouter();
const isAuthenticated = computed(() => auth.state.isAuthenticated);
const userEmail = computed(() => auth.state.user?.email);

const logout = (): void => {
  auth.logout();
  router.push('/login');
}
</script>