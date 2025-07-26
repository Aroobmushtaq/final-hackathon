import React from "react";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms of Service</h1>
        <p className="text-lg text-gray-600 mb-4">
          Last updated: December 28, 2024
        </p>
        <div className="text-left max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p>
            Welcome to Collaborative Notes. By accessing or using our platform, you agree to comply with these Terms of Service. Please read these terms carefully before using our service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
          <p>
            By using this platform, you agree to these Terms and all applicable laws and regulations. If you do not agree, do not use the platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">2. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information, including your login credentials. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">3. Restrictions</h2>
          <p>
            You agree not to use our platform for any unlawful purposes, including but not limited to harassment, fraud, or any activities that could harm the integrity of the platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">4. Termination of Account</h2>
          <p>
            We reserve the right to suspend or terminate your account if we believe you have violated these terms or engaged in harmful activities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">5. Limitation of Liability</h2>
          <p>
            Collaborative Notes will not be liable for any indirect, incidental, or consequential damages arising from the use of our service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">6. Changes to the Terms</h2>
          <p>
            We may modify these Terms of Service at any time. Please review this page periodically for updates.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@collaborativenotes.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
