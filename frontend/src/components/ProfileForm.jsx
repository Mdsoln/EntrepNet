import React, { useState } from "react";
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
      topic: "",
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
        formData.append("topic", values.topic);
        formData.append("image", values.image);
        formData.append("email", email);

        console.log(JSON.stringify(formData))

        let res = await axios.post(
          'http://localhost:8080/api/v1/user/complete-profile', JSON.stringify(values), {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        if (res.status === 200) {

          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          toast.success("Congratulations!! Your profile is complete!!")
        } else {
          toast.error("We've encountered an error, please try again later")
        }
        router.push("/home");

      } catch (error) {
        console.log(error);
        alert(`There was an error submitting the form`);
      }
    },
  });
  const [isMentor, setIsMentor] = useState(false)

  //set of regions for location
  const Regions = ["Mwanza", "Dar es Salaam", "Iringa", "Mbeya", "Tanga", "Arusha", "Ruvuma", "Morogoro", "Lindi", "Mtwara", "Pwani", "Katavi", "Dodoma",]

  //function to toggle topics
  const showTopics = () => {
    setIsMentor(!isMentor)
  }
  return (
    <div>
      <FormHeader text="Complete your profile" style="text-center mt-8 mb-12" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-12">
        <div className="flex gap-x-6">
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
              className="border-b outline-none bg-white text-black"
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
        <div className="flex gap-x-6">
          {/* location field and description */}
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

          {/* job fied and description */}
          <div>
            <select
              name="location"
              id="location"
              className="border-b outline-none bg-white w-full "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            >

              {/* Display regions as select options */}
              <option
                className=""
                value='---Regions---'
                selected
                disabled
              >

              </option>
              {Regions.map(
                (region, index) => (
                  <option
                    className=""
                    key={index}
                    value={region}
                  >
                    {region}
                  </option>
                )
              )}
            </select>
            {formik.touched.location && formik.errors.location ? (
              <span className="text-sm font-light text-red-500">
                {formik.errors.location}
              </span>
            ) : null}
          </div>
        </div>
        {/* image field */}
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
        <div className="flex gap-x-4">
          <input
            type="radio"
            name="role"
            id="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="Mentor"

            onClick={showTopics}
          />
          <label htmlFor="role" className="text-white">Are you a mentor?Would you like to coach on:</label>

          {formik.touched.role && formik.errors.role ? (
            <span className="text-sm font-light text-red-500">
              {formik.errors.role}
            </span>
          ) : null}
        </div>

        {/* New radio */}
        <div className="flex gap-x-4">
          <input
            type="radio"
            name="role"
            id="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value="Entepreneur"

            onClick={showTopics}
          />
          <label htmlFor="role" className="text-white">Are you an Enterpreneur? Choose your interest:</label>

          {formik.touched.role && formik.errors.role ? (
            <span className="text-sm font-light text-red-500">
              {formik.errors.role}
            </span>
          ) : null}
        </div>
        {
          isMentor ?
            (
              <select
                name="topic"
                id="topic"
                className="border-b outline-none bg-white w-full "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.topic}
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Bakery">Bakery</option>
                <option value="Fishery">Fishery</option>
                <option value="Forex">Forex</option>
                <option value="Beekeeping">Beekeeping</option>
                <option value="Textile production">Textile production</option>
                <option value="Soap Making">Soap Making</option>
              </select>) :
            (null)
        }

        {formik.touched.topic && formik.errors.topic ? (
          <span className="text-sm font-light text-red-500">
            {formik.errors.topic}
          </span>
        ) : null}
        <Button type="submit" aria-label="continue" text={'continue'} />
      </form>
    </div>
  );
}
