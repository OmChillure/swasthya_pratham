"use server"

import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export const setCookie = (email:string) => cookies().set('user', email)

export async function login(email: string,password: string) {
    try {
        const response = await axios.post(
          "http://127.0.0.1:8080/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
  
        if (response.status === 200) {
            cookies().set("user", response.data);
        } else {
          return {data:null,error:"Invalid credentials"}
        }
      } catch (error) {
        console.error("Login error:", error); // Log error details for debugging
        return {data:null,error:"Login error"}
      }
    return redirect("/dashboard")
}

export async function logout() {
    cookies().delete("user")
    return redirect("/login")
}