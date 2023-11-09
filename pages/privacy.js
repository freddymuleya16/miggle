import WelcomeLayout from "@/components/WelcomeLayout";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <WelcomeLayout>


      <div className="container mx-auto py-8">
        <div className="my-4">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-lg text-white">
            At Mingle, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, and disclose your personal
            data when you use our website and services.
          </p>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold text-white">
            Information We Collect
          </h2>
          <p className="text-lg text-white">
            We collect certain personal information from you when you create
            an account and use our services. This includes your name, email
            address, date of birth, gender, location, and preferences. We may
            also collect additional information such as photos and profile
            details that you choose to provide.
          </p>
          <p className="text-lg text-white">
            Please note that we do not collect any sensitive personal
            information, such as your racial or ethnic origin, religious
            beliefs, or sexual orientation.
          </p>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold text-white">
            How We Use Your Information
          </h2>
          <p className="text-lg text-white">
            We use the information we collect to provide and improve our
            services, personalize your experience, and communicate with you.
            Specifically, we may use your information to:
          </p>
          <ul className="list-disc list-inside text-lg text-white">
            <li>Facilitate account creation and logins</li>
            <li>Match you with potential matches based on your preferences</li>
            <li>Send you notifications and updates about our services</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Analyze usage patterns and improve our website and features</li>
            <li>Ensure the security and integrity of our services</li>
          </ul>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold text-white">
            Data Sharing and Disclosure
          </h2>
          <p className="text-lg text-white">
            We may share your personal information with third-party service
            providers who assist us in delivering our services and improving
            our website. These providers are bound by confidentiality
            agreements and are only permitted to use your information for the
            specified purposes.
          </p>
          <p className="text-lg text-white">
            We may also disclose your information in response to legal
            requirements, such as a court order or government request, or to
            protect our rights, property, or safety, as well as the rights,
            property, and safety of our users or others.
          </p>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold text-white">
            Data Security and Retention
          </h2>
          <p className="text-lg text-white">
            We take the security of your personal information seriously and
            implement appropriate measures to protect it from unauthorized
            access, disclosure, alteration, or destruction. We regularly
            review our security procedures and ensure our systems are up to
            date with industry best practices.
          </p>
          <p className="text-lg text-white">
            We retain your personal data for as long as necessary to fulfill
            the purposes outlined in this Privacy Policy, unless a longer
            retention period is required or permitted by law. Once the
            retention period expires, we will securely delete or anonymize
            your personal information.
          </p>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-bold text-white">
            Your Rights and Choices
          </h2>
          <p className="text-lg text-white">
            You have the right to access, update, and correct your personal
            information. You can do this by accessing your account settings or
            contacting our support team. You may also request the deletion of
            your account and personal data, subject to any legal obligations
            we may have.
          </p>
          <p className="text-lg text-white">
            We respect your choices regarding the collection and use of your
            personal information. You can choose not to provide certain
            information or opt out of certain data processing activities. Note
            that opting out may limit your ability to fully utilize our
            services.
          </p>
        </div>
      </div>
    </WelcomeLayout>
  );
};

export default PrivacyPolicy;
