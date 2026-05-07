"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast, { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const FloatingInput = ({ label, type = "text", name, registerField, error }) => {
  const labelRef = useRef(null);

  const handleFocus = () =>
    gsap.to(labelRef.current, {
      y: -20,
      scale: 0.85,
      color: "#1f2937",
      duration: 0.3,
    });

  const handleBlur = (e) => {
    if (!e.target.value) {
      gsap.to(labelRef.current, {
        y: 0,
        scale: 1,
        color: "#6b7280",
        duration: 0.3,
      });
    }
  };

  return (
    <div className="relative pt-6">
      <label
        ref={labelRef}
        className="absolute left-0 top-2 text-gray-500 text-sm transform origin-left pointer-events-none"
      >
        {label}
      </label>

      <input
        {...registerField(name)}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full bg-transparent border-b-2 focus:outline-none text-gray-900 
          ${error ? "border-red-600" : "border-gray-600"}`}
      />

      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

const CareerApplicationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const formFieldsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      gsap.from(leftRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: { trigger: leftRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 100,
        duration: 1.2,
        scrollTrigger: { trigger: rightRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      gsap.from(formFieldsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = useCallback(async (data) => {
    if (!data.consent) {
      setError("consent", {
        type: "manual",
        message: "Please accept the privacy policy.",
      });
      return;
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "resume") {
        formData.append(key, data[key]);
      }
    });

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const resp = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await resp.json();
    if (result.success) {
      toast.success("Form submitted successfully!");
      reset();
    } else {
      toast.error("Something went wrong!");
    }
  }, [reset, setError]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:flex-row min-h-[50vh] bg-gradient-to-br from-yellow-100 via-white to-yellow-50"
    >
      <Toaster />
      {/* Left */}
      <div
        ref={leftRef}
        className="md:w-1/2 p-10 flex flex-col justify-center bg-gray-50 shadow-xl"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Grow Your Career?
          <span className="text-blue-600"> !</span>
        </h2>
        <p className="text-lg text-gray-700">
          Just a few details and you're on your way.
        </p>
      </div>

      {/* Right */}
      <div ref={rightRef} className="md:w-1/2 bg-blue-100 p-10">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", type: "email", name: "email" },
            { label: "Phone Number", type: "tel", name: "phone" },
            { label: "Company Name", name: "companyName" },
            { label: "Location", name: "location" },
            { label: "Current CTC", name: "currentCTC" },
            { label: "Expected CTC", name: "expectedCTC" },
            { label: "LinkedIn URL", type: "url", name: "linkedInUrl" },
          ].map((field, i) => (
            <div key={i} ref={addToRefs}>
              <FloatingInput
                label={field.label}
                name={field.name}
                type={field.type}
                registerField={(name) => register(name, { required: `${field.label} is required` })}
                error={errors[field.name]}
              />
            </div>
          ))}

          <div ref={addToRefs}>
            <FloatingInput
              label="Notice Period"
              name="noticePeriod"
              registerField={(name) => register(name, { required: "Notice Period is required" })}
              error={errors.noticePeriod}
            />
          </div>

          <div ref={addToRefs} className="sm:col-span-2 relative pt-6">
            <label className="absolute left-0 top-2 text-gray-500 text-sm">
              Tell us about yourself
            </label>
            <textarea
              rows="4"
              {...register("aboutYourself")}
              className="w-full bg-transparent border-b-2 border-gray-600 text-white focus:outline-none"
            />
          </div>

          <div ref={addToRefs} className="sm:col-span-2">
            <label className="flex gap-2 text-sm text-white">
              <input type="checkbox" {...register("consent")} />
              Accept privacy policy
            </label>
            {errors.consent && <p className="text-red-600 text-sm">{errors.consent.message}</p>}
          </div>

          <div ref={addToRefs} className="sm:col-span-2 text-center mt-4">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:scale-105 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default React.memo(CareerApplicationForm);