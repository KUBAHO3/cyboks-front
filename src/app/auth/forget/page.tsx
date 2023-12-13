'use client'

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { server } from '@/utils/axios';
import { forgetPasswordSchema } from '@/schemas/auth';
import InputError from '@/components/forms/InputError';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type ForgetPasswordForm = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPassword() {
  // local states
  const [isLoading, setIsLoading] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    resetField,

    formState: { errors },
  } = useForm<ForgetPasswordForm>({
    mode: "onSubmit",
    resolver: zodResolver(forgetPasswordSchema),
  });


  // submit handler
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const res = await server.patch("/auth/reset-password", data);

    if (res.data === true) {
      setIsLoading(false);

      resetField("email");

      return toast.success(
        "Please check your email adress inbox to get the reset password link.",
        {
          toastId: "auth-message",
        }
      );
    } else {
      setIsLoading(false);

      resetField("email");

      return toast.error(
        "Something went wrong. Make sure to provide an email address associated to your account.",
        {
          toastId: "auth-message",
        }
      );
    }

  });

  return (
    <main className="bg-slate-50 xl:px-56 lg:px-36 md:px-28 sm:px-16 px-8 pt-16 h-screen">
      <div className="bg-cover bg-[url('../assets/images/reset_bg.png')] lg:px-36 md:px-28 sm:px-16 px-8 rounded-2xl shadow-xl">
        <h1 className="text-white font-bold text-center py-4 text-4xl">Forgot Password?</h1>
        <h4 className="text-white text-center text-xl">Don't worry we can help!</h4>
        <form onSubmit={onSubmit} className='mt-14'>

          <div className="px-24 py-16">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm text-white font-normal"
            >
              Enter your Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-[5px]"
              placeholder="your.email@adress.com"
              {...register("email")}
            />

            <InputError error={errors.email?.message} />
          </div>

          <div className="flex flex-row justify-end px-24 pb-16">
            <div className="text-right mr-4">
              <p className="text-white">Remembered your password?</p>
              <h4 className="text-white font-semibold">Back to <Link href='/' className="font-bold text-violet-500 hover:underline">Login</Link></h4>
            </div>
            <button
              type='submit'
              className="bg-white hover:bg-green-50 text-violet-500 font-semibold py-2 w-1/4 rounded-lg border"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined style={{ fontSize: 22, color: "#000" }} spin />
                  }
                />
              ) : (
                "Next"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
