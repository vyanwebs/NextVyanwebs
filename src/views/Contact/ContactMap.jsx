import React from "react";

const ContactMap = () => {
    return (
        <div className="mt-1 flex flex-col gap-6">

            {/* Indore Office — Full Width */}
            <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 px-1">
                     Indore Office
                </h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.199415644891!2d75.90393797429192!3d22.720828227523224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d0869a99aa1%3A0x781c5497a183d0ee!2sVyanwebs%20Private%20Limited!5e0!3m2!1sen!2sin!4v1754026729045!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="w-full h-[450px] rounded-lg"
                ></iframe>
            </div>

            {/* Mumbai Office — Mini Map */}
            <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2 px-1">
                     Mumbai Office
                </h3>
              
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1!2d72.8697!3d19.1640!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6f5b8a6a04d%3A0x1!2sCorporate%20Park%2C%20Goregaon%20East%2C%20Mumbai%2C%20Maharashtra%20400063!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="w-full h-[250px] rounded-lg"
                ></iframe>
            </div>

        </div>
    );
};

export default ContactMap;