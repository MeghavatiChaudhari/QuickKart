import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectLoggedInUser,createUserAsync } from "../authSlice";
// import { useDispatch, useSelector } from "react-redux"
// import {
//   increment,
//   incrementAsync,
//   selectCount,
// } from "./counterSlice"

export default function Signup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize useForm
  //   const count = useSelector(selectCount)
  const user = useSelector(selectLoggedInUser);
  console.log(errors);
  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            class="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(createUserAsync({email:data.email,password:data.password}))
              console.log(data);
            })}
          >
            <div>
              <label
                htmlFor="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "email is required" , pattern:{
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message:'email not invalid'
                  } })}
                  name="email"
                  type="email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  htmlFor="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern:{
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:`- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`
                    }
                  })}
                  name="password"
                  type="password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  htmlFor="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirm-password", {
                    required: "confirm-password is required",
                    validate: (value, formValues) => value === formValues.password || 'Password not matching'
  
                  })}
                  name="confirm-password"
                  type="password"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors["confirm-password"] && (
                  <p className="text-red-500">
                    {errors["confirm-password"].message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Already a Member?
            <Link
              to="/login"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
