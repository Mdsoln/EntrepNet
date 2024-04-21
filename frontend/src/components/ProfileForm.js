"use client";
import React from "react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import FormHeader from "./FormHeader";

import { useRouter } from "next/navigation";
import TopicsTabs from "./TopicsTabs";

export default function ProfileForm() {
 
  const router = useRouter();
  
  const formik = useFormik({
    initialValues: {
      job: "",
      location: "",
      role:""
    },
    validationSchema: Yup.object({
      job: Yup.string().required("This field is required"),
      location: Yup.string().required("This field is required"),
      role: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {

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
              A job to display on your profile
            </div>
          </div>
          <div>
            <input
              type="text"
              name="job"
              id="job"
              className="border-b outline-none bg-inherit"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job}
            />
             {formik.touched.job && formik.errors.job? (
              <span className="text-sm font-light text-red-500">
                {formik.errors.job}
              </span>
            ) : null}
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
            <input 
            type="text" 
            name="location" 
            id="location" 
            className="border-b outline-none bg-inherit " 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            
            />
             {formik.touched.location && formik.errors.location? (
              <span className="text-sm font-light text-red-500">
                {formik.errors.location}
              </span>
            ) : null}
          </div>
        </div>
          
        <div className="flex gap-x-4">
            <select
             id="role"
             name="role" 
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.role}
            >
              <option value="mentor">mentor</option>
              <option value="enterpreneur">enterpreneur</option>
            </select>
            <label htmlFor="role" className="font-bold text-lg text-white">I am an expert in my field and I want to become a 
mentor.</label>
        </div>

        <TopicsTabs />
        <Button text={"continue"} />  
      </form>
    </div>
  );
}
