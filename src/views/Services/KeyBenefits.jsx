import React from "react";

const KeyBenefits = () => {
  return (
    <div
      id="logo-white-benefit"
      className="w-full bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center "
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left Section */}
            <div className="md:w-7/12 flex justify-center items-center">
              <div className="w-full ">
                <div className="w-full mb-4 md:mb-6">
                  <h2
                    className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-snug"
                    data-aos="fade-up"
                  >
                    Key benefits of our
                    <br />
                    digital services <b>.</b>
                  </h2>
                </div>
                <div
                  className="w-full md:w-9/12 mb-4 md:mb-0"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h6 className="text-gray-700 dark:text-gray-300 md:pr-5 text-base md:text-lg">
                    Our expert professionals are ready to handle any Confront it
                    head-on, equipped with all of competencies in-house.
                  </h6>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-5/12 md:pl-8 mt-8 md:mt-0">
              <div
                className="mb-6 md:mb-8"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h5 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900 dark:text-white">
                  Flexible Engagement Model
                </h5>
                <h6 className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-0">
                  We promote transparency and scalability in every interaction
                  through our skilled developers and advanced technology.
                </h6>
              </div>

              <div
                className="mb-6 md:mb-8"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h5 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900 dark:text-white">
                  Progressive Roadmap
                </h5>
                <h6 className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-0">
                  Client project details are always number one on our agenda,
                  for we strive to deliver results as a goal-oriented
                  development company.
                </h6>
              </div>

              <div
                className="mb-6 md:mb-8"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h5 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900 dark:text-white">
                  Scalable Teams
                </h5>
                <h6 className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-0">
                  We scale skilled team members to meet evolving project needs. 
                </h6>
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <h5 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-gray-900 dark:text-white">
                  Robust architecture
                </h5>
                <h6 className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-0">
                   We adapt and add skilled resources to develop tailored software. Development that generates profits.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyBenefits;
