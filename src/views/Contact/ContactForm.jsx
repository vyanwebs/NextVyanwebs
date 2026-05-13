"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast, { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const leftRef = useRef(null);
  const formRef = useRef([]);

  formRef.current = [];
  const addToRefs = (el) => {
    if (el && !formRef.current.includes(el)) {
      formRef.current.push(el);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
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
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit!");
    }
  }, [reset]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
      });

      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current[0],
          start: "top 85%",
          toggleActions: "restart none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      <Toaster />

      {/* LEFT SIDE CONTENT */}
      <div
        ref={leftRef}
        className="w-full lg:w-1/2 p-6 sm:p-10 md:p-14 lg:p-20 bg-white"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-snug">
          Tell us about your <br /> project
        </h2>

        <p className="mb-6 text-base sm:text-lg leading-relaxed">
          We are always here to help. Whether you're ready<br className="hidden sm:block" />
          to start your journey or not, reach out to us.<br className="hidden sm:block" />
          We'd love to talk!
        </p>

        <div className="mb-4 text-base sm:text-lg leading-relaxed">
          <p className="mb-2">Schedule a free consultation at:</p>

          <div className="flex flex-wrap gap-4 mb-3">
          
            <a href="mailto:info@vyanwebs.com" className="text-blue-500">
              info@vyanwebs.com
            </a>
          </div>

          <p>Or fill out the form and we will follow up shortly.</p>
        </div>

        <p className="text-base sm:text-lg">
          Business at:{" "}
          <a href="tel:+919111721315" className="text-blue-500 font-semibold">
            +91 9111721315
          </a>
        </p>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div
        className="w-full lg:w-1/2 bg-primary-color 
                   p-6 sm:p-10 md:p-14 lg:p-20 xl:p-28 
                   space-y-6 sm:space-y-10"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* GRID INPUTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Input
              label="Name"
              refFn={addToRefs}
              error={errors.name}
              register={register("name", { required: "Name is required" })}
            />

            <Input
              label="Title/Role"
              refFn={addToRefs}
              register={register("title")}
            />

            <Input
              label="Email Address"
              refFn={addToRefs}
              error={errors.email}
              register={register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
            />

            <Input
              label="Phone Number"
              refFn={addToRefs}
              error={errors.phone}
              register={register("phone", {
                pattern: {
                  value: /^\+?[0-9]{7,15}$/,
                  message: "Invalid phone number",
                },
              })}
            />

            <Input
              label="Company/Organization"
              refFn={addToRefs}
              register={register("company")}
            />

            <Input
              label="What can we help you with?"
              refFn={addToRefs}
              register={register("helpWith")}
            />
          </div>

          {/* TEXTAREA */}
          <Textarea
            label="Tell us more...(E.g.: your idea, timeline, budget)"
            refFn={addToRefs}
            error={errors.message}
            register={register("message", {
              required: "Message is required",
            })}
          />

          {/* CONSENT */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              {...register("consent", {
                required: "Please allow us to contact you",
              })}
            />
            <label className="text-sm sm:text-base leading-relaxed">
              I allow Vyanwebs to contact me for scheduling and marketing, as per its{" "}
              <a href="#" className="underline">Privacy Policy</a>
            </label>
          </div>

          {errors.consent && (
            <p className="text-red-600 text-sm mt-1">{errors.consent.message}</p>
          )}

          {/* BUTTON */}
          <button
            className="mt-6 px-6 py-3 border border-blue-700 rounded-full 
                       text-blue-700 font-medium 
                       hover:bg-blue-700 hover:text-white 
                       transition w-full sm:w-auto"
          >
            Submit Your Request →
          </button>
        </form>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ label, register, error, refFn }) {
  return (
    <div className="flex flex-col" ref={refFn}>
      <label className="font-semibold uppercase text-sm mb-1">{label}</label>
      <input
        {...register}
        className="border-b border-black bg-transparent focus:outline-none py-1 text-sm"
      />
      {error && <p className="text-red-600 text-xs">{error.message}</p>}
    </div>
  );
}

/* TEXTAREA COMPONENT */
function Textarea({ label, register, error, refFn }) {
  return (
    <div ref={refFn}>
      <label className="font-semibold uppercase text-sm mb-1">{label}</label>
      <textarea
        rows="4"
        {...register}
        className="w-full border-b border-black bg-transparent focus:outline-none py-2 text-sm"
      ></textarea>
      {error && <p className="text-red-600 text-xs">{error.message}</p>}
    </div>
  );
}