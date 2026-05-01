"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { workSeeder } from "@/seeder/workSeeder";

gsap.registerPlugin(ScrollTrigger);

const WorkCards = ({ limit, projects: externalProjects }) => {
  const [workData, setWorkData] = useState([]);
  const [cardsWithOrientation, setCardsWithOrientation] = useState([]);

  const cardRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    if (externalProjects) {
      setWorkData(externalProjects);
    } else {
      setWorkData(workSeeder);
    }
  }, [externalProjects]);

  const cardsToRender = limit ? workData.slice(0, limit) : workData;

  const getImageOrientation = (src) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        resolve(img.width > img.height ? "landscape" : "portrait");
      };
      img.onerror = () => resolve("portrait");
    });
  };

  useEffect(() => {
    const fetchOrientation = async () => {
      const dataWithOrientation = await Promise.all(
        cardsToRender.map(async (item) => {
          const orientation = await getImageOrientation(
            item.screenImg || item.mainImg || "/fallback.png"
          );

          const slug =
            item.slug ||
            item.title?.toLowerCase().trim().replace(/\s+/g, "-") ||
            "untitled";

          return { ...item, orientation, slug };
        })
      );
      setCardsWithOrientation(dataWithOrientation);
    };
    fetchOrientation();
  }, [cardsToRender]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, y: 50 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.1,
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.in",
            });
          },
        });
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
            className="relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => router.push(`/work/${project.slug}`)}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden flex justify-center items-center rounded-xl">
              <Image
                src={project.mainImg || "/fallback.png"}
                alt={project.title}
                fill
                className="object-cover rounded-lg"
              />
              <Image
                className={`absolute shadow-lg object-cover rounded-lg transition-transform duration-300
                  ${project.orientation === "portrait"
                    ? "w-[180px] h-[365px] left-1/2 -bottom-3 transform -translate-x-1/2 translate-y-[15%] group-hover:translate-y-0"
                    : index % 2 === 0
                      ? "w-[400px] h-[255px] left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-[15%] group-hover:translate-y-0"
                      : "w-[400px] h-[280px] -right-3 top-1/2 transform translate-x-[15%] -translate-y-1/2 group-hover:translate-x-0"
                  }`}
                src={project.screenImg || project.mainImg || "/fallback.png"}
                alt={project.title}
                width={400}
                height={365}
              />
            </div>

            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                {project.subTitle || project.subtitle || ""}
              </p>
              <Link href={`/work/${project.slug}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-3 inline-block">
                {project.title}
              </Link>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(project.tags) &&
                  project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-xs px-3 py-1 rounded-full"
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