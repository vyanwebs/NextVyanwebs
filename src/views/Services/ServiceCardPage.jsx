import React from 'react';
import ServiceCards from './ServiceCards'; 

const ServiceCardPage = () => {
  return (
    <div className="bg-white text-black py-16 px-6 md:px-16">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h5 className="text-lg md:text-xl leading-relaxed font-semibold">
          We provide a wide range of services designed to elevate your business.  
          Explore our offerings and see how our solutions can help you grow and scale efficiently.
        </h5>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto">
        <ServiceCards /> 
      </div>
    </div>
  );
};

export default ServiceCardPage;
