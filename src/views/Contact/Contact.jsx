import React from 'react'
import ContactForm from './ContactForm'
import ContactSection from './contactSection'
import ContactBottom from './ContactBottom'
import ContactMap from './ContactMap'
import ContactCard from './ContactCard'
import TestimonialSlider from '../Home/testimonials'

const Contact = () => {
  return <>
  <ContactSection/>
  <ContactForm/>
  
  <TestimonialSlider/>
  <ContactBottom/>
  <ContactMap/>
  <ContactCard/>
  
  
  </>
}

export default Contact
