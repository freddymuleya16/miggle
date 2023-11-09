import React from "react";
import { withoutAuth } from "../utils/withAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import WelcomeLayout from "@/components/WelcomeLayout";

const WelcomeAnimation = () => {
  const router = useRouter();

  return (
    <WelcomeLayout>


      <section className="container mx-auto px-8 py-16">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl text-white font-bold mb-4">Find Your True Love</h1>
          <p className="text-white text-lg">
            Join Mingle Dating and start your journey today. Discover a world of connections and meet like-minded
            individuals to find your soulmate.
          </p>
          <Link href="/auth/signup" className="mt-8 hover:no-underline">
            <span className="bg-[#fff] text-rose-500 hover:bg-rose-500 hover:text-white py-2 px-6 rounded-full mt-8">
              Get Started
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src="/img/matches.jpg" width={500} height={500} alt="Feature 1" className="h-72 mb-4 object-cover rounded-lg" />
            <h3 className="text-white text-lg font-semibold">Advanced Matching</h3>
            <p className="text-white">
              Our advanced matching algorithm connects you with compatible partners who share your interests and values.
              Let us help you find the perfect match for a fulfilling relationship.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/img/privacy.jpg" width={500} height={500} alt="Feature 1" className="h-72 mb-4 object-cover rounded-lg" />
            <h3 className="text-white text-lg font-semibold">Secure and Private</h3>
            <p className="text-white">
              At Mingle Dating, your privacy is our top priority. We employ advanced security measures to ensure that
              your personal information remains secure. Enjoy a safe and private dating experience.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/img/24/7.jpg" width={500} height={500} alt="Feature 1" className="h-72 mb-4 object-cover rounded-lg" />
            <h3 className="text-white text-lg font-semibold">24/7 Support</h3>
            <p className="text-white">
              Our dedicated support team is available 24/7 to assist you. Whether you have questions, need guidance, or
              encounter any issues, our friendly support staff is here to provide timely and helpful assistance.
            </p>
          </div>
        </div>
      </section>

      <section class="about sm:py-20 px-3 ">
        <div class="container mx-auto flex flex-wrap ">
          <div class="w-full md:w-1/2">
            <Image
              src="/img/about.jpg"
              width={500}
              height={500}
              alt="About Us Image"
              class="h-72 sm:h-64 object-cover mx-auto mb-6 md:mb-0 md:ml-auto md:mr-0 sm:w-3/4 md:w-full rounded-lg"
            />
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center items-center sm:px-4 h-fit">
            <h2 class="text-3xl font-bold mb-4 text-white">About Mingle</h2>
            <p class="text-lg mb-2 text-white">
              Welcome to Mingle, the leading dating platform where you can meet like-minded individuals and find your
              soulmate. Our mission is to create a safe and enjoyable space for people to connect and discover meaningful
              relationships. Join us today and embark on a journey of love, companionship, and endless possibilities.
            </p>
            <Link href="/about" className="py-2 hover:no-underline">
              <span className="bg-[#fff] text-rose-500 hover:bg-rose-500 hover:text-white py-2 px-6 rounded-full">
                Learn more
              </span>
            </Link>
          </div>
        </div>
      </section>

    </WelcomeLayout>
  );
};

export default withoutAuth(WelcomeAnimation);
