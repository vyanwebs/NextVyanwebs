import React from "react";

export default function Term() {
  return (
    <div className="bg-white text-black px-6 md:px-16 lg:px-28 py-10 space-y-10">
      {/* Section 1 */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-3 border-b-2 border-yellow-400 inline-block pb-1">
          Acceptance of Terms :
        </h2>
        <p className="mt-4 leading-relaxed text-gray-800">
          By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. 
          If you do not agree with any of these terms, please do not use our website.
        </p>
      </div>

      {/* Section 2 */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-3 border-b-2 border-yellow-400 inline-block pb-1">
          Intellectual Property:
        </h2>
        <p className="mt-4 leading-relaxed text-gray-800">
          All content on our website, including but not limited to, text, graphics, logos, images, audio clips, video clips, data compilations, software, and other materials 
          (collectively, the "Content"), is owned by or licensed to us and is protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p className="mt-4 leading-relaxed text-gray-800">
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any Content on our website without our prior written consent.
        </p>

         <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold border-b-2 border-yellow-400 pb-2">
            Use of the Website :
          </h2>
          <p className="mt-6 text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed">
            You agree to use our website only for lawful purposes and in a manner
            that does not infringe the rights of, or restrict or inhibit the use
            and enjoyment of, our website by any third party.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold border-b-2 border-yellow-400 pb-2">
            You agree not to use our website:
          </h2>
          <ul className="mt-6 list-disc pl-6 text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed space-y-3">
            <li>
              In any way that breaches any applicable local, national, or
              international law or regulation
            </li>
            <li>
              To transmit any unsolicited or unauthorized advertising or
              promotional material or any other form of solicitation
            </li>
            <li>
              To knowingly transmit any data or send or upload any material that
              contains viruses, Trojan horses, worms, time-bombs, keystroke
              loggers, spyware, adware, or any other harmful programs or similar
              computer code designed to adversely affect the operation of any
              computer software or hardware.
            </li>
            <li>Links to Third-Party Websites</li>
            <li>
              Our website may contain links to third-party websites that are not
              owned or controlled by us. We assume no responsibility for the
              content, privacy policies, or practices of any third-party
              websites.
            </li>
          </ul>
        </div>

      </div>
      </div>
    
  );
}
