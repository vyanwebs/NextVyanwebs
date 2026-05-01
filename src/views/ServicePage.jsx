import React from 'react'
import ServiceHero from './Services/ServiceHero'
import Technologies from './Services/Technologies'
import EngagementModels from '@/sections/EngagementModel/EngagementModels'
import KeyBenefits from './Services/KeyBenefits'
import WorkPreview from './Services/WorkPreview'
import ServiceCardPage from './Services/ServiceCardPage'
import ConnectBanner from './Home/connectBanner'
import ContactForm from './Contact/ContactForm'

const ServicePage = () => {
  return (
    <div>
        <ServiceHero/>
        <ServiceCardPage/>
        <Technologies/>
        <EngagementModels/>
        <KeyBenefits/>
        <WorkPreview/>
        <ConnectBanner/>
        <ContactForm/>
    </div>
  )
}

export default ServicePage