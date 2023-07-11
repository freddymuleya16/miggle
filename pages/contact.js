import WelcomeLayout from "@/components/WelcomeLayout";
import React from "react";

const Contact = () => {
  return (
   <WelcomeLayout>
        <div className="container mx-auto py-8">
          <div className="my-4">
            <h1 className="text-3xl font-bold text-white">Contact Us</h1>
            <p className="text-lg text-white">
              We&apos;re here to assist you. If you have any questions, feedback, or
              inquiries, please don&apos;t hesitate to get in touch with our
              dedicated support team. We value your input and strive to provide
              prompt and helpful assistance.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <p className="text-lg text-white">
              You can reach us using the following contact details:
            </p>
            <ul className="list-disc list-inside text-lg text-white">
              <li>Email: info@mingle.com</li>
              <li>Phone: +1 123-456-7890</li>
              <li>Address: 123 Main Street, City, Country</li>
            </ul>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">Customer Support</h2>
            <p className="text-lg text-white">
              Our dedicated customer support team is available to assist you
              with any issues or concerns you may have. Please reach out to us
              and we&apos;ll get back to you as soon as possible.
            </p>
            <p className="text-lg text-white">
              For support inquiries, please email{" "}
              <a
                href="mailto:support@mingle.com"
                className="text-rose-300 hover:text-rose-400"
              >
                support@mingle.com
              </a>
              .
            </p>
          </div>
        </div>
        
     </WelcomeLayout>
  );
};

export default Contact;
