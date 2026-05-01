import React from "react";

const PrivacyHeaderSection = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('')",
      }}
    >
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-blue-700 bg-opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-16 lg:py-20">
        {/* Top row */}
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            
            
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 sm:mt-16 pt-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-300">
            Privacy policy
          </h2>
          <p className="mt-4 text-white text-lg  text-bold sm:text-base  pt-5">
            Last updated: January 1, 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyHeaderSection;
