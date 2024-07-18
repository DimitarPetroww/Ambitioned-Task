<template>
    <DialogModal :showModal="showModal" title="Confirm Deletion" :confirmButton="true"
        @update:showModal="updateShowModal" @confirm="confirm">
        Are you sure you want to delete this user?
    </DialogModal>
</template>

<script setup lang="ts">
import DialogModal from './DialogModal.vue';

const props = defineProps({
    showModal: Boolean,
    userId: String
});

const emit = defineEmits(['update:showModal', 'confirm']);

const updateShowModal = (value: boolean): void => {
    emit('update:showModal', value);
};

const confirm = (): void => {
    emit('confirm', props.userId);
};
</script>
