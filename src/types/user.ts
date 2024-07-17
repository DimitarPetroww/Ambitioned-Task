export type User = {
    _id: string;
    name: string;
    email: string;
    age: number;
}

export type PostUser = Omit<User, '_id'>;