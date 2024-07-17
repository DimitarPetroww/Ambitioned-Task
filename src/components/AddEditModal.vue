<template>
    <q-dialog v-model="internalShowModal">
        <q-card class="full-width">
            <q-card-section>
                <h6 class="q-my-none">{{ title }}</h6>
            </q-card-section>

            <q-form @submit="submitUser">
                <q-card-section>
                    <q-input v-model="userData.name" label="Name" :rules="nameRules" />
                    <q-input v-model="userData.email" label="Email" :rules="emailRules" />
                    <q-input v-model="userData.age" label="Age" min="1" type="number" :rules="ageRules" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" @click="closeModal" type="button" />
                    <q-btn flat label="Submit" color="primary" type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { ValidationRule } from 'quasar';
import { PostUser, User } from '../types/user';

const props = defineProps({
    showModal: Boolean,
    mode: String,
    user: Object as () => User | null
});

const emit = defineEmits(['update:showModal', 'submit']);

// Reactive
const userData = ref<User>({ _id: '', name: '', email: '', age: 0 });
const internalShowModal = ref(props.showModal);

// Watchers
watch(() => props.showModal, (newVal) => {
    internalShowModal.value = newVal;
});

watch(() => internalShowModal.value, (newVal) => {
    emit('update:showModal', newVal);
});

watch(() => props.user, (newVal) => {
    userData.value = newVal || { _id: '', name: '', email: '', age: 0 };
});

// Computed
const title = computed(() => (props.mode === 'edit' ? 'Edit User' : 'Add New User'));

//Validation Rules

const nameRules: ValidationRule[] = [
    (val) => !!val || 'Name is required!'
];

const emailRules: ValidationRule[] = [
    (val) => !!val || 'Email required!',
    (val, rules) => rules.email(val) || 'Please enter a valid email address'
];

const ageRules: ValidationRule[] = [
    (val) => !!val || 'Age is required!'
];

//Methods
const closeModal = (): void => {
    internalShowModal.value = false;
};

const submitUser = (): void => {
    const postUser: PostUser = { name: userData.value.name, email: userData.value.email, age: userData.value.age };

    emit('submit', postUser, userData.value._id);
    closeModal();
};
</script>
