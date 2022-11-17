import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getError } from "../utils/handleError";
import { toast } from "react-toastify";
import Head from "next/head";
import axios from "axios";

const registerSchema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup.string().email().required("Email is required."),
  password: yup.string().min(6).required("Password is required."),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect ? redirect : "/");
    }
  }, [router, session, redirect]);

  //* ========= client side signIn function from next-auth===================
  const onSubmit = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      //* react toast notification
      toast.error(getError(err));
    }
  };

  return (
    <>
      <Head>
        <title>Register - Let`s Shop</title>
      </Head>
      <div className="max-w-screen-md mx-auto text-black">
        <h1 className="text-xl font-bold">Register Account</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full"
              type="text"
              autoFocus
              {...register("name")}
            />
            <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full"
              type="email"
              {...register("email")}
            />
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full"
              name="password"
              type="password"
              {...register("password")}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password_confirm">Confirm Password</label>
            <input
              id="password_confirm"
              className="w-full"
              name="password_confirm"
              type="password"
              {...register("password_confirm")}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.password_confirm?.message}
            </p>
          </div>
          <div className="mb-4">
            <button type="submit" className="primary-button">
              Sign Up
            </button>
          </div>
          <div className="mb-4">
            <p className="inline">Already have an account?</p>{" "}
            <Link
              href={`/login?redirect=${redirect || "/"}`}
              className="underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
