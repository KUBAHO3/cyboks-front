import { server } from "@/utils/axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {},
                password: {},
            },

            //@ts-ignore
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please provide the email or password.");
                }

                try {
                    const { email, password } = credentials;

                    const res = await server.post("/auth/signin", {
                        userEmail: email,
                        password,
                    }) as any;


                    const { message, success, ...rest } = res.data;

                    return rest;

                } catch (error: any) {
                    console.log("@@@@@ ===>", error.response.data.message || error);

                    throw new Error(
                        error.response.data.message || "Invalid email or password.",
                    );
                }
            }
        }),
    ],

    pages: {
        signIn: "/",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };

            return token;
        },

        async session({ token, session }) {
            session.user = token.user;
            session.token = token.token;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };