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
    gsap.to(labelRef.current, { y: -20, scale: 0.85, color: "#1f2937", duration: 0.3 });

  const handleBlur = (e) => {
    if (!e.target.value) {
      gsap.to(labelRef.current, { y: 0, scale: 1, color: "#6b7280", duration: 0.3 });
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
    formState: { errors, isSubmitting },
  } = useForm();

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const formFieldsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !formFieldsRef.current.includes(el)) formFieldsRef.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (ref) => ({
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      });
      gsap.from(sectionRef.current, { opacity: 0, y: 100, duration: 1, ease: "power2.out", scrollTrigger: st(sectionRef) });
      gsap.from(leftRef.current, { opacity: 0, x: -100, duration: 1, scrollTrigger: st(leftRef) });
      gsap.from(rightRef.current, { opacity: 0, x: 100, duration: 1.2, scrollTrigger: st(rightRef) });
      gsap.from(formFieldsRef.current, {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: st(rightRef),
      });
    });
    return () => ctx.revert();
  }, []);

  // ✅ Plain text message — Web3Forms will display this cleanly in the email
  const buildPlainTextMessage = (data) => `
NEW CAREER APPLICATION
======================
Submitted: ${new Date().toLocaleString()}

--- PERSONAL INFORMATION ---
Full Name      : ${data.firstName} ${data.lastName}
Email          : ${data.email}
Phone          : ${data.phone}
Location       : ${data.location}

--- PROFESSIONAL DETAILS ---
Company        : ${data.companyName || "Not provided"}
Current CTC    : ${data.currentCTC || "Not provided"}
Expected CTC   : ${data.expectedCTC || "Not provided"}
Notice Period  : ${data.noticePeriod ? `${data.noticePeriod} days` : "Not provided"}
LinkedIn       : ${data.linkedInUrl || "Not provided"}

--- ABOUT THE CANDIDATE ---
${data.aboutYourself || "No information provided."}
`.trim();

  const buildCandidateMessage = (data) => `
Dear ${data.firstName},

Thank you for applying to Vyanwebs! We have successfully received your career application.

Our HR team will review your application and get back to you within 3-5 business days.

Best regards,
HR Team
Vyanwebs
📍 Indore | Mumbai | hr@vyanwebs.com
`.trim();

  const onSubmit = useCallback(async (data) => {
    if (!data.consent) {
      setError("consent", { type: "manual", message: "Please accept the privacy policy." });
      return;
    }

    const loadingToast = toast.loading("Submitting application...");

    try {
      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (!web3formsKey) throw new Error("Web3Forms key is not configured");

      // ✅ Send plain text to HR — no HTML, just clean field : value pairs
      const hrRes = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Career Application - ${data.firstName} ${data.lastName}`,
          from_name: `${data.firstName} ${data.lastName}`,
          reply_to: data.email,
          message: buildPlainTextMessage(data),
        }),
      });

      const hrResult = await hrRes.json();
      if (!hrResult.success) throw new Error("Failed to send application to HR");

      // ✅ Send plain text confirmation to candidate
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          to: data.email,
          subject: "Application Received - Vyanwebs",
          from_name: "Vyanwebs HR Team",
          reply_to: "hr@vyanwebs.com",
          message: buildCandidateMessage(data),
        }),
      });

      toast.dismiss(loadingToast);
      toast.success("Application submitted! Check your email for confirmation.", {
        duration: 5000,
        icon: "✅",
      });
      reset();

    } catch (error) {
      console.error("Form submission error:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to submit. Please try again or contact us directly.", {
        duration: 6000,
        icon: "❌",
      });
    }
  }, [reset, setError]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:flex-row min-h-[50vh] bg-gradient-to-br from-yellow-100 via-white to-yellow-50"
    >
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: "#10B981", color: "white", padding: "16px" } },
          error: { style: { background: "#EF4444", color: "white", padding: "16px" } },
          loading: { style: { background: "#3B82F6", color: "white", padding: "16px" } },
        }}
      />

      {/* Left */}
      <div ref={leftRef} className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-gray-50 shadow-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Grow Your Career?
          <span className="text-blue-600"> !</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-700">Just a few details and you're on your way.</p>
      </div>

      {/* Right — Form */}
      <div ref={rightRef} className="md:w-1/2 bg-blue-100 p-6 sm:p-10">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Company Name", name: "companyName" },
            { label: "Location", name: "location" },
            { label: "Current CTC", name: "currentCTC" },
            { label: "Expected CTC", name: "expectedCTC" },
            { label: "LinkedIn URL", name: "linkedInUrl", type: "url" },
          ].map((field, i) => (
            <div key={i} ref={addToRefs} className="col-span-1">
              <FloatingInput
                label={field.label}
                name={field.name}
                type={field.type}
                registerField={(name) =>
                  register(name, {
                    required: `${field.label} is required`,
                    ...(field.name === "email" && {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }),
                  })
                }
                error={errors[field.name]}
              />
            </div>
          ))}

          <div ref={addToRefs} className="col-span-1">
            <FloatingInput
              label="Notice Period (in days)"
              name="noticePeriod"
              registerField={(name) => register(name, { required: "Notice Period is required" })}
              error={errors.noticePeriod}
            />
          </div>

          <div ref={addToRefs} className="sm:col-span-2 relative pt-6">
            <label className="absolute left-0 top-2 text-gray-500 text-sm">Tell us about yourself</label>
            <textarea
              rows="4"
              {...register("aboutYourself")}
              className="w-full bg-transparent border-b-2 border-gray-600 focus:outline-none text-gray-900"
            />
          </div>

          <div ref={addToRefs} className="sm:col-span-2">
            <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" {...register("consent")} />
              I accept the privacy policy and agree to be contacted
            </label>
            {errors.consent && <p className="text-red-600 text-sm">{errors.consent.message}</p>}
          </div>

          <div ref={addToRefs} className="sm:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default React.memo(CareerApplicationForm);