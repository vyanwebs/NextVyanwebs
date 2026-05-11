"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { workSeeder } from "@/seeder/workSeeder";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_SLUGS = ["rajmani", "vinsta"];

const WorkCards = ({ limit, projects: externalProjects }) => {
  const [workData, setWorkData] = useState([]);
  const [cardsWithOrientation, setCardsWithOrientation] = useState([]);
  const cardRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    if (externalProjects) setWorkData(externalProjects);
    else setWorkData(workSeeder);
  }, [externalProjects]);

  const cardsToRender = limit ? workData.slice(0, limit) : workData;

  useEffect(() => {
    const build = () => {
      const data = cardsToRender.map((item) => {
        const slug =
          item.slug ||
          item.title?.toLowerCase().trim().replace(/\s+/g, "-") ||
          "untitled";
        const isMobile = MOBILE_SLUGS.includes(slug);
        return { ...item, slug, isMobile };
      });
      setCardsWithOrientation(data);
    };
    build();
  }, [cardsToRender]);

  useEffect(() => {
    if (!cardsWithOrientation.length) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 30, filter: "blur(4px)" },
          {
            opacity: 1, x: 0, y: 0, filter: "blur(0px)",
            duration: 1.0, ease: "power3.out", delay: (i % 2) * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [cardsWithOrientation]);

  return (
    <div className="flex flex-wrap justify-center -mx-3">
      {cardsWithOrientation.map((project, index) => (
        <div
          ref={(el) => (cardRefs.current[index] = el)}
          key={project._id || index}
          className="w-full sm:w-1/2 lg:w-1/2 mb-16 px-6 group"
        >
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer shadow-md
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50"
            style={{ height: "420px" }}
            onClick={() => router.push(`/work/${project.slug}`)}
          >

            {/* ── BG image left half ── */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={project.mainImg || "/fallback.png"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* always-on dark gradient so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10 z-10" />
              {/* right-side dim so screen mockup pops */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent z-10" />
            </div>

            {/* ── Arrow badge ── */}
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            </div>

            {/* ── Screen image: MOBILE (Rajmani, Vinsta) ── */}
            {project.isMobile && project.screenImg && (
              <div
                className="absolute z-20 transition-all duration-500 ease-out"
                style={{
                  width: 150,
                  bottom: 0,
                  right: "10%",
                  transform: "translateY(25%)",
                }}
              // hover handled via CSS group below
              >
                <div
                  className="
                    absolute z-20 transition-all duration-500 ease-out
                    group-hover:[transform:translate(-50%,0%)]
                  "
                  style={{
                    width: 150,
                    bottom: 0,
                    right: "10%",
                  }}
                >
                  <div
                    className="relative rounded-[28px] overflow-hidden border-[6px] border-gray-800 shadow-2xl bg-black"
                    style={{ width: 150, height: 300 }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-gray-800 rounded-b-xl z-10" />
                    <Image
                      src={project.screenImg}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Screen image: WEB — right side, browser mockup ── */}
            {!project.isMobile && project.screenImg && (
              <div
                className="
                  absolute z-20
                  transition-all duration-500 ease-out
                  bottom-[15%] right-[-5%]
                  group-hover:right-[5%]
                "
                style={{ width: "52%" }}
              >
                {/* Browser chrome */}
                <div
                  className="rounded-xl overflow-hidden shadow-2xl border border-white/20"
                  style={{ background: "#1c1c1e" }}
                >
                  {/* Top bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2c2c2e]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="ml-2 flex-1 bg-[#3a3a3c] rounded-full h-4 flex items-center px-2.5">
                      <span className="text-[8px] text-gray-400 truncate">
                        {project.slug}.vyanwebs.com
                      </span>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <div className="relative w-full" style={{ height: 170 }}>
                    <Image
                      src={project.screenImg}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Card info pinned bottom-left ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
              <p className="text-xs uppercase tracking-widest text-gray-300 mb-1 font-medium">
                {project.subTitle || project.subtitle || ""}
              </p>
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/work/${project.slug}`}
                  className="text-base font-semibold text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.title}
                </Link>
                <ArrowUpRight
                  size={16}
                  className="text-gray-400 group-hover:text-blue-400 transition-all duration-300 flex-shrink-0"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(project.tags) &&
                  project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-0.5 rounded-full border border-white/20 group-hover:border-blue-400/40 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkCards;