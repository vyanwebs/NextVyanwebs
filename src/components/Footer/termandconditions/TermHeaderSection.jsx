import React from "react";

export default function TermsBanner() {
  return (
    <div
      className="relative flex flex-col items-start justify-center min-h-[250px] px-6 md:px-16 text-white pt-10"
      style={{
        background:
          "linear-gradient(rgba(0, 64, 255, 0.85), rgba(0, 64, 255, 0.85)), url('/your-bg-image.jpg') center/cover no-repeat",
      }}
    >
      <div className="mt-16 pt-20">
        <h1 className="text-3xl md:text-6xl font-bold text-green-300">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm md:text-base font-bold p-12">
          Last updated: July 1, 2025
        </p>
      </div>
    </div>
  );
}