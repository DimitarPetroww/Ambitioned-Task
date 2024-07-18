<template>
  <q-page class="column flex-center LoginPage bg-primary">
    <q-form class="LoginPage__form q-pa-lg bg-white rounded-borders" @submit="onLoginSubmit">
      <h3 class="text-weight-bold q-my-lg">Login</h3>
      <q-input v-model="email" label="Email" lazy-rules :rules="emailRules" />
      <q-input v-model="password" label="Password" :type="isPassword ? 'password' : 'text'" lazy-rules
        :rules="passwordRules">
        <template v-slot:append>
          <q-icon :name="iconName" class="cursor-pointer" @click="isPassword = !isPassword" />
        </template>
      </q-input>
      <q-btn label="Submit" type="submit" color="primary" class="q-mt-sm" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { ValidationRule } from 'quasar';
import auth from '../context/authContext';

defineOptions({
  name: 'LoginPage'
});

const router = useRouter();
const isPassword = ref<boolean>(true);
const email = ref<string>('');
const password = ref<string>('');

const emailRules: ValidationRule[] = [
  (val) => !!val || 'Email required!',
  (val, rules) => rules.email(val) || 'Please enter a valid email address'
]

const passwordRules: ValidationRule[] = [
  (val) => !!val || 'Password required!',
  (val) => val.length >= 8 || 'Password must be 8 characters long'
];

const iconName = computed(() => isPassword.value ? 'visibility_off' : 'visibility');

const onLoginSubmit = (): void => {
  const user = { email: email.value };

  auth.login(user);
  router.push('/');
}
</script>

<style lang="scss" scoped>
.LoginPage {
  &__form {
    max-width: 500px;
    width: calc(100% - 32px);
    margin: 0 16px;
  }
}
</style>