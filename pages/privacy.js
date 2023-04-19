import MainLayout from "@/components/MainLayout";
import React from "react";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <Container>
        <h1>Privacy Policy</h1>
        <p>
          At Mingle, we value the privacy of our users and are committed to
          protecting your personal information. This Privacy Policy describes
          how we collect, use, and disclose your information when you use our
          dating site.
        </p>
        <h3>What Information We Collect</h3>
        <ul>
          <li>
            Personal information you provide to us, such as your name, age,
            gender, and contact information
          </li>
          <li>
            Information we collect automatically when you use our site, such as
            your IP address, device information, and usage data
          </li>
          <li>
            Information we obtain from third-party sources, such as social media
            platforms
          </li>
        </ul>
        <h3>How We Use Your Information</h3>
        <ul>
          <li>To provide and improve our dating site services</li>
          <li>
            To personalize your experience and show you relevant content and
            matches
          </li>
          <li>To communicate with you and respond to your inquiries</li>
          <li>To enforce our terms and policies and prevent fraud and abuse</li>
          <li>To comply with legal obligations</li>
        </ul>
        <h3>How We Share Your Information</h3>
        <ul>
          <li>
            Service providers who help us operate and improve our dating site
          </li>
          <li>
            Third-party partners who provide advertising and analytics services
          </li>
          <li>
            Law enforcement or government agencies as required by law or to
            protect our legal rights
          </li>
          <li>
            Other users with whom you choose to communicate or interact on our
            site
          </li>
        </ul>
        <h3>How We Protect Your Information</h3>
        <p>
          We take appropriate measures to protect your information from
          unauthorized access, disclosure, alteration, or destruction. However,
          no method of transmission over the internet or electronic storage is
          100% secure.
        </p>
        <h3>Your Rights and Choices</h3>
        <ul>
          <li>
            The right to access, correct, or delete your personal information
          </li>
          <li>
            The right to object to or restrict our processing of your personal
            information
          </li>
          <li>
            The right to withdraw your consent to our processing of your
            personal information
          </li>
          <li>
            The choice to opt out of receiving marketing communications from us
          </li>
        </ul>
        <h3>Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. We encourage you
          to review this page periodically for any changes.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at privacy@mingle.com.
        </p>
      </Container>
    </MainLayout>
  );
};

export default PrivacyPolicy;
