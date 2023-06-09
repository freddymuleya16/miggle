import React, { useState } from "react";
import { withoutAuth } from "../utils/withAuth";
import backgroundImage from '../public/img/login-bg.jpg';
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookF } from "react-icons/fa";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Footer } from "@/components/Footer";

const WelcomeAnimation = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-rose-400 to-rose-500   min-h-screen font-poppins">
      <nav className="flex justify-between items-center py-4 px-8">
        <Link href="/">
          <span className="text-white font-bold text-2xl">Miggle Dating</span>
        </Link>
        <div className="flex space-x-4">
          <Link href="/blog">
            <span className="text-white hover:text-rose-200">Privacy</span>
          </Link>
          <Link href="/blog">
            <span className="text-white hover:text-rose-200">About</span>
          </Link>
          <Link href="/blog">
            <span className="text-white hover:text-rose-200">Contact</span>
          </Link>
          <Link href="/auth/login">
            <span className="text-white hover:text-rose-200">Sign In</span>
          </Link>
        </div>
      </nav>

      <section className="container mx-auto px-8 py-16">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl text-white font-bold mb-4">Find Your True Love</h1>
          <p className="text-white text-lg">Join Miggle Dating and start your journey today.</p>
          <Link href="/register" className="mt-8">
            <span className="bg-white text-rose-500  hover:bg-rose-500 hover:text-white py-2 px-6 rounded-full mt-8">Get Started</span>
          </Link>
        </div>


        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src="/img/24/7.jpg" width={500} height={500} alt="Feature 1" className="h-32 mb-4 object-cover" />
            <h3 className="text-white text-lg font-semibold">Advanced Matching</h3>
            <p className="text-white">Our advanced matching algorithm connects you with compatible partners.</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/img/privacy.jpg" width={500} height={500} alt="Feature 1" className="h-32 mb-4 object-cover" />
            <h3 className="text-white text-lg font-semibold">Secure and Private</h3>
            <p className="text-white">We prioritize your privacy and ensure span secure dating experience.</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/img/matches.jpg" width={500} height={500} alt="Feature 1" className="h-32 mb-4 object-cover" />
            <h3 className="text-white text-lg font-semibold">24/7 Support</h3>
            <p className="text-white">Our dedicated support team is available 24/7 to assist you.</p>
          </div>
        </div>
      </section>

      <section class="about   py-20">
        <div class="container mx-auto flex flex-wrap">
          <div class="w-full md:w-1/2 ">
            <Image src="/img/about.jpg" width={300} height={300} alt="About Us Image" class="h-48 object-cover mx-auto mb-6 md:mb-0 md:ml-auto md:mr-0 w-3/4 md:w-full rounded-lg" />
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center px-4  h-fit">
            <h2 class="text-3xl font-bold mb-4 text-white">About Mingle</h2>
            <p class="text-lg mb-2 text-white">Discover a world of connections. Mingle is the leading dating platform where you can meet like-minded individuals and find your soulmate. Join us today and embark on a journey of love and companionship.</p>
            <Link href="/register" className="py-2" >
              <span className="bg-white text-rose-500  hover:bg-rose-500 hover:text-white py-2 px-6 rounded-full  ">Learn more</span>
            </Link>
          </div>
        </div>
      </section> 
      <Footer/>

{/* <footer className="py-4 px-8 text-center text-white">
  <section className="newsletter py-20">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">Subscribe to Our Newsletter</h2>
      <form className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="rounded-l-lg px-4 py-2 border-2 border-r-0 border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-r-lg px-4 py-2"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>

  <section className="contact text-white py-20">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <ul className="text-lg">
        <li>Address: 123 Mingle St, City, State, Country</li>
        <li>Phone: Your Phone Number</li>
        <li>Email: Your Email Address</li>
      </ul>
    </div>
  </section>

  <p className="mb-2">© 2023 Miggle Dating. All rights reserved.</p>
  <div className="flex justify-center space-x-4">
    <a href="#" className="text-white hover:text-rose-200">
      <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
    </a>
    <a href="#" className="text-white hover:text-rose-200">
      <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
    </a>
  </div>
</footer> */}

    </div>
  );
};

export default withoutAuth(WelcomeAnimation);
