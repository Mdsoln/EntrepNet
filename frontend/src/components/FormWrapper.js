"use client"
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import ProfileForm from "./ProfileForm";

export default function FormWrapper() {
    const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  return (
    <div>
    {step === 1 && <RegisterForm onNext={handleNext} />}
    {step === 2 && (
      <ProfileForm
        formData={formData}
        onPrev={handlePrev}
      />
    )}
  </div>
  )
}
