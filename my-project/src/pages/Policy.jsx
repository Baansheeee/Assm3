/* eslint-disable no-unused-vars */
import React from "react";
import Layout from "../components/Layout/Layout";
import { Shield } from "lucide-react";

const Policy = () => {
  return (
    <Layout title={'Shop Sphere - Privacy Policy'} description={'Provides the information about Our policies'}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 sm:p-12 lg:p-16">
            <div className="text-center">
              <Shield className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your privacy is important to us. This policy explains how we
                handle your personal data when you use ShopSphere.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Information We Collect
                </h2>
                <p>
                  We collect information to provide and improve our services.
                  This includes:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Order history</li>
                  <li>Communication preferences</li>
                  <li>Device and browsing details</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  How We Use Your Information
                </h2>
                <p>We use your information to:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Fulfill orders and process transactions</li>
                  <li>Communicate with you</li>
                  <li>Improve our services</li>
                  <li>Send marketing communications</li>
                  <li>Ensure security and detect fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Sharing Your Information
                </h2>
                <p>
                  We only share your data with trusted third parties, such as:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Service providers (e.g., shipping and payment processors)</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Your Choices
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Access and update your data</li>
                  <li>Opt out of marketing emails</li>
                  <li>Request data deletion</li>
                  <li>Object to data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Cookies
                </h2>
                <p>
                  We use cookies to enhance your experience. You can manage your
                  cookie preferences in your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy periodically. The latest
                  version will always be available on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have any questions, contact us at:
                </p>
                <address className="not-italic">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@shopsphere.com"
                    className="text-indigo-600 hover:underline"
                  >
                    privacy@shopsphere.com
                  </a>
                  <br />
                  <strong>Address:</strong> 123 E-commerce Street, Shopville,
                  SH 12345
                </address>
              </section>
            </div>

            <p className="text-sm text-gray-500 text-center mt-10">
              Last Updated: June 15, 2023
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
