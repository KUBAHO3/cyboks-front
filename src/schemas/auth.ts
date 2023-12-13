import * as z from "zod";

export const signinSchema = z.object({
    email: z.string().email("Please provide a valid email."),

    password: z.string().min(1, {
        message: "Please provide the password.",
    }),
});

export const forgetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Please provide the email address.")
        .email("Please provide a valid email address."),
});

export const newPasswordSchema = z
    .object({
        password: z.string().min(1, "Please provide your new password."),
        passwordConfirm: z.string().min(1, "Please confirm your password."),
    })
    .superRefine(({ passwordConfirm, password }: any, ctx) => {
        if (passwordConfirm !== password) {
            ctx.addIssue({
                path: ["passwordConfirm"],
                code: "custom",
                message: "The passwords don't match",
            });
        }
    });


export const signupSchema = z
    .object({
        username: z.string().min(2, {
            message: "Please provide your username.",
        }),

        email: z.string().email("Please provide a valid email address."),

        companyName: z.string().min(2, {
            message: "The company name must be at least 2 characters long.",
        }).optional(),

        companyPhoneNumber: z.string().min(9, {
            message: "The company number must be at least 9 characters long.",
        }).optional(),

        password: z.string().min(1, "Please provide your new password."),

        passwordConfirm: z.string().min(1, "Please confirm your password."),
    })
    .superRefine(({ passwordConfirm, password }: any, ctx) => {
        if (passwordConfirm !== password) {
            ctx.addIssue({
                path: ["passwordConfirm"],
                code: "custom",
                message: "The passwords don't match",
            });
        }
    });
