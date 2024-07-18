import { reactive } from 'vue';
import { AuthState, AuthUser } from 'src/types/auth';

const state = reactive<AuthState>({
    isAuthenticated: false,
    user: null,
});

const login = (user: AuthUser): void => {
    state.isAuthenticated = true;
    state.user = user;

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
}

const logout = (): void => {
    state.isAuthenticated = false;
    state.user = null;

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
}

const initializeAuth = (): void => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');

    if (!isAuthenticated) return;

    state.isAuthenticated = true;
    state.user = user ? JSON.parse(user) : null;
}

export default {
    state,
    login,
    logout,
    initializeAuth
};
