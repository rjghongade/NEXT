"use client";

import { useEffect, useState } from "react";

const ContactUs = () => {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/contact-us?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => setContact(data.contact_us))
      .catch((error) => console.error("Error fetching contact details:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Contact Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          {contact ? (
            <>
              {contact.contact_phone && (
                <p className="text-lg font-semibold">
                  <span className="text-xl text-gray-800">Phone: </span>
                  <a href={`tel:${contact.contact_phone}`} className="text-blue-600 hover:text-blue-800">
                    {contact.contact_phone}
                  </a>
                </p>
              )}
              {contact.contact_email && (
                <p className="text-lg font-semibold">
                  <span className="text-xl text-gray-800">Email: </span>
                  <a href={`mailto:${contact.contact_email}`} className="text-blue-600 hover:text-blue-800">
                    {contact.contact_email}
                  </a>
                </p>
              )}
              {contact.contact_map && (
                <div className="mt-4">
                  <div dangerouslySetInnerHTML={{ __html: contact.contact_map }} />
                </div>
              )}
            </>
          ) : (
            <p className="text-center">Loading contact details...</p>
          )}
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Get In Touch</h3>
          <form>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold text-gray-700">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="font-semibold text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Enter your message"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
