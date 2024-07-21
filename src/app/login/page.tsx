"use client";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { login } from "@/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting login request");

    login(email, password).then((data: any) => {
      console.log(data);
      if (data?.error) setMessage(data.error);
    });
  };

  return (
    <div className="flex p-5 items-center justify-center">
      <div className="text-black dark:text-white p-8 rounded shadow-md w-full border-2 border-black dark:border-white  max-w-md ">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
        <Link className="block flex my-2 justify-center items-center " href={"/register"}>
               <Button variant={"link"}>Don't have an account ? </Button>
        </Link>
    
      </div>
    </div>
  );
};

export default Login;
