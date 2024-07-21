"use server"

import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import { z } from "zod";
import { ProjectSchema } from "@/components/project-uploader";

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
export async function getCurrentUser() {
  return cookies().get('user')
}
export async function logout() {
    cookies().delete("user")
    return redirect("/login")
}

export async function validate(values: z.infer<typeof ProjectSchema>) {
  const data = ProjectSchema.safeParse(values);
  if(!data.success){
    return {
      error : "Invalid data"
    }
  }
  const {name , descr} = data.data
  return {
    name,
    descr
  }
}
export async function upload({name,descr,image}:{name:string,descr:string,image:string}) {
  return {
    success : "yeah"
  }
}