"use client";

import React from "react";
import { useParams } from "next/navigation";
import { servicesData } from "../../Data/servicesData";
import Technologies from "../Services/Technologies";
import WorkPreview from "../Services/WorkPreview";
import EngagementModels from "../../sections/EngagementModel/EngagementModels";
import ContactForm from '../Contact/ContactForm';
import ConnectBanner from "../Home/connectBanner";
import { serviceComponents } from "../../lib/serviceComponents";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return <div className="text-center py-20">Service not found</div>;

  const SelectedIntro = serviceComponents[slug]?.Intro;
  const SelectedService = serviceComponents[slug]?.Service;
  const SelectedFAQ = serviceComponents[slug]?.FAQ;

  return (
    <div>
      {SelectedIntro && <SelectedIntro />}
      {SelectedService && <SelectedService />}
      <Technologies />
      <ConnectBanner />
      <WorkPreview />
      <EngagementModels />
      {SelectedFAQ && <SelectedFAQ />}
      <ContactForm />
    </div>
  );
};

export default ServiceDetail;