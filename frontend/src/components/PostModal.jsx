"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { BiSolidImageAlt } from "react-icons/bi";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { GoPaperAirplane } from "react-icons/go";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import usePosts from "../zustand/usePosts.js";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";

export default function PostModal() {
  const [previewUrl,setPreviewUrl] = useState(null)
  const router = useRouter();
  const { auth } = useAuthContext();
  const senderID = auth.userID;

  const [files, setFile] = useState(null);
  const [formData, setFormData] = useState({
    post: "",
    files: null,
    senderID: senderID || "", // Initialize with senderID
  });

  const { fetchPosts } = usePosts();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files)

    const newPreviewUrls = []
    if (selectedFiles) {
      setFile(selectedFiles);
     
      
      selectedFiles?.forEach(element => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviewUrls.push(reader.result);
          if (newPreviewUrls.length === selectedFiles.length){
            setPreviewUrl(newPreviewUrls)
          }
        };
        reader.readAsDataURL(element);
      });
    }
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append("post", formData.post);
    postData.append("senderID", formData.senderID); // Append senderID

    // Check the upload limit
    if (files) {
      if (files.length > 3) {
        alert("You have reached a maximum number of pictures to submit");
        return;
      }
      for (let index = 0; index < files.length; index++) {
        postData.append(`file${index + 1}`, files[index]);
      }
    }

    try {
      console.log(formData);
      // Send postData to server using axios
      const response = await axios.post(
          "http://localhost:8080/api/v1/post/createPost",
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );

      if (response.status === 200) {
        const newPost = response.data

        toast.success("You have successfully created a post");
      } else {
        toast.error("An error occurred");
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error(error);
    } finally {
      setFormData({
        post: "",
        files: null,
        senderID: senderID || "", // Reset senderID
      });
      setFile(null);
      setPreviewUrl(null);
      fetchPosts(1)
    }
  };

  return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="text-white flex gap-x-4 hover:rounded-lg hover:bg-teal-50 hover:text-black hover:p-4 transition-all ease cursor-pointer">
            <Pencil />
            <div>Create post</div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#15264B]">
          <DialogHeader>
            <DialogTitle className="text-white font-medium text-center">
              Create new post
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
            <Textarea
                name="post"
                id="post"
                onChange={handleChange}
                value={formData.post}
                placeholder="Type your thoughts here..."
                className="h-[250px] placeholder:text-gray-50 placeholder:text-sm bg-inherit border-none outline-none text-white"
            />
            <div className="flex gap-2">

            {previewUrl && (
         previewUrl?.map((item,index)=> <div key={index}>
          <Image src={item} alt="Selected" width={100} height={100} style={{ maxWidth: '300px', maxHeight: '300px' }} />
          <button onClick={()=>{setFile(null);setPreviewUrl(null)}} className="text-red-600">Remove Image</button>
        </div>)
      )}
            </div>

            <Separator orientation="horizontal" className="w-full " />
            <DialogFooter>
              <div className="mt-4 flex gap-x-12">
                <div className="flex-start">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label>
                      <div>
                        <BiSolidImageAlt className="text-white text-3xl" />
                        <div className="text-xm text-white">Add photo</div>
                      </div>
                      <Input
                          id="files"
                          name="files"
                          type="file"
                          className="hidden"
                          onChange={handleUpload}
                          multiple
                      />
                    </Label>
                  </div>
                </div>
                <div>
                  <ImLocation className="text-white text-2xl" />
                  <div className="text-nowrap text-white text-xs">Tag location</div>
                </div>
                <DialogClose asChild>

                <Button type="submit">
                  <div className="flex gap-2 items-center">
                    Post <GoPaperAirplane className="text-white text-2xl" />
                  </div>
                </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
}
