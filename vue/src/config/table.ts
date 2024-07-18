import { QTableColumn } from 'quasar';

export const TABLE_COLUMNS: QTableColumn[] = [
    { name: 'name', label: 'Name', align: 'left', field: 'name' },
    { name: 'email', label: 'Email', align: 'left', field: 'email' },
    { name: 'age', label: 'Age', align: 'center', field: 'age' },
    { name: 'actions', label: 'Actions', align: 'center', field: () => 'actions' }
];