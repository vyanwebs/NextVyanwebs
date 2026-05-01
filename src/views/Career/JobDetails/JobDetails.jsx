"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast, { Toaster } from "react-hot-toast";
import { Share, TypeOutline } from "lucide-react";
import { jobRequirementsSeed } from "@/seeder/jobSeed";
import ContactMap from "@/views/Contact/ContactMap";
import CareerApplicationForm from "../CareerApplicationForm";
import ConnectBanner from "@/views/Home/connectBanner";

gsap.registerPlugin(ScrollTrigger);

const JobDetails = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const respRef = useRef(null);
  const skillsRef = useRef(null);
  const reqRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const matched = jobRequirementsSeed.find((j) =>
      j.applyLink.toLowerCase().includes(slug.toLowerCase())
    );

    if (matched) {
      matched.skills = Array.isArray(matched.skills)
        ? matched.skills
        : String(matched.skills)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    }

    setJob(matched || null);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (!job) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Overview animation
      gsap.from(overviewRef.current, {
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
      });

      // Responsibilities animation
      gsap.from(respRef.current.querySelectorAll("li"), {
        scrollTrigger: {
          trigger: respRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
      });

      // Skills animation
      gsap.from(skillsRef.current.querySelectorAll("li"), {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -20,
        opacity: 0,
        stagger: 0.1,
      });

      // Requirements animation
      gsap.from(reqRef.current.querySelectorAll("li"), {
        scrollTrigger: {
          trigger: reqRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 20,
        opacity: 0,
        stagger: 0.1,
      });
    });

    return () => ctx.revert();
  }, [job]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!job) return <div className="p-10 text-center">Job not found</div>;

  return (
    <>
      <Toaster />

      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-20 px-6 flex items-center min-h-[50vh]">
        <div className="max-w-6xl mx-auto" ref={heroRef}>
          <p className="uppercase tracking-wide mb-2">{job.department}</p>
          <h1 className="text-4xl font-bold mb-3">{job.title}</h1>
          <p className="text-lg mb-3">{job.experience}</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleScrollToForm}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition cursor-pointer"
            >
              <TypeOutline className="text-lg" />
              <span className="text-xs sm:text-sm md:text-base">
                Register For Job Alerts
              </span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 border border-white px-4 py-2 rounded-full mt-4 cursor-pointer"
            >
              <Share className="text-lg" />
              <span className="text-xs sm:text-sm md:text-base">Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-12 px-6 bg-white" ref={overviewRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-gray-700">{job.overview}</p>
        </div>
      </section>

      {/* RESPONSIBILITIES */}
      <section className="py-12 px-6 bg-white" ref={respRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Responsibilities</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {job.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* SKILLS */}
      {job.skills.length > 0 && (
        <section className="py-12 px-6 bg-white" ref={skillsRef}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Skills</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {job.skills.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* REQUIREMENTS */}
      <section className="py-12 px-6 bg-white" ref={reqRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Requirements</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {job.requirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="max-w-6xl m-auto py-4 my-9">
          <ContactMap />
        </div>
        <div ref={formRef}>
          <CareerApplicationForm />
        </div>
        <ConnectBanner />
      </section>
    </>
  );
};

export default React.memo(JobDetails);