"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bgImg from "../../../assets/images/signup_bg.png";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { server } from "@/utils/axios";
import Link from "next/link";

const SignupVerifyPage: React.FC = () => {
  // local states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string[]>([]);
  const [emailBody, setEmailBody] = useState<any>(false);

  // router
  const router = useRouter();

  // get the email from the url
  const encodedEmail = useSearchParams().get("email");
  const email = atob(encodedEmail!);

  const { control, handleSubmit, getValues } = useForm<any>();

  const onSubmit = (data: any) => {
    data.target.preventDefault();
  };

  // handlers
  const handleGetValues = async () => {
    // validationn
    if (!encodedEmail) {
      return toast.error("The email should be in the url.");
    }

    setIsLoading(true);

    const data: any = getValues();
    const values: string[] = Object.values(data);

    const number = values.reduce(
      (acc: number, val: string) => acc * 10 + parseInt(val),
      0
    );

    const dataCode = number.toString();

    const code =  verificationCode.join('') 
    setEmailBody({ code: code, email: email });

    // console.log('The passed body is: ', emailBody)

   
  };

  useEffect(() => {
    async function sendEmail(emailBody: any){
       const res = await server.post<any>("/auth/verify", emailBody);

    if (res.data.status == 200 && res.data.userEmail) {
      toast.success(
        "Your email address has confirmed successfully. Please login!"
      );

      console.log("The passed body is:", emailBody);
      return router.push("/");
    } else {
      setIsLoading(false);
      return toast.error("Verification code has expired or not valid.");
    }
    }
    if(emailBody){
      sendEmail(emailBody);
    }
  }, [emailBody]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const code = pastedText.replace(/\D/g, "").slice(0, 5); // Extract only digits and limit to 5 characters
    setVerificationCode(code.split(""));
  };
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const updatedCode = e.target.value.slice(0, 1); // Limit to 1 character
    setVerificationCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[idx] = updatedCode;
      return newCode;
    });

    const nextIndex = idx + 1;
    if (nextIndex < 5 && updatedCode !== "") {
      const nextInputRef = inputRefs.current[nextIndex];
      if (nextInputRef) {
        nextInputRef.focus();
      }
    }
  };

  return (
    <main className="overflow-hidden h-screen">
      <div className="flex flex-row w-full bg-slate-50 h-screen">
        <div className="md:block w-[50%] relative">
          <Image
            src={bgImg}
            fill
            alt="Background image"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="bg-slate-50 lg:w-1/2 w-full relative">
          <div className="px-8 pt-8 flex flex-row justify-between w-full">
            <div>
              <p className="text-stone-300 text-xs font-medium font-poppins">
                Step 2 of 3
              </p>
              <Link
                href="/auth/signup"
                className="text-slate-400 text-xs font-bold font-poppins underline"
              >
                Previous
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-10 sm:m-10 mx-4">
              <h1 className="text-2xl font-bold text-left font-poppins">
                Check your Mail
              </h1>
              <p className="text-slate-400 text-base text-left mt-5">
                We&#39;ve sent a 5-digit confirmation code to{" "}
                <a
                  href={`mailto:${encodedEmail ? email : "your@email.com"}`}
                  className="underline text-blue-500"
                >
                  {encodedEmail ? email : "your@email.com"}
                </a>
                . Make sure you enter the correct code.{" "}
                <span className="text-violet-400">*</span>
              </p>
              <div className="flex flex-row justify-center items-center max-w-screen-md mb-9 mt-9">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx}>
                    <Controller
                      name={`input-${idx}`}
                      control={control}
                      defaultValue=""
                      rules={{ required: true, pattern: /^[0-9]$/ }}
                      render={({ field }) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          {...field}
                          name={`input-${idx}`}
                          ref={(el) => (inputRefs.current[idx] = el)}
                          value={verificationCode[idx] || ""}
                          onChange={(e) => {
                            handleChange(e, idx);
                          }}
                          onPaste={handlePaste}
                          className="w-14 md:w-14 h-14 md:h-14 border border-gray-300 mx-1 text-gray-900 text-md text-center rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="py-4">
                <Link href="/signup_verify">
                  <p className="mt-4 text-slate-400 text-base text-left font-bold font-poppins cursor-pointer m-1.8">
                    Resend Code
                  </p>
                </Link>
                <button
                  className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 w-full rounded"
                  type="button"
                  onClick={handleGetValues}
                >
                  {" "}
                  {isLoading ? <Spinner /> : "Verify"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupVerifyPage;
