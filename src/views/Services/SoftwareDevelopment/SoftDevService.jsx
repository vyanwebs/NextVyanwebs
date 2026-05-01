import { Cloud, Code, Database, Phone, Plug, ShoppingCart } from 'lucide-react';
import React from 'react'


const services = [
  {
    title: "Ecommerce Web App Development",
    description:
      "Our skilled web developers specialize in creating dynamic eCommerce Web Apps using Shopify, Magento, and bespoke frameworks. These applications are tailored to enhance business expansion and elevate online visibility. We prioritize user engagement and growth by building eCommerce apps that are agile, secure, and user-friendly.",
    icon: <ShoppingCart className="text-blue-500 text-4xl" />,
  },
  {
    title: "Front-end Web Development",
    description:
      "We utilize advanced Frontend technologies such as React.js, Angular, and Vue.js to deliver component-driven architecture and reusable components. Our expertise in combining exceptional UI designs with the necessary functionalities allows us to seamlessly create web applications.",
    icon: <Code className="text-green-500 text-4xl" />,
  },
  {
    title: "Back-end Web Development",
    description:
      "Our team of skilled backend web developers can help make your application scalable, allowing for seamless navigation between multiple features. We offer hosting services on cloud platforms such as AWS and Azure, and use both SQL and NoSQL databases to reliably store and retrieve data using Microservices.",
    icon: <Database className="text-purple-500 text-4xl" />,
  },
  {
    title: "Progressive Web Application Development",
    description:
      "Creating your own website is surely a daunting task. So many companies turn to such platforms as WordPress. Vyanwebs has a lot of experience creating WordPress websites for all sort of businesses. The best part? They all bring in tangible results, that we can guarantee.",
    icon: <Phone className="text-pink-500 text-4xl" />,
  },
  {
    title: "SaaS Application Development",
    description:
      "Year over year mobile gets a larger share of the online traffic. If you want to be successful online you need a website, that is optimized for mobile. Vyanwebs, as a professional web design company, can make sure that on mobile your website will work and look the best way possible.",
    icon: <Cloud className="text-yellow-500 text-4xl" />,
  },
  {
    title: "API Development Services",
    description:
      "Having many visitors for your website is important, but what’s the use of a huge traffic if you can’t convert it into sales? Conversion rate optimization is a crucial part of your overall web design strategy. Vyanwebs is ready to help you transform your website from just a simple storefront to a well-oiled lead conversion machine.",
    icon: <Plug className="text-red-500 text-4xl" />,
  },
];

const SoftDevService = () => {
  return (
            <section className="bg-white py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Our Software Development Service
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col h-[350px]" // <-- Added fixed height
          >
            <div className="flex items-center gap-4 mb-4">
              {service.icon}
              <h3 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed overflow-hidden">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SoftDevService