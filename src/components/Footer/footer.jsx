import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ourServiceSeed } from "@/seeder/ourServiceSeed";

const Footer = () => {
  return (
    <footer className="bg-[#13151d] text-white px-6 sm:px-10 lg:px-16 pt-16 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & Social */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/logo.png"
              alt="Vyanwebs"
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
            <span className="text-2xl sm:text-3xl font-bold">Vyanwebs</span>
          </div>
          <div className="flex gap-4 text-lg sm:text-xl font-bold mt-8">
            <a href="https://www.facebook.com/vyanwebs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Facebook />
            </a>
            <a href="https://www.instagram.com/vyanwebs" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <Instagram />
            </a>
            <a href="https://twitter.com/vyanwebs" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
              <Twitter />
            </a>
            <a href="https://www.linkedin.com/company/vyanwebs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin />
            </a>
            <a
              href="https://wa.me/919111721315"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-4 sm:mb-6 font-bold text-base tracking-wide">S E R V I C E S</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            {ourServiceSeed.map((data, index) => (
              <li key={index}>
                <Link href={`/services/${data.slug}`} className="hover:text-blue-500 transition-colors">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="mb-4 sm:mb-6 font-bold text-base tracking-wide">A B O U T &nbsp; U S</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li><Link href="/about" className="hover:text-blue-500 transition-colors">About</Link></li>
            <li><Link href="/work" className="hover:text-blue-500 transition-colors">Our Work</Link></li>
            <li><Link href="/careers" className="hover:text-blue-500 transition-colors">Career</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Office */}
        <div>
          <h4 className="mb-4 sm:mb-6 font-bold text-base tracking-wide">O F F I C E</h4>
          <div className="space-y-3 text-sm sm:text-base">
            <div>
              <h5 className="font-semibold">Indore Office</h5>
              <p>N - Friends Colony, Ring Road<br />Bengali Square, Above SBI Bank,<br />Indore, M.P. - 452001</p>
            </div>
            <div>
              <h5 className="font-semibold">Mumbai Office</h5>
              <p>2nd Floor, Corporate Park,<br />Goregaon East, Mumbai - 400063</p>
            </div>
            <div>
              <h5 className="font-semibold">📞 +91 9111721315</h5>
              <h5 className="font-semibold">✉️ info@vyanwebs.com</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500 mt-10 pt-4 text-xs sm:text-sm md:text-base flex flex-col md:flex-row justify-between items-center text-gray-300 text-center gap-4 md:gap-0">
        <p>© 2025 Vyanwebs Pvt Ltd. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">
          <Link href="/contact/terms" className="hover:text-blue-500 transition-colors">Terms and Conditions</Link>
          <span className="hidden sm:inline text-blue-500 font-extrabold">•</span>
          <Link href="/contact/privacys" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;