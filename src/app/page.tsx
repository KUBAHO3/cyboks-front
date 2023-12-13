"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { signinSchema } from "@/schemas/auth";
import { CheckToggle } from "@/components/check_toggle";
import logo from "../assets/images/logo.png";
import TextInput from "@/components/forms/TextInput";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/components/shared/Spinner";

type SigninForm = z.infer<typeof signinSchema>;

export default function HomePage() {
  // local state
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();

  console.log('Backend Url', process.env.NEXT_PUBLIC_BACKEND_URL)

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({
    mode: "onSubmit",
    resolver: zodResolver(signinSchema),
  });

  // submit handler
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard/cyboks",
    });

    if (res && res.ok) {
      setIsLoading(false);

      return router.push(res.url as string);
    } else {
      setIsLoading(false);

      return toast.error(res?.error);
    }
  });

  return (
    <main className="sm:flex sm:flex-row h-screen w-full bg-cover bg-[url('../assets/images/signup_bg.png')]">
      <div className="lg:w-1/2 w-full h-screen">
        <h1 className="text-4xl font-bold text-white mt-16 pb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-center text-slate-300 text-lg font-bold leading-tight">
          Enter your email and password to sign in
        </p>
        <form onSubmit={onSubmit}>
          <div className="py-8 sm:px-8 mt-2">
            <TextInput
              type="email"
              id="email"
              labelText="Email"
              labelClass="text-white"
              containerClass="mb-[.5rem]"
              inputClass="border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email")}
            />

            <TextInput
              type="password"
              id="password"
              labelText="Password"
              labelClass="text-white"
              inputClass="border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="py-4 pl-16">
              <CheckToggle
                labelName="Remember me!"
                labelClass="ml-3 text-sm font-medium text-white dark:text-gray-300"
                inputClass="sr-only peer"
                containerClass="relative inline-flex items-center cursor-pointer"
                inputType="checkbox"
                bulletClass="w-11 h-4 bg-gray-200 rounded-full peer dark:peer-focus:ring-violet-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"
              />
            </div>
            <div className="px-16">
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 w-full rounded-xl uppercase"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Sign In"}
              </button>
            </div>
            <div className="text-center py-4">
              <Link
                href="/auth/forget"
                className="text-center text-violet-600 font-extrabold  leading-tight"
              >
                Forgot Password?
              </Link>
              <p className="text-white">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-center text-violet-600 font-extrabold  leading-tight"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-black bg-opacity-30 lg:w-1/2 w-full h-screen sm:rounded-l-xl rounded-t-xl">
        <Image
          src={logo}
          width={400}
          height={400}
          alt="The log in background"
          className="max-w-lg mx-auto pt-4"
        />
        <h1 className="text-4xl font-bold text-white pt-8 py-2 text-center">
          Welcome
        </h1>
        <h1 className="text-4xl font-bold text-white py-2 text-center">
          CYBOKS
        </h1>
        <h1 className="text-4xl font-bold text-white py-2 text-center">
          Data Protection System
        </h1>
        <h1 className="text-4xl font-bold text-white py-2 text-center">
          CyboksDPS
        </h1>
      </div>
    </main>
  );
}
