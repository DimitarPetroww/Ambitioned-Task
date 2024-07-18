<template>
    <DialogModal :showModal="showModal" :title="modalTitle" :submitButton="true" @update:showModal="updateShowModal"
        @submit="submit">
        <q-form @submit.prevent="submit">
            <q-input v-model="userData.name" label="Name" :rules="nameRules" />
            <q-input v-model="userData.email" label="Email" :rules="emailRules" />
            <q-input v-model="userData.age" label="Age" min="1" type="number" :rules="ageRules" />
        </q-form>
    </DialogModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { ValidationRule } from 'quasar';
import DialogModal from './DialogModal.vue';
import { PostUser, User } from '../types/user';
import { ModalActions } from '../types/modal';

const defaultUserData = { _id: '', name: '', email: '', age: 1 };

const props = defineProps({
    showModal: Boolean,
    mode: String,
    user: Object as () => User | null
});

const emit = defineEmits(['update:showModal', 'submit']);

// Reactive
const userData = ref<User>(defaultUserData);
const internalShowModal = ref(props.showModal);

// Watchers
watch(() => props.showModal, (newVal) => {
    internalShowModal.value = newVal;
});

watch(() => props.user, (newVal) => {
    userData.value = newVal || defaultUserData;
});

// Computed
const modalTitle = computed(() => (props.mode === ModalActions.EDIT ? 'Edit User' : 'Add New User'));

//Validation Rules
const nameRules: ValidationRule[] = [
    (val) => !!val || 'Name is required!'
];

const emailRules: ValidationRule[] = [
    (val) => !!val || 'Email required!',
    (val) => /\S+@\S+\.\S+/.test(val) || 'Please enter a valid email address'
];

const ageRules: ValidationRule[] = [
    (val) => !!val || 'Age is required!'
];

// Methods
const updateShowModal = (value: boolean): void => {
    emit('update:showModal', value);
};

const submit = (): void => {
    const postUser: PostUser = { name: userData.value.name, email: userData.value.email, age: userData.value.age };
    emit('submit', postUser, userData.value._id);
};
</script>
