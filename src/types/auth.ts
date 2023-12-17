export type UserResponse = {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        docsId: number;
    },
    token: string,
    message: string;
    success: boolean;
}