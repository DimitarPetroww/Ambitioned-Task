import { User } from './user';

export type AuthUser = Pick<User, 'email'>;

export type AuthState = {
    isAuthenticated: boolean;
    user: AuthUser | null;
}