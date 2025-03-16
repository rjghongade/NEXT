'use client';

import React, { useEffect, useState } from "react";

interface Property {
  id: number;
  property_name: string;
  property_description: string;
  property_price: string;
  property_type: string;
  property_featured_photo: string;
  sub_location: string;
  builder_name: string;
  property_type_price_range: string;
  property_price_range: string;
  og_image: string;
  seo_title: string;
  seo_meta_description: string;
}

const PropertyDetails = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<string>("info");

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/propert-details?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => setProperty(data.property_details))
      .catch((error) => console.error("Error fetching property details:", error));
  }, []);

  if (!property) {
    return <p className="text-center text-gray-500">Loading property details...</p>;
  }

  return (
    <section is="Property" className="bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-gray-800 text-white shadow-lg rounded-xl p-6">
        {/* Property Image */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={property.og_image || "default-image.jpg"}
            alt={property.property_name}
            className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
          />

          {/* Property Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-400">{property.property_name}</h1>
            <p className="text-gray-400 mt-2">{property.sub_location}</p>
            <p className="text-lg font-semibold text-indigo-500 mt-3">
              ₹{property.property_price} Cr
            </p>

            <div className="mt-4">
              <span className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm">
                {property.property_type}
              </span>
            </div>

            {/* Tabs Button */}
            <div className="mt-6 flex gap-4">
              <button
                className={`text-lg font-semibold ${activeTab === "info" ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-400`}
                onClick={() => setActiveTab("info")}
              >
                Property Info
              </button>
              <button
                className={`text-lg font-semibold ${activeTab === "description" ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-400`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              {/* <button
                className={`text-lg font-semibold ${activeTab === "seo" ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-400`}
                onClick={() => setActiveTab("seo")}
              >
                SEO Info
              </button> */}
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="mt-6">
          {activeTab === "info" && (
            <div>
              {/* Additional Details */}
              <div className="mt-4 space-y-2 text-gray-300">
                <p>
                  <strong>Builder:</strong> {property.builder_name}
                </p>
                <p>
                  <strong>Size Range:</strong> {property.property_price_range}
                </p>
                <p>
                  <strong>Type:</strong> {property.property_type_price_range}
                </p>
              </div>
            </div>
          )}

          {activeTab === "description" && (
            <div>
              <h2 className="text-xl font-semibold text-yellow-400">About the Property</h2>
              <div
                className="text-gray-300 mt-2"
                dangerouslySetInnerHTML={{ __html: property.property_description }}
              />
            </div>
          )}

          {activeTab === "seo" && (
            <div>
              <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400">SEO Information</h3>
                <p className="text-gray-300 text-sm">
                  <strong>Title:</strong> {property.seo_title}
                </p>
                <p className="text-gray-300 text-sm">
                  <strong>Description:</strong> {property.seo_meta_description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
