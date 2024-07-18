<template>
    <q-dialog v-model="internalShowModal">
        <q-card class="full-width">
            <q-card-section>
                <h6 class="q-my-none">{{ title }}</h6>
            </q-card-section>

            <q-card-section>
                <slot></slot>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" @click="cancel" />
                <q-btn flat label="Confirm" color="negative" @click="confirm" v-if="confirmButton" />
                <q-btn flat label="Submit" color="primary" @click="submit" v-if="submitButton" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    showModal: Boolean,
    title: String,
    confirmButton: Boolean,
    submitButton: Boolean,
    userId: String
});

const emit = defineEmits(['update:showModal', 'confirm', 'submit']);

const internalShowModal = ref(props.showModal);

watch(() => props.showModal, (newValue) => {
    internalShowModal.value = newValue;
});

const cancel = (): void => {
    emit('update:showModal', false);
};

const confirm = (): void => {
    emit('confirm', props.userId);
    emit('update:showModal', false);
};

const submit = (): void => {
    emit('submit');
    emit('update:showModal', false);
};
</script>
