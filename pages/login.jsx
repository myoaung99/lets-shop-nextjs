import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required."),
  password: yup.string().min(6).required("Password is required."),
});

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data => ", data);
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-xl font-bold">Login</h1>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full"
            type="email"
            autoFocus
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
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Login
          </button>
        </div>
        <div className="mb-4">
          <p className="inline">Don`t have any account yet?</p>{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
