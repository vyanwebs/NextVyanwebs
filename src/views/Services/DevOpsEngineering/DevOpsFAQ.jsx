import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const faqs = [
  {
    question: "What is DevOps?",
    answer: "DevOps is a set of practices that combines software development and IT operations to shorten the development lifecycle and deliver high-quality software continuously.",
  },
  {
    question: "Why is DevOps important?",
    answer: "It improves collaboration, increases deployment speed, and ensures more reliable releases with fewer failures.",
  },
  {
    question: "What tools are used in DevOps?",
    answer: "Common tools include Jenkins, Docker, Kubernetes, Git, Ansible, Terraform, and Prometheus.",
  },
  {
    question: "Is DevOps a culture or a job role?",
    answer: "DevOps is primarily a culture and set of practices, but companies often have specific DevOps roles to implement and maintain those practices.",
  },
];

const DevOpsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
        DevOps FAQs
      </h2>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-800">
                {faq.question}
              </span>
              <ChevronDown
                className={`text-gray-600 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-600 bg-white text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevOpsFAQ;
