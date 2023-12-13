"use client";

import InputError from "@/components/forms/InputError";
import { newPasswordSchema } from "@/schemas/auth";
import { server } from "@/utils/axios";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type NewPasswordForm = z.infer<typeof newPasswordSchema>;

export default function ForgetPassword() {
  // local states
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();

  // get the token from the url
  const token = useSearchParams().get("token");

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordForm>({
    mode: "onSubmit",
    resolver: zodResolver(newPasswordSchema),
  });

  // submit handler
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const res = await server.patch<any>(
      `/auth/new-password/${token}/${data.password}`
    );

    if (res.data == true) {
      setIsLoading(false);

      toast.success(
        "Your password has been reset successfully. Please login!",
        {
          toastId: "auth-message",
        }
      );

      router.push("/");
    }

    if (res.data !== true) {
      setIsLoading(false);

      toast.error(
        "Something went wrong. The token is invalid or has expried.",
        {
          toastId: "auth-message",
        }
      );
    }
  });

  return (
    <main className="bg-slate-50 xl:px-56 lg:px-36 md:px-28 sm:px-16 px-8 pt-16 h-screen">
      <div className="bg-cover bg-[url('../assets/images/reset_bg.png')] lg:px-36 md:px-28 sm:px-16 px-8 rounded-2xl shadow-xl">
        <h1 className="text-white font-bold text-center py-16 text-4xl">
          Reset Password
        </h1>
        <form
          action=""
          onSubmit={onSubmit}
          className="flex flex-col gap-[1.5rem]"
        >
          <div className="px-24">
            <label
              htmlFor="passwird"
              className="text-gray-700 text-sm text-white font-normal"
            >
              Type new password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[5px]"
              placeholder="Your new password"
              {...register("password")}
            />

            <InputError error={errors.password?.message} />
          </div>

          <div className="px-24">
            <label
              htmlFor="passwordConfirm"
              className="text-gray-700 text-sm text-white font-normal"
            >
              Confirm your password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[5px]"
              placeholder="Confirm password"
              {...register("passwordConfirm")}
            />

            <InputError error={errors.passwordConfirm?.message} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-white hover:bg-green-50 text-violet-500 font-semibold py-2 my-11 w-1/4 rounded-lg border"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 22, color: "#000" }}
                      spin
                    />
                  }
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      <p className="text-white text-xl font-normal  text-center absolute inset-x-0 bottom-3">
        Terms and conditions | FCyboks
      </p>
    </main>
  );
}
