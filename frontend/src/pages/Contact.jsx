import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <section className="min-h-screen bg-white px-6 sm:px-12 lg:px-24 py-20 flex flex-col items-center">
      <div className="text-center max-w-xl w-full text-3xl mb-6">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="flex flex-col md:flex-row gap-16 max-w-5xl w-full">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.contact_img}
            alt="Work desk setup with laptop and coffee"
            className="rounded-lg shadow-md w-full object-cover max-h-96"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 text-gray-800 flex flex-col justify-center space-y-10">
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-4 max-w-max">
              Our Store
            </h3>
            <address className="not-italic space-y-2 text-base">
              <p>Mirpur 10</p>
              <p>Benaroshi polli, Dhaka, Banglasesh</p>
              <p>
                Tel:{" "}
                <a href=" " className="text-blue-600 hover:underline">
                  +8801970549838
                </a>
              </p>
               <p>
                Email:{" "}
                <a
                  href="mailto:insafbd@gamil.com"
                  className="text-blue-600 hover:underline"
                >
                  insafbd@gamil.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-4 max-w-max">
              Careers at Forever
            </h3>
            <p className="mb-6 text-base leading-relaxed">
              Learn more about our teams and job openings. Join us to grow your career.
            </p>
            <button
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-800 font-medium hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Explore job openings"
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
