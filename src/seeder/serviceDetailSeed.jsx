import {
  Activity,AtSign,Beaker,Blocks,Bot,Box,BrickWall,Bubbles,Bug,Building2,Cable,Chrome,ClipboardList,
  Cloud,Code,CodeSquare,CodeXml,CreditCard,Drill,GitBranch,Layers,Monitor,Package,Phone,RefreshCw,Router,
  Server,
  ShoppingCart,Smartphone,SmartphoneCharging,Store,TabletSmartphone,TestTube,Users,
  Wrench,} from "lucide-react";

    
export const serviceDetailSeed = [
  //web development
  {
    slug: "web-development",
    hero: {
      title: "Web Development",
      subtitle:
        "Build modern, high-performance web applications tailored to your business.",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f",
    },

    services: [
      {
        title: "Custom Enterprise Software Development",
       description:   "We build tailored enterprise software to automate workflows, improve productivity, and ensure secure system integration using technologies like Java and Python. The goal is to deliver scalable, efficient, and business-focused solutions.",
        icon: <CodeXml />,
      },
      {
        title: "Enterprise Mobility Services",
        description:"We provide mobile-first solutions that include bespoke applications, secure device management, and collaboration tools to drive productivity, communication, and operational efficiency.",
        icon: <Smartphone />,
      },
      {
        title: "Legacy Application Modernization",
        description:"We upgrade outdated software by migrating to modern architectures, adding new capabilities, and optimizing systems for performance, scalability, and cloud readiness.",
        icon: <SmartphoneCharging />,
      },
      {
        title: "Software Consulting Services",
        description:"We support organizations with collection, storage, organization, and protection of data in a way that ensures accuracy, uniformity, and access for decision-making.",
        icon: <Monitor />,
      },
      {
        title: "Software Integration Services",
        description:
          "We'll analyze your current software ecosystem, discover missing pieces, and implement an action plan to optimize efficiencies, lower your total costs, and ensure long-term success.Data Management",
        icon: <Cable />,
      },
      {
        title: "Data Management",
        description:"We integrate multiple software systems to eliminate manual processes, improve data flow, enhance operational efficiency, and enable seamless communication across platforms.",
        icon: <Building2 />,
      },
      {
        title: "Blockchain App Development",
        description:
          "We develop decentralized applications and smart contracts using leading blockchain platforms, which enable secure, transparent, tamper-proof digital transactions.",
        icon: <Code/>,
      },
      {
        title: "Testing & Quality Assurance",
        description:
          "We perform detailed testing, from performance to usability, to ensure your applications meet the highest quality, reliability, and user experience standards.",
        icon: <Bug/>,
      },
      {
        title: "Application Maintenance",
        description:
          "We deliver ongoing monitoring, bug fixes, security updates, and enhancements, which keep your applications secure, stable, and up-to-date with the evolving needs of your business.",
        icon: <Drill/>,
        
      },
    ],

    process: {
      title: "Our Development Process",
      subtitle: "We follow a clean and transparent workflow",
      steps: [
        { title: "Discovery", desc: "Understanding your requirements" },
        { title: "Design", desc: "Creating UI/UX prototypes" },
        { title: "Development", desc: "Coding and implementation" },
        { title: "Testing", desc: "Ensuring quality and performance" },
        { title: "Launch", desc: "Deploying your project live" },
      ],
    },

    technologies: ["React", "Next.js", "Node.js", "MongoDB", "TailwindCSS", "AWS"],

    faqs: [
      {
        question:"What is software development?",
        answer:"Software development is the process of designing, building, and maintaining software applications. This includes tasks such as planning, coding, testing, and debugging."
      },
       {
        question:"What are the different stages of the software development life cycle (SDLC)?",
        answer:"The stages of the software development life cycle (SDLC) include requirements gathering, design, implementation, testing, deployment, and maintenance."
      },
       {
        question:"What is Agile software development?",
        answer:"Agile software development is an iterative approach that emphasizes flexibility, collaboration, and rapid delivery. It involves breaking down work into small, manageable chunks and completing them in short cycles called sprints."
      },

      {
        question: "How long does it take to build a website?",
        answer: "Typically 4–8 weeks depending on complexity.",
      },
      {
        question: "Do you provide hosting?",
        answer: "Yes, we support AWS, Vercel, and DigitalOcean.",
      },
    ],

    navigation: {
      prev: { slug: "cloud-devops", title: "Cloud & DevOps Solutions" },
      next: { slug: "mobile-app-development", title: "Mobile App Development" },
    },
  },

  // -----------------------------
  // MOBILE APP DEVELOPMENT
  // -----------------------------
  {
    slug: "mobile-app-development",
    hero: {
      title: "Mobile App Development",
      subtitle:
        "Create smooth and powerful mobile applications for Android & iOS.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    },
    services: [
      {
        title: "Design & Prototyping",
        description: "Our design experts at Vyanwebs use their expertise in developing intuitive and user-centric interfaces to captivate and engage. We transform your app vision from wireframing to an interactive prototype and into a seamless user experience to lay the foundation for your successful mobile application.",
        icon: <SmartphoneCharging />,
      },
      {
        title: "Native Mobile App Development",
        description: "At Vyanwebs, we are experts in developing purpose-built applications for a specific platform, whether it be iOS or Android. This enables us to tap into and integrate the native OS features and capabilities to achieve a fluid user experience and high performance.",
        icon: <Phone />,
      },
      {
        title: "Wearables & Embedded IoT App Development",
        description:"Discover the frontier of technology at Vyanwebs where wearables meet embedded IoT. Wearables & Embedded IoT App Development service is a combination of the worlds of wearable devices with their applications and the Internet of Things-IoT. Everything from smartwatches to IoT-enabled home appliances is designed and developed at Vyanwebs.", 
         icon: <Router/>,
      },
       {
        title: "iOS App Development",
        description:"At Vyanwebs, we excel in crafting bespoke iOS applications that leverage the full potential of Apple's ecosystem. Our iOS App Development service is characterized by precision, innovation, and a deep understanding of the iOS platform. Whether you are targeting iPhones, iPads, or both, we create seamless experiences that resonate with your audience and elevate your brand in the Apple App Store.", 
         icon: <AtSign/>,
      }, {
        title: "Android App Development",
        description:"Our Android App Development service will provide you with a tailor-made, high-performance app that seamlessly works on all Android devices. Our team also makes sure that your app is fully optimized in the Google Play Store for maximum visibility and downloads.", 
         icon:<Chrome/> ,
      },
       {
        title: "Cross-platform App Development",
        description:"Our Cross-platform App Development service will enable you to create custom apps that work seamlessly on multiple platforms, including iOS and Android. Our team ensures that your app is fully optimized for each platform, giving you maximum reach and engagement.", 
         icon: <GitBranch/>,
      },
    ],

    process: {
      title: "How We Build Apps",
      subtitle: "Fast, scalable and secure",
      steps: [
        { title: "Planning", desc: "Understanding app goals" },
        { title: "Wireframes", desc: "Initial screen designs" },
        { title: "Development", desc: "Building core features" },
        { title: "Testing", desc: "Functional & performance tests" },
        { title: "Release", desc: "Publishing on stores" },
      ],
    },
    technologies: ["Flutter", "React Native", "Firebase", "Kotlin", "Swift"],

    faqs: [
      {
        question: "Do you support Play Store publishing?",
        answer: "Yes, we handle full app deployment.",
      },
       {
        question: "How do you ensure the security of mobile apps during development?",
        answer: "We employ industry-leading practices like secure coding, encryption, and regular security audits to safeguard apps against potential vulnerabilities.",
      },
      {
        question: "How do you approach app store submissions and ensure app visibility?",
        answer: "This includes preparing assets, ensuring compliance with store guidelines, and conducting thorough testing. We also provide strategies to enhance app visibility.",
      },
      {
        question: "To what extent can I participate in the design and customization of my app?",
        answer: "You can be as actively involved as you prefer in shaping the app’s design and customization, including specifying features, functionality, and visual elements. We highly value client input and will collaborate closely with you to ensure your vision is realized effectively!",
      },
    ],

    navigation: {
      prev: { slug: "web-development", title: "Web Development" },
      next: { slug: "ui-ux-design", title: "UI/UX Design" },
    },
  },
  // UI/UX Design
   {
    slug: "ui-ux-design",
    hero: {
      title: "UI/UX Design",
      subtitle:
        "People don’t just use products—they experience them. ",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    },
    services: [
      {
        title: "Product design",
        description: "Create breathtakingly beautiful and engaging digital products that will leave a lasting impression on your customers from the very start.",
        icon: <BrickWall />,
      },
      {
        title: "User experience design",
        description: "Make your software user experience more human and add extra value for your customers and your business.",
        icon: <Blocks />,
      },
      {
        title: "User interface design",
        description:"Turn potential visitors into customers by offering them responsive, accessible user interface design for your product.", 
         icon: <Bubbles/>,
      },
       {
        title: "Wireframe & Prototyping",
        description:"We design page and site structure using wireframes, incorporating interaction design and information architecture in a clear illustrative approach.", 
         icon: <Beaker/>,
      }, {
        title: "Responsive Design",
        description:"Our UX experts develop websites that focus on user experience, have a responsive design, and fit all screen sizes without losing any quality." ,
         icon:<TabletSmartphone/> ,
      },
       {
        title: "Usability Audit & Testing",
        description:"Vyanwebs is a UX design company. We do usability testing for product acceptance. Our designs are tested by target audience along with compatibility and screen resolution tests.", 
         icon: <TestTube/>,
      },
    ],

    process: {
      title: "How We Build Apps",
      subtitle: "Fast, scalable and secure",
      steps: [
        { title: "Planning", desc: "Understanding app goals" },
        { title: "Wireframes", desc: "Initial screen designs" },
        { title: "Development", desc: "Building core features" },
        { title: "Testing", desc: "Functional & performance tests" },
        { title: "Release", desc: "Publishing on stores" },
      ],
    },
    technologies: ["Flutter", "React Native", "Firebase", "Kotlin", "Swift"],

    faqs: [
      
       {
        question: "What is UX/UI design?",
        answer: "UX/UI design refers to the process of designing digital interfaces, such as websites, mobile apps or software, with a focus on creating a positive user experience (UX) and an attractive visual design (UI).",
      },
      {
        question: "What is the difference between UX and UI design?",
        answer: "UX design focuses on creating a seamless and enjoyable experience for users while they interact with a digital product. This includes understanding their needs, preferences, and behaviors to design an interface that addresses those factors. UI design, on the other hand, focuses on the graphical elements of the interface, such as layouts, typography, and colors, with the goal of making the interface visually appealing and easy to use.",
      },
    
    ],

    navigation: {
      prev: { slug: "mobile-app-development", title: "Mobile App Development" },
      next: { slug: "ecommerce-development", title: "E-Commerce Development" },
    },
  },
  // Eccomerce Website
  {
  slug: "ecommerce-development",
  hero: {
    title: "E-Commerce Development",
    subtitle:
      "Launch a high-performance, scalable online store that converts visitors into loyal customers.",
    image: "https://img.freepik.com/free-photo/black-friday-sales-sign-neon-light_23-2151833076.jpg?semt=ais_hybrid&w=740&q=80",
  },

  services: [
    {
      title: "E-commerce Custom Store",
      description:"We craft fully customized eCommerce stores catering specifically to your brand, audience, and business objectives",
      icon: <Store />,
    },
    {
      title: "Shopping Cart & Checkout",
      description:"Smooth, fast, and secure checkout flows designed to increase conversions and reduce cart abandonment.",
      icon: <ShoppingCart />,
    },
    {
      title: "Payment Gateway Integration",
      description:"We integrate all major payment gateways including Razorpay, Stripe, PayPal, and international wallets.",
      icon: <CreditCard />,
    },
    {
      title: "Product Management System",
      description:"Easily manage products, categories, inventory, pricing, discounts, and variations from a powerful admin panel.",
      icon: <Package />,
    },
    {
      title: "Order & Inventory Management",
      description:"Get real-time inventory tracking and automated order updates for seamless business operations",
      icon: <ClipboardList />,
    },
    {
      title: "Multi-Vendor Marketplace",
      description:"Build your own Amazon or Flipkart-like marketplace with dynamic vendor-managed dashboards and commission control.",
      icon: <Users />,
    },
  ],

  process: {
    title: "How We Build E-Commerce Platforms",
    subtitle: "High performance · Secure · Conversion-focused",
    steps: [
      { title: "Research", desc: "Understanding your business, products, and goals" },
      { title: "Design", desc: "Creating store UI/UX focused on conversion" },
      { title: "Development", desc: "Building frontend, backend, APIs, and admin" },
      { title: "Integration", desc: "Payments, logistics, CRM, marketing tools" },
      { title: "Launch & Scale", desc: "Deployment, SEO, speed optimization" },
    ],
  },

  technologies: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Stripe",
    "Razorpay",
    "Firebase",
    "Tailwind",
    "Redux Toolkit",
  ],

  faqs: [
    {
      question: "How long does it take to build an e-commerce website?",
      answer:
        "A basic e-commerce store takes 2–4 weeks. Advanced stores with custom features or multi-vendor systems may take 6–10 weeks depending on requirements.",
    },
    {
      question: "What payment gateways can you integrate?",
      answer:
        "We integrate all major gateways including Stripe, PayPal, Razorpay, Paytm, PhonePe, Cashfree, and international cards.",
    },
    {
      question: "Will I get an admin panel?",
      answer:
        "Yes, we provide a full admin dashboard to manage products, inventory, categories, orders, coupons, SEO, and customers.",
    },
    {
      question: "Do you provide maintenance?",
      answer:
        "Yes, we offer monthly maintenance, performance monitoring, security updates, and new feature upgrades.",
    },
  ],

  navigation: {
    prev: { slug: "ui-ux-design", title: "UI/UX Design" },
    next: { slug: "software-development", title: "Software Development" },
  },
},
// software development
{
  slug: "software-development",

  hero: {
    title: "Software Development",
    subtitle:
      "Build powerful, scalable, and secure software solutions tailored to your business needs.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },

  services: [
    {
      title: "Custom Software Development",
      description:"We develop truly custom software solutions to fit your business goals, be it enterprise applications, automation tools, or industry-specific systems. We build secure, scalable, high-performance solutions",
      icon: <CodeSquare />,
    },
    {
      title: "Enterprise Software Solutions",
      description:"We develop robust enterprise systems that manage process automation, productivity enhancement, and ensure business operations run smoothly. From ERP to SCM, we customize systems that respond to the requirements of large-scale organizations.",
      icon: <Building2 />,
    },
    {
      title: "Cloud-Based Software Development",
      description:"We develop modern cloud-native applications using AWS, Azure, and Google Cloud to make sure high availability, scalability, and cost-effectiveness are achieved. ",
      icon: <Cloud />,
    },
    {
      title: "API Development & Integration",
      description:"We design secure, fast, and reliable APIs, and integrate third-party services to enable smooth communication of data across platforms and applications.",
      icon: <Cable />,
    },
    {
      title: "Software Maintenance & Support",
      description:"We offer continuous monitoring, bug fixes, performance upgrades, and new feature enhancements to keep your software secure and up-to-date",
      icon: <Wrench />,
    },
    {
      title: "SaaS Product Development",
      description:"We develop end-to-end SaaS platforms with features like subscription management, multi-tenancy, cloud scaling, and authentication.",
      icon: <Server />,
    },
    
    {
      title: "Quality Assurance & Testing",
      description:"We conduct extensive manual and automated testing to ensure your software will provide high performance, reliability, and accuracy on any device.",
      icon: <Bug />,
    },
  ],

  process: {
    title: "Our Software Development Process",
    subtitle: "Transparent, efficient, and tailored to your goals",
    steps: [
      { title: "Research & Analysis", desc: "Understanding business needs" },
      { title: "Architecture Design", desc: "Planning scalable system structure" },
      { title: "Development", desc: "Building the software features" },
      { title: "Testing & QA", desc: "Ensuring performance & security" },
      { title: "Deployment", desc: "Releasing your software to production" },
    ],
  },

  technologies: [
    "Python",
    "Java",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "Microservices"
  ],

  faqs: [
    {
      question: "What types of software do you develop?",
      answer:
        "We develop enterprise software, SaaS platforms, automation systems, CRM tools, APIs, cloud applications, and industry-specific solutions."
    },
    {
      question: "How long does software development take?",
      answer:
        "Depending on complexity, projects can take anywhere from 4 weeks to several months. We provide timelines after understanding your requirements."
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we offer ongoing maintenance, updates, bug fixes, and performance monitoring."
    },
    {
      question: "Can you modernize my legacy software?",
      answer:
        "Absolutely. We upgrade outdated systems into modern, scalable, and secure architectures using cloud, microservices, and updated technology stacks."
    },
  ],

  navigation: {
    prev: { slug: "ecommerce-development", title: "E-commerce Development" },
    next: { slug: "cloud-devops", title: "Cloud & DevOps Solutions" },
  },
},

// Devops 
{
  slug: "cloud-devops",
  hero: {
    title: "Cloud & DevOps Solutions",
    subtitle:"Accelerate development, automate deployments, and scale your applications with modern Cloud & DevOps practices.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },

  services: [
    {
      title: "Cloud Infrastructure Setup",
      description:
        "We design and deploy secure, scalable cloud environments using AWS, Azure, or Google Cloud.",
      icon: <Cloud />,
    },
    {
      title: "CI/CD Pipeline Automation",
      description:"Automate your development workflow using CI/CD pipelines for rapid and reliable deployments.",
      icon: <GitBranch />,
    },
    {
      title: "Containerization & Docker",
      description:"Package your apps into lightweight, portable containers for improved portability and efficiency.",
      icon: <Box />,
    },
    {
      title: "Kubernetes Orchestration",
      description:"Deploy and manage containerized applications with Kubernetes for auto-scaling and high availability.",
      icon: <Layers />,
    },
    {
      title: "Cloud Migration",
      description:"Seamlessly migrate applications, databases, and workloads to the cloud with zero downtime.",
      icon: <RefreshCw />,
    },
    {
      title: "Monitoring & Observability",
      description:"Stay ahead of issues with real-time monitoring, logging, and performance insights using tools like Prometheus & Grafana.",
      icon: <Activity />,
    },
  ],

  process: {
    title: "How We Deliver Cloud & DevOps",
    subtitle: "Automation · Scalability · Security",
    steps: [
      { title: "Assessment", desc: "Understanding current systems and pain points" },
      { title: "Architecture", desc: "Planning scalable and secure Cloud/DevOps workflows" },
      { title: "Implementation", desc: "Deploying CI/CD, Docker, Kubernetes, infra setup" },
      { title: "Automation", desc: "Automating deployments, scaling, infra operations" },
      { title: "Optimization", desc: "Continuous monitoring, cost optimization, improvements" },
    ],
  },

  technologies: [
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "Jenkins",
    "GitHub Actions",
    "Prometheus",
    "Grafana",
  ],

  faqs: [
    {
      question: "What is DevOps?",
      answer:
        "DevOps is a modern software practice that unifies development and operations to deliver applications faster with automation, CI/CD pipelines, and continuous monitoring.",
    },
    {
      question: "What cloud platforms do you support?",
      answer:
        "We support AWS, Microsoft Azure, Google Cloud Platform, DigitalOcean, and private cloud environments.",
    },
    {
      question: "Can you help migrate from on-premise to cloud?",
      answer:
        "Yes. We offer full cloud migration services including infrastructure planning, data migration, application refactoring, and security setup.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes, we provide complete DevOps maintenance including monitoring, updates, scalability management, and cost optimization.",
    },
  ],

  navigation: {
      prev: { slug: "ecommerce-development", title: "E-Commerce Development" },
    next: { slug: "web-development", title: "Web Development" },
  },
}
];