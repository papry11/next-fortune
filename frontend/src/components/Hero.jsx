import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 px-5">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141] "></p>
            <p className="text-base lg:text-lg">hello...</p>
          </div>
          <h1 className="prata-regular text-2xl sm:py-3 lg:text-5xl leading-relaxed px-5">
            Welcome to Insaf BD
          </h1>
          <div className="flex items-center gap-2 px-5">
            <Link
              to="/collection"
              className='bg-black text-white text-sm lg:text-base px-6 py-2 lg:px-8 lg:py-3 rounded'
            >
              Shop Now
            </Link>
          </div>
          <p className="p-6  font-medium">আমাদের সব পণ্য নিরাপদে ক্যাশ অন ডেলিভারির মাধ্যমে ডেলিভারি  করা হয়। আপনি পণ্য গ্রহণের সময় সেটি যাচাই করে তারপর মূল্য পরিশোধ করতে পারবেন ! </p>
        </div>
      </div>
      {/* hero right side */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="hero pic" />
    </div>
  );
};

export default Hero;
