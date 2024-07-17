<template>
    <q-page>
        <q-table :hide-bottom="true" title="Users" :rows="rows" :columns="columns" row-key="_id"
            no-data-label="No users found!">
            <template v-slot:top>
                <q-btn label="Add User" color="primary" @click="openModal(ModalActions.ADD)" />
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td class="text-center">
                    <q-btn icon="edit" color="blue" @click="openModal(ModalActions.EDIT, { ...props.row })" flat
                        dense />
                    <q-btn icon="delete" color="red" @click="removeRow(props.row._id)" flat dense />
                </q-td>
            </template>
        </q-table>

        <AddEditUserModal :showModal="showModal" :mode="modalMode" :user="selectedUser"
            @update:showModal="showModal = $event" @submit="handleUserSubmit" />
        <LoaderOverlay v-if="isLoading" />
    </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QTableColumn, Notify } from 'quasar';
import { PostUser, User } from '../types/user';
import { ModalActions } from '../types/modal';
import AddEditUserModal from '../components/AddEditModal.vue';
import LoaderOverlay from '../components/LoaderOverlay.vue';
import { TABLE_COLUMNS } from '../config/table';
import { createUser, deleteUser, editUser, getUsers } from '../services/authService';

defineOptions({
    name: 'HomePage'
});

const rows = ref<User[]>([]);
const isLoading = ref<boolean>(false);

const columns = ref<QTableColumn[]>(TABLE_COLUMNS);

const showModal = ref<boolean>(false);
const modalMode = ref<ModalActions>(ModalActions.ADD);
const selectedUser = ref<User | null>(null);

const fetchData = async (): Promise<void> => {
    try {
        isLoading.value = true;
        const response = await getUsers();
        rows.value = await response.json();
    } catch (error) {
        console.error('Error obtaining rows:', error);
    } finally {
        isLoading.value = false;
    }
};

const removeRow = async (id: string): Promise<void> => {
    try {
        isLoading.value = true;
        await deleteUser(id)
        rows.value = rows.value.filter(row => row._id !== id);
    } catch (error) {
        Notify.create({ type: 'negative', message: `Error deleting row: ${error}` })
    } finally {
        isLoading.value = false;
    }
};

const openModal = (mode: ModalActions, user: User | null = null): void => {
    modalMode.value = mode;
    selectedUser.value = user;
    showModal.value = true;
};

const handleUserSubmit = async (user: PostUser, userId: string): Promise<void> => {
    const apiCall = modalMode.value === ModalActions.ADD ? createUser : editUser;

    try {
        isLoading.value = true;
        const response = await apiCall(user, userId);

        if (!response.ok) {
            Notify.create({
                type: 'negative',
                message: `Error ${modalMode.value === ModalActions.ADD ? 'adding' : 'updating'} row`
            });
            return;
        }

        if (modalMode.value === ModalActions.ADD) {
            const newUser = await response.json();
            rows.value.push(newUser);
            return;
        }

        const index = rows.value.findIndex(row => row._id === userId);
        if (index !== -1) {
            rows.value[index] = { _id: userId, ...user };
        }
    } catch (error) {
        Notify.create({ type: 'negative', message: `Error submitting row: ${error}` });
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchData);
</script>
