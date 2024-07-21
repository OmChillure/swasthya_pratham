"use client"
import { UploadDropzone } from "@/lib/uploadthing"
import { startTransition, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import {  getCurrentUser, upload, validate } from "@/actions"



export const ProjectSchema = z.object({
  name : z.string().min(1,{message:"Name is required"}),
  descr : z.string().min(1,{message:"descr is required"})
})

export const Uploader = () => {
    const [url, setImage] = useState<string | undefined>("")
    const [error , setError] = useState<string | undefined>("")
    const [email,setEmail] = useState<string | undefined>()
    getCurrentUser().then(user=>setEmail(user?.value))
    const [isPending,startTransition] = useTransition()
    const form = useForm<z.infer<typeof ProjectSchema>>({
      resolver: zodResolver(ProjectSchema),
      defaultValues: {
          name: "",
          descr :"",
      },
    })
    function onSubmit(values: z.infer<typeof ProjectSchema>) {
      setError("")
      if (!url) {
        return setError("File is required")
      }
      startTransition(()=>{
          validate(values).then(data=>{
              if(data?.error) setError(data.error)
                if(data?.name && data?.descr) {
                  upload({...data,url ,email}).then(res=>alert(res.success))
                }
          })
      })
      console.log(values)
    }
    return(
        <div className="w-full flex flex-col gap-y-4 p-5">
          <div>
            <p className="text-3xl text-foreground">Create Product</p>
            <p className="text-muted">Add a new Product</p>
          </div>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" required disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input disabled={isPending} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="text-red-400">{error}</div>
        <Button className="bg-blue-500/70 font-semibold tracking-wide px-7  text-white" disabled={isPending} type="submit">Create</Button>
      </form>
    </Form>
            <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          setImage(res[0].url)
          alert(res[0].url)
          setError("")
        }}
        onUploadError={(error: Error) => {
          setError(`ERROR! ${error.message}`);
        }}
      />
      <div className="text-red-400">{error}</div>
      
      </div>
    )
}