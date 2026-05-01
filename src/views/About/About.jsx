import React from 'react'
import CoreValues from './CoreValue';
import Industries from './Industries';
import AboutHero from './AboutHero';
import TestimonialSlider from '../Home/testimonials';
import ConnectBanner from '../Home/connectBanner';
import ContactBottom from '../Contact/ContactBottom';
import App from '../Contact/ContactForm';
import WorkPreview from '../Services/WorkPreview';
import AboutSection from './AboutSection';
import VisionMission from './VisionMission';
import SuccessSnapshot from "../Home/snapshot";

const About = () => {
  return <div>
    <AboutHero/>
    <AboutSection/>
    <SuccessSnapshot/>
    <VisionMission/>
    <CoreValues/>
    <TestimonialSlider/>
    <Industries/>
    <WorkPreview/>
    <ConnectBanner/>
    <App/>
  </div>;
}

export default About
