"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import FormHeader from "./FormHeader";

import { useRouter } from "next/navigation";
import TopicsTabs from "./TopicsTabs";

export default function ProfileForm() {
 
  const router = useRouter();
  
  const formik = useFormik({
    initialValues: {
      qn1: "",
      qn2: "",
      topics: [],
    },
    validationSchema: Yup.object({
      qn1: Yup.string().required("This field is required"),
      qn2: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        values.topics = TopicsTabs.getSelectedTopics();
        alert(JSON.stringify(values, null, 2));
        router.push("/home");
      } catch (error) {
        alert(`the was an ${error} submitting the form`);
      }
    },
  });
  return (
    <div>
      <FormHeader text="Complete your profile" style="text-center mt-8 mb-12" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-12">
        <div className="flex gap-x-2">
          <div className="grid grid-cols-1">
            <div className="font-bold text-white text-lg text-nowrap">
              What is your main job?
            </div>
            <div className="font-light text-sm text-white text-nowrap">
              A job to display on your profile{" "}
            </div>
          </div>
          <div>
            <input
              type="text"
              name="qn1"
              id="qn1"
              className="border-b outline-none bg-inherit"
            />
          </div>
        </div>
        <div className="flex gap-x-2">
          <div className="grid grid-cols-1">
            <div className="font-bold text-white text-lg text-nowrap">
              Where are you located?
            </div>
            <div className="font-light text-xs text-white text-wrap">
              This will help you link up with
              <br />
              entrepreneurs near you
            </div>
          </div>
          <div>
            <input type="text" name="qn2" id="qn2" className="border-b outline-none bg-inherit" />
          </div>
        </div>
          
        <div className="flex gap-x-4">
            <input type="checkbox" name="role" id="role" />
            <label htmlFor="role" className="font-bold text-lg text-white">I am an expert in my field and I want to become a 
mentor.</label>
        </div>

        <TopicsTabs />
        <Button text={"continue"} />  
      </form>
    </div>
  );
}
