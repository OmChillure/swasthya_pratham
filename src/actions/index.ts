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
  const {name , descr} = values;
  return {
    name,
    descr
  }
}

export async function upload({name,descr,url,email}:{name:string,descr:string,url:string,email:string | undefined}) {
  console.log({name,descr,url,email})
  try{
    const response = await axios.post("http://127.0.0.1:8080/upload",{
      name,
      descr,
      url,
      email,
    })

    if(response.status === 200) {
      console.log(response.data)
      return {data:response.data}
    } else {
      console.log("error uplaoding url")
      return {data:null};
    }

  }catch(error) {
    console.error("File Upload", error); // Log error details for debugging
    return {data:null,error:"Uplaod file url failed"}
  }

  return {
    success : "yeah"
  }
}



export async function getFiles() {
  try {
    const res =await axios.get("http://127.0.0.1:8080/upload")
    console.log(res);
    
    if(res.status===200){
      return {
        body : res.data,
        success : true 
      }
    }else{
      return {
        success : false, 
      }
    }
  } catch (error) {
    console.log(error);
    return {
      success :false
    }
  }
}