import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-4">
          Last updated: December 28, 2024
        </p>
        <div className="text-left max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p>
            At Collaborative Notes, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
          <p>
            We collect the following types of information:
            <ul className="list-disc pl-6">
              <li>Your personal details (name, email, etc.) when you sign up or update your account.</li>
              <li>Your activity on the platform, such as note creation, comments, and interactions with other users.</li>
              <li>Log information (IP address, device information, etc.) to help improve the platform’s functionality.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
          <p>
            We use your information to:
            <ul className="list-disc pl-6">
              <li>Provide and improve our services.</li>
              <li>Send important notifications related to your account and the platform.</li>
              <li>Personalize your experience on Collaborative Notes.</li>
              <li>Respond to support requests and inquiries.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">3. Data Protection</h2>
          <p>
            We take the security of your personal data seriously. We use industry-standard encryption methods to protect your information from unauthorized access, use, or disclosure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">4. Third-Party Services</h2>
          <p>
            We do not share your personal information with third parties except where required by law or with trusted partners who help us provide services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. If you wish to exercise these rights, please contact us at support@collaborativenotes.com.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">6. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify users of any changes by posting the updated policy on this page.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at support@collaborativenotes.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
