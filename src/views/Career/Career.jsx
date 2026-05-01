import React from 'react'
import CareerGallery from './CareerGallery'
import CareerAbout from './CareerAbout'
import WhatWeOffer from './WhatWeOffer'
import QuoteSection from './QuoteSection'
import CareerHero from './CareerHero'
import JobOpenings from './JobOpenings'
import CareerApplicationForm from './CareerApplicationForm'
import LookingFor from './LookingFor'
const Career = () => {
  return (
    <div className="">

      <CareerHero/>
      <JobOpenings/>
      <CareerGallery />
      <CareerAbout/>
      <WhatWeOffer />
      <QuoteSection/>
      <LookingFor/>
      <CareerApplicationForm/>
    </div>
  );
}

export default Career
