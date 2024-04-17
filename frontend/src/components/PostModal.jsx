"use client";
import { ImLocation } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { BiSolidImageAlt } from "react-icons/bi";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useState } from "react";

export default function PostModal() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    post: "",
    ImageUrl: "" | null,
  });

  
  const handleChange = (event) => {
    const { name, value, files } = event.target;
  if (name === "Image" && files.length > 0) {
    setFile(files[0]);
  } else {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    if (file) {
      console.log("Uploading file...");
  
      const formData = new FormData();''
      formData.append("Image", file);
  

    } else {
      alert("Please select a file.");
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-white flex gap-x-4">
          <Pencil />
          <div>Create post</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#15264B]">
        <DialogHeader>
          <DialogTitle className="text-white font-medium text-center">
            Create new post
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            name="post"
            id="post"
            onChange={handleChange}
            value={formData.post}
            placeholder="Type your thoughts here..."
            className="h-[250px] placeholder:text-gray-50 placeholder:text-sm bg-inherit border-none outline-none text-white"
          />

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
                      id="Image"
                      name="Image"
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </Label>
                </div>
              </div>
              <div>
                <ImLocation className="text-white text-2xl" />
                <div className="text-nowrap text-white text-xs">Tag location</div>
              </div>

              <Button type="submit">
                <div className="flex gap-2 items-center">
                  Post <GoPaperAirplane className="text-white text-2xl" />
                </div>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
