import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "user1" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
   
    .onUploadComplete(async ({  file }) => {
    
      console.log("file url", file.url);
 
      return { message:'Pdf Upload Complete', fileUrl:file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;