import fi1 from "../assets/fi1.png";
import fi2 from "../assets/fi2.png";
import fi3 from "../assets/fi3.png";
import ams1 from "../assets/Our Website Images/ams/ams1.png";
import ams2 from "../assets/Our Website Images/ams/ams2.png";
import ams3 from "../assets/Our Website Images/ams/ams3.png";
import ams4 from "../assets/Our Website Images/ams/ams4.png";
import ams5 from "../assets/Our Website Images/ams/ams5.png";
import ams6 from "../assets/Our Website Images/ams/ams6.png";
import ams7 from "../assets/Our Website Images/ams/ams7.png";
import ams8 from "../assets/Our Website Images/ams/ams8.jpeg";

import hms1 from "../assets/Our Website Images/hms/hms-new1.png";
import hms2 from "../assets/Our Website Images/hms/hms2.png";
import hms3 from "../assets/Our Website Images/hms/hms3.png";
import hms4 from "../assets/Our Website Images/hms/hms4.png";
import hms5 from "../assets/Our Website Images/hms/hms-new3.png";
import hms6 from "../assets/Our Website Images/hms/hms-new2.png";
import hms7 from "../assets/Our Website Images/hms/hms-new4.png";

import jaat1 from "../assets/Our Website Images/jaat enterprises/jaat1.png";
import jaat2 from "../assets/Our Website Images/jaat enterprises/jaat2.png";
import jaat3 from "../assets/Our Website Images/jaat enterprises/jaat3.png";
import jaat4 from "../assets/Our Website Images/jaat enterprises/jaat4.png";
import jaat6 from "../assets/Our Website Images/jaat enterprises/jaat6.png";
import jaat7 from "../assets/Our Website Images/jaat enterprises/jaat7.png";
import jaat8 from "../assets/Our Website Images/jaat enterprises/jaat8.png";
import jaat9 from "../assets/Our Website Images/jaat enterprises/jaat9.png";

import rajmani1 from "../assets/Our Website Images/rajmani/rajmani1.png";
import rajmani2 from "../assets/Our Website Images/rajmani/rajmani2.png";
import rajmani4 from "../assets/Our Website Images/rajmani/rajmani4.png";
import rajmani5 from "../assets/Our Website Images/rajmani/rajmani5.png";
import rajmani6 from "../assets/Our Website Images/rajmani/rajmani6.png";
import rajmani7 from "../assets/Our Website Images/rajmani/rajmani7.png";
import rajmani8 from "../assets/Our Website Images/rajmani/rajmani8.png";

import ved1 from "../assets/Our Website Images/ved/ved1.png";
import ved2 from "../assets/Our Website Images/ved/ved2.png";
import ved3 from "../assets/Our Website Images/ved/ved3.png";
import ved4 from "../assets/Our Website Images/ved/ved4.png";
import ved5 from "../assets/Our Website Images/ved/ved5.png";
import ved6 from "../assets/Our Website Images/ved/ved6.png";
import ved7 from "../assets/Our Website Images/ved/ved7.png";

import redsa1 from "../assets/Our Website Images/redsa/redsa1.png";
import redsa2 from "../assets/Our Website Images/redsa/redsa2.png";
import redsa3 from "../assets/Our Website Images/redsa/redsa3.png";
import redsa4 from "../assets/Our Website Images/redsa/redsa4.png";
import redsa5 from "../assets/Our Website Images/redsa/redsa5.png";
import redsa6 from "../assets/Our Website Images/redsa/redsa6.png";
import redsa7 from "../assets/Our Website Images/redsa/redsa7.png";

import svvp1 from "../assets/Our Website Images/svvp/svvp1.png";
import svvp2 from "../assets/Our Website Images/svvp/svvp2.png";
import svvp3 from "../assets/Our Website Images/svvp/svvp3.png";
import svvp4 from "../assets/Our Website Images/svvp/svvp4.png";
import svvp5 from "../assets/Our Website Images/svvp/svvp5.png";
import svvp6 from "../assets/Our Website Images/svvp/svvp6.png";
import svvp7 from "../assets/Our Website Images/svvp/svvp7.png";

import worzo1 from "../assets/Our Website Images/worzo/worzo1.png";
import worzo2 from "../assets/Our Website Images/worzo/worzo2.png";
import worzo3 from "../assets/Our Website Images/worzo/worzo3.png";
import worzo4 from "../assets/Our Website Images/worzo/worzo4.png";
import worzo5 from "../assets/Our Website Images/worzo/worzo5.png";
import worzo6 from "../assets/Our Website Images/worzo/worzo6.png";
import worzo7 from "../assets/Our Website Images/worzo/worzo7.png";

import supper1 from "../assets/Our Website Images/supper/supper1.png";
import supper2 from "../assets/Our Website Images/supper/supper2.png";
import supper3 from "../assets/Our Website Images/supper/supper3.png";
import supper4 from "../assets/Our Website Images/supper/supper4.png";
import supper5 from "../assets/Our Website Images/supper/supper5.png";
import supper7 from "../assets/Our Website Images/supper/supper7.png";
import supper8 from "../assets/Our Website Images/supper/supper8.png";
import supper9 from "../assets/Our Website Images/supper/supper9.png";

export const showWorkSeeder = [
  // ===============================================================
  // 1. AMS PROJECT
  // ===============================================================
  {
    slug: "ams",
    title: "AMS-Attendance Management System",
    subTitle: "Web + Mobile App Development",
    tags: ["React Native", "React.js", "Node.js", "MongoDB", "Express.js"],

    heroImgs: [ams4], // ✅ must be an array
    heroTitle: "AMS-Attendance Management System",
    tagline:
      "A complete web + mobile app solution designed to automate attendance workflows.",
    description:
      "AMS enables organizations to efficiently track employee or student attendance with real-time syncing, reporting, and automated record management.",

    screenImg: ams1,
    showcaseImages: [ams1, ams2, ams5],
    floatingImages: [fi1, fi2, fi3],

    appShowcaseImages: [],

    aboutLeft:
      "The Attendance Management System was developed to reduce manual workload and deliver a smooth attendance workflow for institutions and companies.",
    aboutRight:
      "It offers multi-role access, analytic dashboards, exportable reports, mobile tracking, and offline-first attendance punching.",

    client: "Rajiv Patidar",
    role: "Full-stack Development",
    categoryLine: "Web + Mobile App",
    overviewDescription:
      "Designed a high-performance attendance system with dashboards, automated calculations, and role-based access.", // ✅ renamed (avoid conflict with hero description)

    mobileHeading: "Mobile Experience",
    mobileImages: [ams3, ams3],
    mobileFeatures: [
   {
  title: "QR-based Punching",
  subTitle:
    "Implemented a fast and secure QR-based attendance mechanism that allows users to punch in within seconds. The system validates identity, updates attendance records instantly, and provides real-time visibility to admins through advanced dashboards and analytics.",
},
{
  title: "Offline Attendance Support",
  subTitle:
    "Developed a fully offline-capable attendance module that works even without internet connectivity. Data is stored locally on the device and automatically syncs with the server once the connection is restored, ensuring uninterrupted attendance tracking in remote or low-network areas.",
},
{
  title: "Push Notifications",
  subTitle:
    "Integrated a smart notification system that sends instant alerts for attendance status, approvals, reminders, updates, and admin announcements. The feature ensures quick communication across staff and management, improving overall operational efficiency.",
},
{
  title: "Profile & Leave Tracking",
  subTitle:
    "Created a complete profile management and leave-tracking module where users can update their information, apply for leave, track approval status, view attendance history, and access monthly performance summaries—all from a single, intuitive interface.",
}

    ],

    featuresTitle: "Core Features",
    featuresSubtitle: "Powerful modules delivered",
    featuresList: [
      { title: "Real-time Attendance Tracking", image: ams7 },
      { title: "Generate ID Card for student and staff", image: ams6 },
      { title: "Admin, HR & Employee Roles", image: ams2 },
      { title: "Exportable CSV & PDF Reports", image: ams7 },
      { title: "Easy to connect with RFID Machine", image: ams8 },
    ],
    featuresImage: ams3,

    prevSlug: "supper-club",
    prevTitle: "Supper Club",
    nextSlug: "hms",
    nextTitle: "HMS-Hotel Management System",

    navigationImage: {
      title: "AMS Project",
      image: ams4,
    },
  },

  // ===============================================================
  // 2. HMS PROJECT
  // ===============================================================
  {
    slug: "hms",
    title: "HMS-Hotel Management System",
    subTitle: "Full Property Management System",
    tags: ["React.js", "Node.js", "MongoDB", "Express"],

    heroImgs: hms1,
    heroTitle: "HMS-Hotel Management System",
    tagline: "A modern PMS solution for handling hotel operations seamlessly.",
    description:
      "HMS automates booking, room allocation, invoicing, customer details, and overall hotel operations with an intuitive dashboard.",

    screenImg: hms2,
    showcaseImages: [ hms2, hms3,hms4],
    floatingImages: [fi1, fi2, fi3],

    aboutLeft:
      "Developed to simplify the daily operations of hotel staff and management.",
    aboutRight:
      "Includes booking management, room mapping, payment tracking and multi-user role support.",

    client: "Alex Cindre",
    role: "Full-stack Development",
    categoryLine: "Web Application",
    overviewDescription:
      "Built a robust hotel management interface with real-time updates and analytics.",

    mobileHeading: "Mobile experience",
    mobileImages: [ hms5,hms6],
    mobileFeatures: [
      {
        title: "Role-Based Staff Management",
        subTitle:
          "Designed a high-performance attendance system with dashboards, automated calculations, and role-based access.",
      },
      {
        title: "Role-Based Access Control (RBAC)",
        subTitle:
          "Every staff member in a hotel gets a role with specific permissions.No unauthorized access Clear separation of duties Smooth operational workflow Better monitoring and accountability",
      },
      {
        title: "Sub Admin",
        subTitle:
          "Designed a high-performance attendance system with dashboards, automated calculations, and role-based access.",
      },
      {
        title: "Profile & Leave Tracking",
        subTitle:
          "A Sub Admin is the main admin of the hotel or hotel group Manage one hotel (single-branch subscription) Manage multiple hotels/branches (multi-branch subscription) Add and assign Branch Admins for each hotel/property View overall group performance Control high-level hotel settings.",
      },
      {
        title: "Centralized Staff Oversight",
        subTitle:"Monitor all staff activities across branches in one unified dashboard—track attendance, permissions, performance, and leave summaries without switching screens, ensuring smooth administration and faster decision-making."
      },
    ],

    featuresTitle: "Features",
    featuresSubtitle: "What we built",
    featuresList: [
      { title: "Complete Role-Based Control", image: hms2 },
      { title: "Sub-Admin View Subscription", image: hms3 },
      { title: "Generate and Print Bill and Reports", image: hms4 },
    ],
    featuresImage: hms7,

    prevSlug: "ams",
    prevTitle: "AMS-Attendance Management System",
    nextSlug: "jaat",
    nextTitle: "JAAT-Solar Energy ",

    navigationImage: {
      title: "HMS-Hotel Management System",
      image: hms1,
    },
  },

  // ===============================================================
  // 3. JAAT
  // ===============================================================
  {
    slug: "jaat",
    title: "JAAT-Solar Energy",
    subTitle: "Web Powering Your World, The Smart Way",
    tags: ["React.js", "Tailwind CSS"],

    heroImgs: jaat6,
    heroTitle: "JAAT-Solar Energy",
    tagline: "Web Powering Your World, The Smart Way !",
    description:
      "We specialize in high-quality solar panel installations and complete electrical solutions for residential, commercial, and industrial needs. Our work blends innovation, efficiency, and reliability",

    screenImg: jaat1,
    showcaseImages: [jaat2, jaat3, jaat4],
    floatingImages: [fi1, fi2, fi3],

    appShowcaseImages: [jaat2, jaat3, jaat4],

    aboutLeft:
      "We don't just deliver services—we power progress. Specializing in solar energy and electrical construction, we build with trust, technology, and long-term value.",
    aboutRight:
      "Jaat Enterprises is committed to guiding you every step of the way — from your first question to the final installation and beyond. We’re not just service providers — we’re your partners in building a smarter, brighter, and more sustainable future.",

    client: "Mr. Mahesh Chandra Jaat",
    role: "Frontend Development",
    categoryLine: "Business Website",
    overviewDescription: "Web Powering Your World, The Smart Way",

    mobileHeading: "Mobile Experience",
    mobileImages: [jaat7, jaat8],
    mobileFeatures: [
      {
        title: "Solar Energy Solutions",
        subTitle:
          "Delivering end-to-end solar power systems including large-scale solar park development, rooftop PV installations (on-grid, off-grid, hybrid), solar street lighting, agricultural solar pumping, and advanced battery storage solutions to maximize energy efficiency and sustainability.",
      },
      {
        title: "Electrical HT2 LT Works",
        subTitle:
          "Expertise in 33kV & 220kV high-voltage line work, double/single ES services, LT line installation, advanced grid manufacturing, and complete electrical distribution setup with precision and safety compliance.",
      },
      {
        title: "Civil Engineering Works",
        subTitle:
          "Providing strong civil infrastructure including transformer foundations, MCR (Main Control Room) construction, LT panel installation, and complete structural solutions for 33kV & 220kV power systems, ensuring long-lasting reliability.",
      },
      {
        title: "Affordable Pricing",
        subTitle:
          "Offering competitive pricing without compromising quality—featuring certified technicians, high-grade components, transparent cost breakdowns, dedicated support, and warranty-backed service assurance for long-term value",
      },
    ],

    featuresTitle: "Highlights",
    featuresSubtitle: "Powerful modules delivered",
    featuresList: [
      { title: "Fast UI", image: jaat2 },
      { title: "Mobile Responsive", image: jaat3 },
      { title: "SEO Optimized", image: jaat1 },
    ],
    featuresImage: jaat9,

    prevSlug: "hms",
    prevTitle: "HMS-Hotel Management System",
    nextSlug: "rajmani",
    nextTitle: "Rajmani Jewellers",

    navigationImage: {
      title: "JAAT-Solar Energy",
      image: jaat6,
    },
  },

  // ===============================================================
  // 4. RAJMANI JEWELLERS
  // ===============================================================
  {
    slug: "rajmani",
    title: "Rajmani Jewellers",
    subTitle: "Luxury Store Website",
    tags: ["React.js", "Node.js", "MongoDB"],

    heroImgs: rajmani2,
    heroTitle: "Rajmani Jewellers",
    tagline:
      "Premium jewellery website with catalog, categories, and store features.",
    description:
      "Built a fully dynamic jewellery website featuring collections, product highlights, and store information.",

    screenImg: rajmani1,
    showcaseImages: [rajmani6, rajmani7, rajmani8],
    floatingImages: [fi1, fi2, fi3],

    aboutLeft:
      "Rajmani Jewellers brings you a smart Gold SIP plan—invest monthly and grow your gold effortlessly with guaranteed purity and trust.",
    aboutRight:
      "Build your gold wealth seamlessly with Rajmani Jewellers’ Gold SIP—easy monthly savings, lifetime value.",

    client: "Kratin Rathore",
    role: "Full-stack Development",
    categoryLine: "E-Commerce",
    overviewDescription:
      "An elegant premium jewellery site with product categories and CMS panel.",

    mobileHeading: "Mobile Experience",
    mobileImages: [rajmani4, rajmani5],
    mobileFeatures: [
      {
        title: "Start Your Gold SIP Today",
        subTitle:
          "Rajmani Jewellers brings you a secure and flexible Gold Savings Plan that turns small monthly deposits into pure gold for your future.",
      },
      {
        title: "Rajmani Admin Panel",
        subTitle:
          "Manage customers, transactions, SIP plans, installment history, and gold weights.Track pending payments, due installments, renewals, and settlement reports",
      },
      {
        title: "Push Notifications",
        subTitle:
          "Rajmani uses Firebase-powered push notifications to instantly alert customers about offers, payments, SIP updates, and important account activity.",
      },
      {
        title: "Native Admin APK",
        subTitle:
          "Instant access to customer accounts, SIP progress, and payment entries.Quick view dashboard for today’s due SIPs, reminders, and alerts.",
      },
      {
        title: "Rajmani Static Website",
        subTitle:
          "Clean, fast-loading static website showcasing Rajmani’s brand & products.Information pages for Gold SIP, schemes, offers, and benefits",
      },
    ],

    featuresTitle: "Features",
    featuresSubtitle: "",
    featuresList: [
      { title: "Static Website", image: rajmani1 },
      { title: "Admin Panel for manage order and SIP", image: rajmani6 },
    ],
    featuresImage: rajmani4,

    prevSlug: "jaat",
    prevTitle: "JAAT-Solar Energy",
    nextSlug: "ved",
    nextTitle: "Ved Tour and Travels",

    navigationImage: {
      title: "Rajmani Project",
      image: rajmani2,
    },
  },

  // ===============================================================
  // 5. Ved TOUR & TRAVELS
  // ===============================================================
  {
    slug: "ved",
    title: "Ved-Tour And Travels",
    subTitle: "Discover Your Next Adventure",
    tags: ["React.js", "Node.js", "MongoDB", "Express"],

    heroImgs: ved4,
    heroTitle: "Ved-Tour And Travels",
    tagline: "Discover Your Next Adventure",
    description:
      "With Ved Travels, experience unforgettable journeys designed just for you. From breathtaking landscapes to cultural wonders — we make it happen.",

    screenImg: ved1,
    showcaseImages: [ved1, ved2, ved3],
    floatingImages: [fi1, fi2, fi3],

    aboutLeft:
      "At Ved Travels , we believe travel isn’t just about going places—it’s about creating memories that last a lifetime. Our journey began with a simple idea: to make travel easier, more meaningful, and accessible for everyone. Over the years, we’ve grown into a trusted name in the travel industry, helping thousands of explorers, couples, families, and solo adventurers discover the beauty of the world",
    aboutRight:
      "Get ready to experience the thrill of new places, the beauty of diverse cultures, and the joy of unforgettable journeys. Whether you're craving an adrenaline-pumping adventure or a peaceful retreat, this is your chance to explore handpicked destinations that promise excitement, discovery, and lasting memories. Let your next great escape begin here.",

    client: "Mayur Dhangar",
    role: "Full-stack Development",
    categoryLine: "Travel Website",
    overviewDescription: "Interactive Travel Website",
    mobileHeading: "Mobile Experience",
    mobileImages: [ved5, ved6],
    mobileFeatures: [
      {
        title: "User Ticket Booking System",
        subTitle:
          "Users can browse routes, select departure timing, and book tickets instantly. Smart form validation ensures accurate passenger details. OTP sent to user’s mobile number for secure verification before confirmation",
      },
      {
        title: "OTP-Based Authentication",
        subTitle:
          "Integrated secure OTP verification workflow. Booking is only confirmed after successful OTP validation.Prevents spam and fraudulent bookings.",
      },
      {
        title: "Admin Panel (Backend Dashboard)",
        subTitle:
          "Admin can view all ticket bookings in real-time. Manage incoming booking requests with approve/reject options.Check payment status before confirming the ticket.",
      },
      {
        title: "Payment Workflow",
        subTitle:
          "User initiates booking → enters details → receives OTP → verifies → booking goes to admin for payment confirmation. Admin reviews the payment proof or gateway status before approving.",
      },
       {
        title: "Live Bus Status & Seat Availability",
        subTitle:
          "Users can view real-time seat availability, track bus status, and instantly know whether a route is open, full, or scheduled. This improves booking accuracy and reduces last-minute confusion for both users and the admin",
      },
    ],

    featuresTitle: "Core Modules",
    featuresSubtitle: "Powerful modules delivered",
    featuresList: [
      { title: "Responsive & mobile-friendly UI/UX.", image: ved1 },
      {
        title: "Real-time ticket booking system with live availability.",
        image: ved2,
      },
      {
        title: "OTP-based user verification ensuring secure booking",
        image: ved3,
      },
    ],
    featuresImage: ved7,

    prevSlug: "rajmani",
    prevTitle: "Rajmani Jewellers",
    nextSlug: "redsa",
    nextTitle: "REDSA-Real Estate Property Portal",
    navigationImage: {
      title: "Ved Tour and Travels",
      image: ved4,
    },
  },

  // ===============================================================
  // 6. REDSA
  // ===============================================================
  {
    slug: "redsa",
    title: "REDSA-Real Estate Property Portal",
    subTitle: "Real Estate Property Portal",
    tags: ["React.js", "Node.js", "MongoDB"],

    heroImgs: redsa4,
    heroTitle: "REDSA-Real Estate Property Portal",
    tagline:
      "Join the Real Estate Direct Seller Association (REDSA) and Become a United Force!",
    description:
      "Let’s build a future where your hard work is valued, your rights are respected, and your business is protected. Join REDSA today and help shape the future of real estate!",

    screenImg: redsa1,
    showcaseImages: [redsa5, redsa6, redsa7],
    floatingImages: [fi1, fi2, fi3],

    appShowcaseImages: [redsa1, redsa1],

    aboutLeft:
      "To organize and protect the interests of every direct seller (agent) working in the real estate sector.",
    aboutRight:
      "To assist real estate direct sellers in receiving their commissions or incentives from builders, developers, or property buyers/sellers without any hindrance.",

    client: "Sunil Vishvakarma",
    role: "Full-stack Development",
    categoryLine: "Web Application",
    overviewDescription: "A secure platform For Real Estate.",

    mobileHeading: "Mobile Experience",
    mobileImages: [redsa3, redsa1],
    mobileFeatures: [
      {
        title: "Property Search & Listing Feature",
        subTitle:
          "Users can easily explore properties using an advanced search system that supports location filtering, price range sliders, property categories, bedrooms, amenities, and more. Listings are displayed in a clean, modern grid layout, while each property has a dedicated detail page showcasing high-quality image galleries, descriptive overviews, key features, floor plans, and an integrated Google Maps view for accurate location insights.",
      },
      {
        title: "Enquiry & Lead System",
        subTitle:
          "Every property includes an instant enquiry form, allowing potential buyers or renters to submit their details seamlessly. Whenever an enquiry is submitted, the admin receives it instantly, enabling quick follow-ups. This transformed the website into a powerful lead-generation engine, helping the client convert browsing visitors into serious customers.",
      },
      {
        title: "Property Management Admin Panel",
        subTitle:
          "Manage categories like residential, commercial, plots, rentals, etc.",
      },
      {
        title: "Modern UI & User Experience",
        subTitle:
          "Professional real estate look with elegant colors and typography.Fully responsive and optimized for mobile users.",
      },
    ],

    featuresTitle: "Features",
    featuresSubtitle: "Powerful modules delivered",
    featuresList: [
      {
        title:
          "Modern real estate listing platform with advanced search & filters.",
        image: redsa5,
      },
      {
        title: "Fully responsive design for mobile, tablet & desktop.",
        image: redsa6,
      },
      {
        title:
          "Admin panel to manage properties, images, categories & enquiries.",
        image: redsa7,
      },
    ],
    featuresImage: redsa2,

    prevSlug: "ved",
    prevTitle: "Ved Tour and travels",
    nextSlug: "svvp",
    nextTitle: "SVVP-School",

    navigationImage: {
      title: "Redsa",
      image: redsa4,
    },
  },
  // ===============================================================
  // 7. SVVP SCHOOL WEBSITE
  // ===============================================================
  {
    slug: "svvp",
    title: "SVVP School Website",
    subTitle: "School Management Website",
    tags: ["React.js", "Tailwind", "Animation"],

    heroImgs: svvp4,
    heroTitle: "SVVP -Swami Vivekanand Vidhya Peeth",
    tagline:
      "A modern educational website representing school activities & academics.",
    description:
      "Includes gallery, achievements, notices, academics, and admission enquiry.",

    screenImg: svvp1,
    showcaseImages: [svvp1, svvp2, svvp3],
    floatingImages: [fi1, fi2, fi3],

    appShowcaseImages: [svvp3],

    aboutLeft: "Beautiful layout representing school identity.",
    aboutRight: "Clean UI with academic sections and contact details.",

    client: "Prathna Sharma",
    role: "Frontend Development",
    categoryLine: "School Website",
    overviewDescription:
      "A complete academic website with modern UI and animations.",
    mobileHeading: "Mobile Experience",
    mobileImages: [svvp5, svvp6],
    mobileFeatures: [
      {
        title: "Modern School Homepage",
        subTitle:
          "Crafted a clean, responsive landing page showcasing school values, vision, mission, and key highlights.",
      },
      {
        title: "Academic Programs Display",
        subTitle:
          "Designed sections for curriculum details, class structures, and subject information with an organized layout.",
      },
      {
        title: "Gallery & Media Section",
        subTitle:
          "Built a dynamic photo/video gallery to display events, celebrations, and yearly activities.",
      },
      {
        title: "Admission & Inquiry Forms",
        subTitle:
          "Developed secure online admission forms with backend integration and automated email notifications.",
      },
      {
        title: "Digital Admission & Inquiry",
        subTitle:
          "Implemented secure online forms for admission inquiries with backend submission handling.",
      },
      {
        title: "Communication & Updates",
        subTitle:
          "Added notice boards, event announcements, exam updates, and school news to help parents stay informed.",
      },
    ],

    featuresTitle: "Highlights",
    featuresList: [
      { title: "Responsive & Mobile-Friendly UI", image: svvp1 },
      { title: "Dynamic Holiday List", image: svvp2 },
      { title: "Faculty & Staff Profiles", image: svvp3 },
    ],
    featuresImage: svvp7,

    prevSlug: "redsa",
    prevTitle: "REDSA-Real Estate Property Portal",
    nextSlug: "worzo",
    nextTitle: "Worzo-E-Bike",
    navigationImage: {
      title: "Rajmani Project",
      image: svvp4,
    },
  },
  // ===============================================================
  // 8. Worzo
  // ===============================================================
  {
    slug: "worzo",
    title: "Worzo:E-Bike",
    subTitle:
      "Revolutionizing Urban Mobility Creating sustainable transportation solutions for tomorrow",
    tags: ["Next.js", "Tailwind", "Redux", "Supabase", "Google Maps", "Msg91"],

    heroImgs: worzo7,
    heroTitle: "Worzo – E Bike",
    tagline:
      "A modern EV bike showcase website with product highlights and brand identity.",
    description:
      "Worzo is an EV bike company website featuring their electric vehicle lineup, specifications, gallery, and customer engagement modules. and all Store location ",

    screenImg: worzo1,
    showcaseImages: [worzo1, worzo2, worzo3],
    floatingImages: [fi1, fi2, fi3],

    appShowcaseImages: [worzo1],

    aboutLeft:
      "To revolutionize urban mobility with sustainable, affordable, and high-performance electric scooters",
    aboutRight:
      "To empower riders with eco-friendly, cost-effective, and technologically advanced two-wheelers",

    client: "Mihir Mehta",
    role: "Frontend + Backend",
    categoryLine: "Brand Website",
    overviewDescription:
      "Worzo is on a mission to revolutionize the Indian EV industry by making electric mobility affordable, reliable, and innovative. As a part of Radhika EV Mobility Pvt Ltd, backed by 40+ years of experience in retail and distribution, we bring deep market expertise and a strong customer-first approach.",

    mobileHeading: "Mobile Experience",
    mobileImages: [worzo5, worzo4],
    mobileFeatures: [
      {
        title: "Responsive E-Bike Website",
        subTitle:
          "Crafted a modern, mobile-first layout showcasing Worzo’s electric bikes and brand identity.",
      },
      {
        title: "Dealer Locator Map",
        subTitle:
          "Integrated an interactive map displaying all dealer locations dynamically from the backend.",
      },
      {
        title: "Become a Dealer System",
        subTitle:
          "Developed a secure dealer application form with automated backend submission.",
      },
      {
        title: "Admin Panel Dashboard",
        subTitle:
          "Built a clean and intuitive panel for managing dealers, inquiries, and website content.",
      },
      {
        title: "Fast Loading & Optimization",
        subTitle:
          "Implemented image compression, caching, and optimized queries for seamless performance on all devices.",
      },
      {
        title: "User Inquiry System",
        subTitle:
          "Added a general inquiry/contact module with backend routing and instant admin notifications.",
      },
    ],

    featuresTitle: "Key Highlights",
    featuresSubtitle: "Powerful modules delivered",
    featuresList: [
      {
        title: "Dynamic Home page Chnage Color According to Vehicle ",
        image: worzo1,
      },
      { title: "About Worzo Intro Video", image: worzo2 },
      { title: "Dynamic Dealer Location ", image: worzo3 },
    ],
    featuresImage: worzo6,

    prevSlug: "svvp",
    prevTitle: "SVVP School Website",
    nextSlug: "supper-club",
    nextTitle: "Supper Club – Restaurant Website",

    navigationImage: {
      title: "Worzo Project",
      image: worzo7,
    },
  },
  // ===============================================================
  // 9. Supper Club
  // ===============================================================
  {
    slug: "supper-club",
    title: "Supper Club Restaurant Website",
    subTitle: "Restaurant Reservation + Menu Website",
    tags: ["Next.js", "Tailwind", "Redux", "Supabase", "Google Maps", "Msg91"],

    heroImgs: supper1,
    heroTitle: "Supper Club – Fine Dining Restaurant",
    tagline:
      "A premium restaurant website featuring menu, online reservations and interactive sections.",
    description:
      "Supper Club is a modern, elegant restaurant platform showcasing dishes, ambience, reservation functionality, and branch information.",

    screenImg: supper5,
    showcaseImages: [supper5, supper9, supper4],
    floatingImages: [fi1, fi2, fi3],

    appShowcaseImages: [],

    aboutLeft:
      "Designed with a luxurious theme to match the fine‑dining brand.",
    aboutRight:
      "Integrated reservation system, menu display, and location mapping.",

    client: "Reshim Alam",
    role: "Full‑stack Development",
    categoryLine: "Restaurant Website",
    overviewDescription:
      "SupperClub is a community-driven dining platform where anyone can be a Host, and anyone can be a Guest.",

    mobileHeading: "Mobile Experience",
    mobileImages: [supper2, supper3],
    mobileFeatures: [
      {
        title: "Host-to-Guest Flexibility",
        subTitle:
          "Any user can become a Host and create a dining event, or participate as a Guest.",
      },
      {
        title: "Custom Dining Events",
        subTitle:
          "Hosts decide the menu, per-table price, date, day, guest limit, and timing.",
      },
      {
        title: "Guest Booking System",
        subTitle:
          "Guests can browse nearby supper events and book seats instantly.",
      },
      {
        title: "Community Dining Experience",
        subTitle:
          "Designed to connect people through home-cooked meals and shared tables",
      },
      {
        title: "Community-Driven Food Experience",
        subTitle:
          "SupperClub enables a unique shared dining concept where anyone can host meals at their home or venue, and anyone can join as a guest.",
      },
       {
    title: "A Social Food Network",
    subTitle: "The platform’s goal is to build connections through food—helping strangers meet, share meals, and enjoy meaningful dining experiences."
  }
    ],

    featuresTitle: "Key Features",
    featuresSubtitle: "Powerful modules delivered",
    featuresList: [
      { title: "Well Security Implement ", image: supper9 },
      { title: "Live Capturing", image: supper8 },
      { title: "Detect Adhaar Card Number from Images", image: supper7 },
     
    ],
    featuresImage: supper2,

    prevSlug: "worzo",
    prevTitle: "Worzo EV Bike",
    nextSlug: "ams",
    nextTitle: "AMS-Attendance Management System",

    navigationImage: {
      title: "Supper Club Project",
      image: supper1,
    },
  },
];
