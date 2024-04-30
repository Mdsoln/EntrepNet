import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import FormHeader from "./FormHeader";
import { useRouter } from "next/navigation";
import TopicsTabs from "./TopicsTabs";
import axios from "axios";
import { toast } from "sonner";

export default function ProfileForm({ formData }) {
    const { email } = formData;
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            job: "",
            location: "",
            role: "",
            image: null,
        },
        validationSchema: Yup.object({
            job: Yup.string().required("This field is required"),
            location: Yup.string().required("This field is required"),
            role: Yup.string().required("This field is required"),
            image: Yup.mixed()
              .required("Please upload your profile")
        }),
        onSubmit: async (values) => {
            values["email"] = email
            try {
                const formData = new FormData();
                formData.append("job", values.job);
                formData.append("location", values.location);
                formData.append("role", values.role);
                formData.append("image", values.image);
                formData.append("email", email);

                 let res = await axios.post('http://localhost:8080/api/v1/user/complete-profile', values,{
                     headers:{
                         "Content-Type":"multipart/form-data"
                     }
                 })

                if(res.status === 200){
                    
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                toast.success("Congratulations!! Your profile is complete!!")
                 }else{
                 toast.error("We've encountered an error, please try again later")
                 }
                router.push("/home");

            } catch (error) {
                console.log(error);
                alert(`There was an error submitting the form`);
            }
        },
    });
    return (
        <div>
            <FormHeader
                text="Complete your profile"
                style="text-center mt-8 mb-12"
            />
            <form
                method="post"
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-y-12"
            >
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
                        {formik.touched.job && formik.errors.job ? (
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
                        {formik.touched.location && formik.errors.location ? (
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
                        {/* ... */}
                        <option value="mentor">mentor</option>
                        <option value="entrepreneur">entrepreneur</option>
                    </select>
                    <label htmlFor="role" className="font-bold text-lg text-white">
                        Choose your expertise
                    </label>
                </div>
                <div className="flex justify-center items-center gap-x-4 ">
                    <div className="text-white text-lg">Choose your profile picture</div>
                    <div>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.image}
                        />
                    </div>
                </div>

                {/*  <TopicsTabs/> */}
                <Button text={"continue"} />
            </form>
        </div>
    );
}
