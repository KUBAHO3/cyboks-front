export type UserResponse = {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    },
    token: string,
    message: string;
    success: boolean;
}