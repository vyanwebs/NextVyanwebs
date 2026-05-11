import amsImg from "../assets/Our Website Images/ams/ams9.webp"
import ams from "../assets/Our Website Images/ams/ams2.png"

import HMS_BG from "../assets/Our Website Images/hms/hmgbg.webp";
import hms1 from "../assets/Our Website Images/hms/hms1.png";

import JAAT_BG from "../assets/Our Website Images/jaat enterprises/jaatbg.webp";
import JAATimg from "../assets/Our Website Images/jaat enterprises/jaat1.png";

import RajmaniBG from "../assets/Our Website Images/rajmani/rajmani6.webp";
import Rajmainimg from "../assets/Our Website Images/rajmani/rajmani4.png";

import REDSABG from "../assets/Our Website Images/redsa/redsa7.png";
import redsaimg from "../assets/Our Website Images/redsa/redsa5.png";

import supperimg from "../assets/Our Website Images/supper/supper5.png";
import supperclubbg from "../assets/Our Website Images/supper/supper4.avif";

import svvpimg from "../assets/Our Website Images/svvp/svvp1.png"

import vedbg from "../assets/Our Website Images/ved/ved1.png";
import vedimg from "../assets/Our Website Images/ved/ved2.png";

import worzobg from "../assets/Our Website Images/worzo/worzo2.png";
import worzoimg from "../assets/Our Website Images/worzo/worzo1.png"

import dncrafBg from "../assets/Our Website Images/dncraft/dncraftbg.png";
import dncrafImg from "../assets/Our Website Images/dncraft/dncraftbg.png";

import mayaBg from "../assets/Our Website Images/mayaconstruction/maya.png";
import mayaImg from "../assets/Our Website Images/mayaconstruction/mayabg.png";

import vinstaBg from "../assets/Our Website Images/vinsta/vinsta3.jpg";
import vinstaImg from "../assets/Our Website Images/vinsta/vinsta2.png";

import vyanstoreBg from "../assets/Our Website Images/vyanstore/vyanstorebg.png";
import vyanstoreImg from "../assets/Our Website Images/vyanstore/vyanstorebg.png";

export const workSeeder = [
  {
    title: "AMS-Attendance Management System",
    subTitle: "Web + Mobile App Development",
    tags: ["React Native", "FastAPI", "PostgreSQL", "Python", "React.js", "Redux", "SQLAlchemy"],
    mainImg: amsImg,
    screenImg: ams,
    showScreen: false,
    orientation: "landscape",
    slug: "ams",
    backend: "Python FastAPI"
  },
  {
    title: "HMS-Hotel Management System",
    subTitle: "Web Application",
    tags: ["React.js", "Express", "AWS", "Redux", "MongoDB"],
    mainImg: HMS_BG,
    screenImg: hms1,
    showScreen: false,
    orientation: "landscape",
    slug: "hms",
    backend: "Node.js Express"
  },
  {
    title: "JAAT-Solar Energy",
    subTitle: "Website",
    tags: ["React.js", "Redux", "TypeScript", "Nodemailer", "Tailwind"],
    mainImg: JAAT_BG,
    screenImg: JAATimg,
    showScreen: false,
    orientation: "landscape",
    slug: "jaat",
    backend: "Node.js"
  },
  {
    title: "Rajmani Jewellers",
    subTitle: "Mobile App + Web Application + Website",
    tags: ["React.js", "MongoDB", "Express.js", "React-native", "Firebase", "Redux"],
    mainImg: RajmaniBG,
    screenImg: Rajmainimg,
    showScreen: true,
    orientation: "landscape",
    slug: "rajmani",
    backend: "Node.js Express"
  },
  {
    title: "Supper Club",
    subTitle: "Website",
    tags: ["Next.js", "Tailwind", "Redux", "Supabase", "Google map", "Message91"],
    mainImg: supperclubbg,
    screenImg: supperimg,
    showScreen: false,
    orientation: "landscape",
    slug: "supper-club",
    backend: "Supabase"
  },
  {
    title: "REDSA-Real Estate Property Portal",
    subTitle: "Website",
    tags: ["React.js", "MongoDB", "Tailwind", "Express", "Nodemailer", "Redux"],
    mainImg: REDSABG,
    screenImg: redsaimg,
    showScreen: false,
    orientation: "landscape",
    slug: "redsa",
    backend: "Node.js Express"
  },
  {
    title: "SVVP-Swami Vivekanand Vidhya Peeth",
    subTitle: "Website",
    tags: ["React.js", "MongoDB", "Tailwind", "Express", "Nodemailer", "Redux", "Express.js"],
    mainImg: amsImg,
    screenImg: svvpimg,
    showScreen: false,
    orientation: "landscape",
    slug: "svvp",
    backend: "Node.js Express"
  },
  {
    title: "Ved-Tour And Travels",
    subTitle: "Website",
    tags: ["React.js", "MongoDB", "Tailwind", "Express", "Nodemailer", "Redux"],
    mainImg: vedbg,
    screenImg: vedimg,
    showScreen: false,
    orientation: "landscape",
    slug: "ved",
    backend: "Node.js Express"
  },
  {
    title: "Worzo-EV Bike",
    subTitle: "Website",
    tags: ["React.js", "MongoDB", "Tailwind", "Express", "Nodemailer", "Redux"],
    mainImg: worzobg,
    screenImg: worzoimg,
    showScreen: false,
    orientation: "landscape",
    slug: "worzo",
    backend: "Node.js Express"
  },
  {
    title: "Dncraf - Digital Crafts",
    subTitle: "Web Application + E-commerce Platform",
    tags: ["React.js", "FastAPI", "Python", "PostgreSQL", "Redux", "Tailwind", "SQLAlchemy", "Pydantic"],
    mainImg: dncrafBg,
    screenImg: dncrafImg,
    showScreen: false,
    orientation: "landscape",
    slug: "dncraf",
    backend: "Python FastAPI"
  },
  {
    title: "Maya Construction",
    subTitle: "Construction Management Website",
    tags: ["React.js", "MongoDB", "Tailwind", "Express", "Node.js", "Redux"],
    mainImg: mayaBg,
    screenImg: mayaImg,
    showScreen: false,
    orientation: "landscape",
    slug: "maya-construction",
    backend: "Node.js Express"
  },
  {
    title: "Vinsta - Social Media Platform",
    subTitle: "Web + Mobile App Development",
    tags: ["React Native", "Node.js", "PostgreSQL", "Express.js", "Socket.io", "Redis"],
    mainImg: vinstaBg,
    screenImg: vinstaImg,
    showScreen: true,
    orientation: "landscape",
    slug: "vinsta",
    backend: "Node.js Express"
  },
  {
    title: "Vyanstore - Online Retail",
    subTitle: "E-commerce Website + Mobile App",
    tags: ["Next.js", "FastAPI", "Python", "PostgreSQL", "Tailwind", "Redux", "Stripe", "SQLAlchemy", "Redis"],
    mainImg: vyanstoreBg,
    screenImg: vyanstoreImg,
    showScreen: false,
    orientation: "landscape",
    slug: "vyanstore",
    backend: "Python FastAPI"
  }
];