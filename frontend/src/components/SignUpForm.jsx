"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import Button from "./Button";
import FormHeader from "./FormHeader"
import IconsBar from "./IconsBar"
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password should have atleast 8 characters")
        .required("required"),
      email: Yup.string().email("Invalid email address").required("required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      router.push("/home")
    },
  });
  return (
    <>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-y-12 items-center justify-center"
        >
        <FormHeader className="mt-12" text={"Sign in to continue"}/>
        <div>
        <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-64"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-sm font-light text-red-500">{formik.errors.email}</span>
          ) : null}
        </div>
        
          <div>
          <Input
            id="password"
            name="password"
            type="text"
            placeholder="password"
            className="w-64"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="flex gap-x-4">  
            {formik.touched.password && formik.errors.password ? (
            <span className="text-sm font-light text-red-600">{formik.errors.password}</span>
          ) : null}
    
         </div>
         <a href="/forgot-password" className="text-[cyan] text-sm flex-end my-4">forgot password?</a>
          </div>
          <IconsBar />
          <Button text={"sign in"} />
          <div className="text-white">New here?<span className="text-[cyan]"><a href="/register">Register here</a></span></div>
        </form>
      </div>
    </>
  );
}
