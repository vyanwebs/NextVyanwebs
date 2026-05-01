import { ChevronDown } from 'lucide-react';
import React,{ useState} from 'react'

const faqs = [
  {
    question: "What is Software development?",
    answer:
      "Software development is the process of building and maintaining Softwaresites. It includes tasks such as Software design, Software content development, client-side/server-side scripting, and network security configuration.",
  },
  {
    question: "What are the different programming languages used in Software development?",
    answer:
      "There are several programming languages used in Software development including HTML, CSS, JavaScript, PHP, Python, Ruby, and Java.",
  },
  {
    question:
      "What is responsive design and why is it important in Software development?",
    answer:
      "Responsive design is an approach to Software design that makes Software pages render well on a variety of devices and screen sizes. It's important because more people browse the internet on mobile devices than on desktop computers.",
  },
  {
    question:
      "What is a content management system (CMS) and how does it help in Software development?",
    answer:
      "A content management system (CMS) is a software application that allows users to create, manage, and modify Softwaresite content without needing specialized technical knowledge. CMSs help simplify the content creation process and improve Softwaresite maintenance.",
  },
  {
    question:
      "How do I choose the right Software development company for my business?",
    answer:
      "When choosing a Software development company, it's important to consider factors such as their experience, portfolio, pricing, communication skills, and customer reviews.",
  },
];


const SoftDevFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <section className="bg-white py-16 px-6 md:px-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
          SoftwareDev FAQs
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
  )
}

export default SoftDevFAQ