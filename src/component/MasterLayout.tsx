'use client';

import React, { useEffect, useState } from "react";

interface MasterLayout {
  id: number;
  layout_name: string;
  layout_image: string;
  unit_layout_heading: string | null;
  unit_layout_carpet_area: string | null;
  unit_layout_price: string | null;
  unit_layout_description: string | null;
  created_at: string;
  updated_at: string;
}

const MasterLayout = () => {
  const [masterLayout, setMasterLayout] = useState<MasterLayout | null>(null);
  const [heading, setHeading] = useState<string>("");

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/master-layout?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => {
        setHeading(data.page[0]?.heading || "Master Layout");
        setMasterLayout(data.master_layout[0] || null);
      })
      .catch((error) => console.error("Error fetching master layout:", error));
  }, []);

  return (
    <section className="bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-10">{heading}</h2>

        {masterLayout ? (
          <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
            <img
              src={masterLayout.layout_image}
              alt={masterLayout.layout_name}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <div className="p-8">
              <h3 className="text-3xl font-semibold text-white">{masterLayout.layout_name}</h3>

              {masterLayout.unit_layout_heading && (
                <p className="text-gray-300 mt-4">
                  <strong className="text-gray-200">Heading:</strong> {masterLayout.unit_layout_heading}
                </p>
              )}

              {masterLayout.unit_layout_carpet_area && (
                <p className="text-gray-300 mt-4">
                  <strong className="text-gray-200">Carpet Area:</strong> {masterLayout.unit_layout_carpet_area}
                </p>
              )}

              {masterLayout.unit_layout_price && (
                <p className="text-gray-300 mt-4">
                  <strong className="text-gray-200">Price:</strong> {masterLayout.unit_layout_price}
                </p>
              )}

              {masterLayout.unit_layout_description && (
                <p className="text-gray-300 mt-4">
                  <strong className="text-gray-200">Description:</strong> {masterLayout.unit_layout_description}
                </p>
              )}

              <p className="text-gray-500 text-sm mt-6">
                <strong className="text-gray-300">Updated At:</strong> {new Date(masterLayout.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No master layout available.</p>
        )}
      </div>
    </section>
  );
};

export default MasterLayout;
