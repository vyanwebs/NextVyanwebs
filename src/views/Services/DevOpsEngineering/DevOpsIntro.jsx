import React from "react";

const DevOpsIntro = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between h-auto md:h-[60vh]">
      {/* Left Side */}
      <div className="bg-[#007aff] w-full md:w-1/2 flex justify-center flex-col pl-20 text-white">
        <div>
          <h2 className="text-[50px] md:text-[60px] font-bold leading-tight mb-4">
            Devops <br /> Engineering Services
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
          Enhance your IT operations with DevOps services from our company. Top DevOps services at Vyanwebs can help develop robust systems and improve throughput for your enterprise-grade products.
          
        </p>
      </div>
    </div>
  );
};

export default DevOpsIntro;
