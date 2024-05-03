"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import Button from "./Button";
import FormHeader from "./FormHeader";
import IconsBar from "./IconsBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function RegisterForm({ onNext }) {
  const router = useRouter();

    {/** form validation */}
  const formik = useFormik({
    initialValues: {
      firstname: "",
      surname: "",
      mobile: "",
      psw: "",
      confirmpassword: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      surname: Yup.string().required("This field is required"),
      mobile: Yup.string()
          .min(9, "Invalid mobile number")
          .required("This field is required"),
      psw: Yup.string()
          .min(8, "Password should have at least 8 characters")
          .required("This field is required"),
      confirmpassword: Yup.string()
          .oneOf([Yup.ref("psw"), null], "Passwords must match")
          .required("This field is required"),
      email: Yup.string().email("Invalid email address").required("This field is required"),
    }),
    onSubmit: async (values) => {
        const { confirmpassword, ...data } = values;
         alert(data)
        console.log(data)

       axios.post(
            "http://localhost:8080/api/v1/user/register",
           data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        ).then(
           (response) =>  {
             const token = response.data.token;
             localStorage.setItem('jwtToken', token);
             toast.success("Registration successful");
             onNext(data);

           }
       ).catch ((error)=>{
          alert(error)
       })
    },
  });

  return (
      <>
        <div>
          <form method="post" onSubmit={formik.handleSubmit} className="flex flex-col gap-y-12 items-center justify-center">
            <FormHeader className="mt-12" text={"Sign in to continue"} />
            <div className="grid grid-cols-2 gap-y-12 gap-x-4">
              <div>
                <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="firstname"
                    className="w-48"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                    <span className="text-sm font-light text-red-500 w-12">{formik.errors.firstname}</span>
                ) : null}
              </div>
              <div>
                <Input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder="surname"
                    className="w-48"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                />
                {formik.touched.surname && formik.errors.surname ? (
                    <span className="text-sm font-light text-red-500">{formik.errors.surname}</span>
                ) : null}
              </div>

              <div>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    className="w-48"
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
                    id="mobile"
                    name="mobile"
                    type="number"
                    placeholder="mobile"
                    className="w-48"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                    <span className="text-sm font-light text-red-500">{formik.errors.mobile}</span>
                ) : null}
              </div>

              <div>
                <Input
                    id="psw"
                    name="psw"
                    type="password"
                    placeholder="password"
                    className="w-48"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.psw}
                />
                <div className="flex gap-x-4">
                  {formik.touched.psw && formik.errors.psw ? (
                      <span className="text-sm font-light text-red-600">{formik.errors.psw}</span>
                  ) : null}
                </div>
              </div>
              <div>
                <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="confirmpassword"
                    className="w-48"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmpassword}
                />
                <div className="flex gap-x-4">
                  {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                      <span className="text-sm font-light text-red-600">{formik.errors.confirmpassword}</span>
                  ) : null}
                </div>
              </div>
            </div>
            <IconsBar />
            <Button text={"Sign up"} />
          </form>
        </div>
      </>
  );
}
