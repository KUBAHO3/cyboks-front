"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputError from "@/components/forms/InputError";
import { signupSchema } from "@/schemas/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { server } from "@/utils/axios";
import { toast } from "react-toastify";
import { USER_ROLES } from "@/utils/constants";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  // local states
  const [cyboksTeamVisible, setcyboksTeamVisible] = useState(true);
  const [ncsaTeamVisible, setNcsaTeamVisible] = useState(false);
  const [cyboksClientVisible, setcyboksClientVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // some handlers
  const handlecyboksTeamClick = () => {
    setcyboksTeamVisible(true);
    setNcsaTeamVisible(false);
    setcyboksClientVisible(false);
  };

  const handleNcsaTeamClick = () => {
    setcyboksTeamVisible(false);
    setNcsaTeamVisible(true);
    setcyboksClientVisible(false);
  };

  const handlecyboksClientClick = () => {
    setcyboksTeamVisible(false);
    setNcsaTeamVisible(false);
    setcyboksClientVisible(true);
  };

  // router
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    // Some extra email validation
    if (cyboksTeamVisible && !data.email.endsWith("@cyboks.com")) {
      return toast.error("Invalid Cyboks email address.");
    }

    if (ncsaTeamVisible && !data.email.endsWith("@ncsa.gov.rw")) {
      return toast.error("Invalid NCSA email address.");
    }

    try {
      // Custom payload
      const payload = {
        userName: data.username,
        userEmail: data.email,
        password: data.password,
        companyName: data.companyName,
        accessLevel: "high",
        role: cyboksClientVisible
          ? USER_ROLES.DPO
          : ncsaTeamVisible
          ? USER_ROLES.NCSA
          : USER_ROLES.REVIEWER,
      };
      setIsLoading(true);
      
      console.log("payload", payload);
      const res = await server.post("/auth/signup", payload);
      
      console.log("res", res);

     if (res.data.success && res.data.data.email) {
       return router.push(res.data.data.email);
     }

      if (res.data.status === "error") {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (err: any) {
      toast.error(err.response.data.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <main className="sm:flex sm:flex-row w-full h-screen bg-cover bg-[url('../assets/images/signup_bg.png')]">
      <div className="bg-opacity-0 sm:rounded-l-xl rounded-xl h-screen w-full flex items-center justify-center">
        <div className="flex items-center flex-col justify-center bg-black w-[80%] bg-opacity-30 sm:rounded-xl rounded-2xl h-3/4 mt-20 mb-20 mr-20 overflow-y-auto scrollbar-hide">
          <h1 className="mt-1 text-center text-white text-xl font-semibold">
            Register Your Account
          </h1>
          <h2 className="mt-1 text-center text-gray-300 font-extralight">
            Fill in the details bellow
          </h2>
          <div className="">
            <form onSubmit={onSubmit}>
              <div className="">
                <h3 className="text-white mt-4 ">Pinpoint your description</h3>
                <label className="mt-1 flex items-center ">
                  <div className="">
                    <input
                      name="personelselection"
                      type="checkbox"
                      className="w-4 h-4 text-white bg-white border-violet-600 focus:ring-0 dark:focus:ring-0 dark:ring-offset-violet-800 focus:ring-0 dark:bg-violet-700 dark:border-white"
                      checked={cyboksTeamVisible}
                      onChange={handlecyboksTeamClick}
                    />
                    <span className="ml-2 text-sm text-white font-semibold ">
                      Cyboks Team
                    </span>
                  </div>
                  <div className="ml-6">
                    <input
                      name="personelselection"
                      type="checkbox"
                      className="w-4 h-4 text-white bg-white border-violet-500 focus:ring-0 dark:focus:ring-0 dark:ring-offset-green-800 focus:ring-0 dark:bg-green-700 dark:border-white"
                      checked={ncsaTeamVisible}
                      onChange={handleNcsaTeamClick}
                    />
                    <span className="ml-2 text-sm text-white font-semibold ">
                      NCSA Team
                    </span>
                  </div>
                  <div className="ml-6">
                    <input
                      name="personelselection"
                      type="checkbox"
                      className="w-4 h-4 text-white bg-violet-500 border-violet-500 dark:focus:ring-0 dark:ring-offset-violet-800 focus:ring-0 dark:bg-violet-700 dark:border-white"
                      checked={cyboksClientVisible}
                      onChange={handlecyboksClientClick}
                    />
                    <span className="ml-2 text-sm text-white font-semibold ">
                      Cyboks Client
                    </span>
                  </div>
                </label>
              </div>
              <div className="">
                <div className={cyboksTeamVisible ? "flex items-center mt-4" : ""}>
                  {cyboksTeamVisible && (
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="CyboksName"
                            className="text-white text-l font-normal"
                          >
                            Cyboks Representative Name
                          </label>
                          <input
                            type="text"
                            id="CyboksName"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Cyboks Representative Name"
                            {...register("username")}
                          />

                          <InputError error={errors.username?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="CyboksEmail"
                            className="text-white text-l font-normal"
                          >
                            Cyboks Representative Email
                          </label>
                          <input
                            type="email"
                            id="CyboksEmail"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Cyboks Representative Email"
                            {...register("email")}
                          />

                          <InputError error={errors.email?.message} />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="password"
                            className="text-white text-l font-normal"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Password"
                            {...register("password")}
                          />

                          <InputError error={errors.password?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="passwordConfirm"
                            className="text-white text-l font-normal"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="passwordConfirm"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Confirm password"
                            {...register("passwordConfirm")}
                          />

                          <InputError error={errors.passwordConfirm?.message} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={ncsaTeamVisible ? "flex items-center mt-4" : ""}
                >
                  {ncsaTeamVisible && (
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="text-white text-l font-normal"
                          >
                            NCSA Representative Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="NCSA Representative Name"
                            {...register("username")}
                          />

                          <InputError error={errors.username?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="text-white text-l font-normal"
                          >
                            NCSA Representative Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="NCSA Representative Email"
                            {...register("email")}
                          />

                          <InputError error={errors.email?.message} />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="password"
                            className="text-white text-l font-normal"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Password"
                            {...register("password")}
                          />

                          <InputError error={errors.password?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="passwordConfirm"
                            className="text-white text-l font-normal"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="passwordConfirm"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Confirm password"
                            {...register("passwordConfirm")}
                          />

                          <InputError error={errors.passwordConfirm?.message} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={cyboksClientVisible ? "flex items-center mt-4" : ""}
                >
                  {cyboksClientVisible && (
                    <div className="w-full flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="nameC"
                            className="text-white text-l font-normal"
                          >
                            Name of the company
                          </label>
                          <input
                            type="text"
                            id="nameC"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Name of the company"
                            {...register("companyName")}
                          />

                          <InputError error={errors.companyName?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="nameD"
                            className="text-white text-l font-normal"
                          >
                            Name of the DPO
                          </label>
                          <input
                            type="text"
                            id="nameP"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Name of the DPO"
                            {...register("username")}
                          />

                          <InputError error={errors.username?.message} />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="emailD"
                            className="text-white text-l font-normal"
                          >
                            Email of the DPO
                          </label>
                          <input
                            type="email"
                            id="emailD"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Email of the DPO"
                            {...register("email")}
                          />

                          <InputError error={errors.email?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="text-white text-l font-normal"
                          >
                            Phone number of the DPO
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Phone number of the DPO"
                            {...register("companyPhoneNumber")}
                          />

                          <InputError
                            error={errors.companyPhoneNumber?.message}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label
                            htmlFor="password"
                            className="text-white text-l font-normal"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Password"
                            {...register("password")}
                          />

                          <InputError error={errors.password?.message} />
                        </div>

                        <div>
                          <label
                            htmlFor="passwordConfirm"
                            className="text-white text-l font-normal"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="passwordConfirm"
                            className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                            placeholder="Confirm password"
                            {...register("passwordConfirm")}
                          />

                          <InputError error={errors.passwordConfirm?.message} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="mt-8 flex flex-col items-center justify-center gap-2">
                    <button
                      type="submit"
                      className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-2 rounded"
                    >
                      {isLoading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{ fontSize: 22, color: "#fff" }}
                              spin
                            />
                          }
                        />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                    <p className="text-white">
                      Already have account?
                      <Link href="/" className="text-violet-600 font-bold">
                        {" "}
                        Login{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
