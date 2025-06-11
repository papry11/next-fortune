import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-20">
      {/* Title Section */}
      <div className="text-center text-3xl mb-6">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.about_img}
            alt="Clothing, coffee, and phone on a bed"
            className="rounded-xl shadow-md w-full max-w-md object-cover"
          />
        </div>

        {/* Right Text Content */}
        <div className="md:w-1/2 text-gray-600 space-y-6 text-sm font-light leading-relaxed">
          <p>
            INSAF BD একটি উদীয়মান অনলাইন ফ্যাশন প্ল্যাটফর্ম, যেখানে আপনি পাবেন
            মানসম্মত ও ট্রেন্ডি পোশাক সাশ্রয়ী দামে। আমরা বিশ্বাস করি, ফ্যাশন
            কেবল পোশাক নয় — এটি একজন মানুষের আত্মবিশ্বাস ও ব্যক্তিত্বের প্রকাশ।
            আমাদের মিশন হলো সহজলভ্য ফ্যাশনের মাধ্যমে সবার জীবনে স্টাইল ও
            আত্মবিশ্বাস যোগ করা। আমরা ২০২৫ সাল থেকে যাত্রা শুরু করেছি এবং সেই
            থেকে সৎভাবে ও বিশ্বস্ততার সাথে গ্রাহকদের চাহিদা পূরণ করে যাচ্ছি।
            আপনার প্রতিটি অর্ডার আমাদের কাছে গুরুত্বপূর্ণ। আমরা প্রতিশ্রুতিবদ্ধ
            আপনাকে সেরা মানের পণ্য, দ্রুত ডেলিভারি এবং বন্ধুসুলভ কাস্টমার
            সার্ভিস দিতে।
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 border-b border-gray-400 pb-1 max-w-max">
              আমাদের লক্ষ্য
            </h3>
            <p>
              আমাদের লক্ষ্য হচ্ছে গ্রাহকদের একটি নির্ভরযোগ্য এবং আনন্দদায়ক
              অনলাইন শপিং অভিজ্ঞতা দেওয়া। আমরা চাই, আপনি যেন সহজে পণ্য খুঁজে
              পান, ঝামেলামুক্ত অর্ডার করতে পারেন এবং সময়মতো আপনার পছন্দের
              জিনিসটি হাতে পান।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
