"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeroSection from "./ServiceLayout/HeroSection";
import ServiceCards from "./ServiceLayout/ServiceCards";
import Process from "./ServiceLayout/Process";
import ConnectBanner from "@/views/Home/connectBanner";
import Tech from "./ServiceLayout/Tech";
import WorkPreview from "../WorkPreview";
import EngagementModels from "@/sections/EngagementModel/EngagementModels";
import Faqs from "./ServiceLayout/Faqs";
import NavigationLayout from "./ServiceLayout/Navigation";
import App from "@/views/Contact/ContactForm";
import { serviceDetailSeed } from "@/seeder/serviceDetailSeed";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const found = serviceDetailSeed.find((s) => s.slug === slug);

    if (!found) setError("Service not found");
    else setServiceData(found);

    setLoading(false);
  }, [slug]);

  if (loading)
    return <div className="text-center py-20 text-white">Loading...</div>;

  if (error)
    return <div className="text-center py-20 text-white">{error}</div>;

  if (!serviceData)
    return <div className="text-center py-20 text-white">No data found</div>;

  const { hero, services, process, technologies, faqs, navigation } =
    serviceData;

  return (
    <div>
      <HeroSection service={hero} />

      {services?.length > 0 && <ServiceCards services={services} slug={slug} />}

      {process && (
        <Process
          title={process.title}
          subtitle={process.subtitle}
          steps={process.steps}
        />
      )}

      <ConnectBanner />

      {technologies && <Tech techList={technologies} />}

      <WorkPreview />
      <EngagementModels />

      {faqs?.length > 0 && (
        <Faqs faqs={faqs} title={slug.replace("-", " ")} />
      )}

      {navigation && <NavigationLayout nav={navigation} />}

      <App />
    </div>
  );
};

export default React.memo(ServiceDetails);