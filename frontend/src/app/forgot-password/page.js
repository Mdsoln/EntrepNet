"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import FormHeader from "@/components/FormHeader"
import { Toaster, toast } from 'sonner'


export default function page() {
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("required"),
    }),
    onSubmit: (values) => {
       toast.success(`we have sent an email to ${values.email}`)
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-y-12 items-center justify-center"
        >
        <FormHeader className="mt-12" text={"Type your email"}/>
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
          <Button text={"Send email"} />
          <div className="text-white">New here?<span className="text-[cyan]"><a href="/register">Register here</a></span></div>
        </form>
      </div>
    </>
  );
}
