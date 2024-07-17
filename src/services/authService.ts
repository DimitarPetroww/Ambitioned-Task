import { PostUser } from '../types/user';

const baseUrl = process.env.RESOURCE_API_URL as string;

export const getUsers = (): Promise<Response> => fetch(baseUrl);
export const deleteUser = (userId: string): Promise<Response> => fetch(`${baseUrl}/${userId}`, { method: 'DELETE' });
export const createUser = (user: PostUser): Promise<Response> => fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
})
export const editUser = (user: PostUser, userId: string): Promise<Response> => fetch(`${baseUrl}/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
})