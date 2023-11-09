import WelcomeLayout from "@/components/WelcomeLayout";
import React from "react";

const TermsAndConditions = () => {
  return (
    <WelcomeLayout>
     

        <div className="container mx-auto py-8">
          <div className="my-4">
            <h1 className="text-3xl font-bold text-white">
              Terms and Conditions
            </h1>
            <p className="text-lg text-white">
              These Terms and Conditions ({`"Agreement"`}) govern your use of the
              Mingle website and services. By accessing or using our website
              and services, you agree to be bound by this Agreement. If you do
              not agree with any part of this Agreement, you should not use our
              website and services.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">
              User Responsibilities
            </h2>
            <p className="text-lg text-white">
              By using our website and services, you agree to:
            </p>
            <ul className="list-disc list-inside text-lg text-white">
              <li>Comply with all applicable laws and regulations</li>
              <li>Provide accurate and up-to-date information</li>
              <li>Respect the privacy and rights of other users</li>
              <li>Use our website and services responsibly and ethically</li>
              <li>Refrain from engaging in any illegal or harmful activities</li>
              <li>Not impersonate or misrepresent your identity</li>
            </ul>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">
              Intellectual Property
            </h2>
            <p className="text-lg text-white">
              All content and materials on our website, including but not
              limited to text, graphics, logos, images, and software, are the
              intellectual property of Mingle and are protected by applicable
              copyright and other intellectual property laws.
            </p>
            <p className="text-lg text-white">
              You may not copy, modify, distribute, or reproduce any part of our
              website or its content without prior written permission from
              Mingle.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">
              Limitation of Liability
            </h2>
            <p className="text-lg text-white">
              Mingle and its affiliates, partners, and employees shall not be
              liable for any direct, indirect, incidental, consequential, or
              special damages arising out of or in connection with your use of
              our website and services, even if advised of the possibility of
              such damages.
            </p>
            <p className="text-lg text-white">
              We strive to provide accurate and reliable information on our
              website, but we do not guarantee the completeness, accuracy, or
              reliability of any content. You use our website and services at
              your own risk.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">
              Termination of Services
            </h2>
            <p className="text-lg text-white">
              Mingle reserves the right to suspend or terminate your access to
              our website and services at any time, without prior notice or
              liability, for any reason. Upon termination, your right to use our
              website and services will immediately cease.
            </p>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold text-white">Governing Law</h2>
            <p className="text-lg text-white">
              This Agreement shall be governed by and interpreted in accordance
              with the laws of [Your Jurisdiction]. Any legal action or
              proceeding arising out of or in connection with this Agreement
              shall be subject to the exclusive jurisdiction of the courts of
              [Your Jurisdiction].
            </p>
          </div>
        </div>
         
    </WelcomeLayout>
  );
};

export default TermsAndConditions;
