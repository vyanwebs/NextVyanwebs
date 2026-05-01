import React from "react";

const WebDevIntro = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between h-auto md:h-[60vh]">
      {/* Left Side */}
      <div className="bg-[#007aff] w-full md:w-1/2 flex justify-center flex-col pl-20 text-white">
        <div>
          <h2 className="text-[50px] md:text-[60px] font-bold leading-tight mb-4">
            Web <br /> Development
          </h2>
          
        </div>
        <div className="mt-6 mb-6">
          <button className="bg-white text-[#007aff] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all">
            Get a Free Estimation
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-zinc-900 w-full md:w-1/2 flex items-center p-8">
        <p className="text-white text-[18px] leading-relaxed">
          Create stunning web applications with our web development services
          that are responsive, robust, scalable, and quality-driven.
          <br />
          <br />
          At Vyanwebs, we are a top service provider for web development,
          offering access to the expertise of our knowledgeable developers and
          specialists.
          Our skilled developers use cutting-edge tools and technologies to help
          you establish meaningful communication with your users.
        </p>
      </div>
    </div>
  );
};

export default WebDevIntro;
