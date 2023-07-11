import WelcomeLayout from "@/components/WelcomeLayout";
import React from "react";

const AboutUs = () => {
  return (
    <WelcomeLayout>
      

        <div className="container mx-auto py-8">
          <div className="my-4">
            <h1 className="text-3xl font-bold text-white">About Us</h1>
            <p className="text-lg text-white">
              Welcome to Mingle, the ultimate online dating platform. We are
              dedicated to helping individuals find love, meaningful
              connections, and lifelong companionship. With Mingle, you can
              explore a world of possibilities and meet like-minded individuals
              who share your interests and values.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-lg text-white">
              At Mingle, our mission is to create a safe, inclusive, and
              enjoyable space where individuals can connect with others,
              fostering meaningful relationships. We strive to provide a
              user-friendly platform that enables our users to explore and
              discover potential matches while prioritizing their privacy and
              security.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-lg text-white">
              Our vision is to become the leading online dating platform,
              recognized for our exceptional user experience, advanced matching
              algorithms, and commitment to user satisfaction. We aim to create
              an environment where individuals can find genuine connections and
              build meaningful relationships that can stand the test of time.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">Why Choose Us</h2>
            <ul className="list-disc list-inside text-lg text-white">
              <li>Extensive user base with diverse profiles</li>
              <li>Advanced matching algorithms for accurate compatibility</li>
              <li>User-friendly interface for easy navigation</li>
              <li>Secure and private platform to protect your information</li>
              <li>24/7 customer support for assistance and guidance</li>
            </ul>
          </div>
        </div>
        
    </WelcomeLayout>
  );
};

export default AboutUs;
