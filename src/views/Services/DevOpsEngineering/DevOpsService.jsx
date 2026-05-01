import { ChartAreaIcon, Cloud, Cog, Server, ToolCase, Lock } from 'lucide-react';
import React from 'react';

const services = [
  {
    title: "CI/CD Automation",
    description: "Automate your software delivery lifecycle to improve speed, quality, and reliability.",
    icon: <Cog className="text-blue-500 text-2xl" />,
  },
  {
    title: "Infrastructure as Code",
    description: "Manage infrastructure efficiently using tools like Terraform, CloudFormation, and Ansible.",
    icon: <Server className="text-green-500 text-2xl" />,
  },
  {
    title: "Monitoring & Logging",
    description: "Implement observability with tools like Prometheus, Grafana, ELK Stack, and Datadog.",
    icon: <ChartAreaIcon className="text-yellow-500 text-2xl" />,
  },
  {
    title: "Cloud Management",
    description: "Deploy and scale applications with AWS, Azure, or Google Cloud Platform.",
    icon: <Cloud className="text-purple-500 text-2xl" />,
  },
  {
    title: "Security Integration",
    description: "Integrate security into every stage of DevOps with automated checks and scanning.",
    icon: <Lock className="text-red-500 text-2xl" />,
  },
  {
    title: "Toolchain Setup",
    description: "Configure tools and pipelines tailored to your workflow for seamless development.",
    icon: <ToolCase className="text-indigo-500 text-2xl" />,
  },
];

const DevOpsService = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        DevOps Services
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col h-[350px]"
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
  );
};

export default DevOpsService;
