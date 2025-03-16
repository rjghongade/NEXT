'use client';

import React, { useEffect, useState } from "react";

interface UnitLayout {
  id: number;
  layout_name: string;
  layout_image: string;
  unit_layout_heading: string;
  unit_layout_carpet_area: string;
  unit_layout_price: string;
}

const UnitLayouts = () => {
  const [layouts, setLayouts] = useState<UnitLayout[]>([]);
  const [heading, setHeading] = useState<string>("");
  const [selectedLayout, setSelectedLayout] = useState<UnitLayout | null>(null);

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/unit-layout?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => {
        setHeading(data.page[0]?.heading || "Unit Layouts");
        setLayouts(data.unit_layout || []);
      })
      .catch((error) => console.error("Error fetching unit layouts:", error));
  }, []);

  const closeModal = () => {
    setSelectedLayout(null);
  };

  const openModal = (layout: UnitLayout) => {
    setSelectedLayout(layout);
  };

  return (
    <section id="UnitLayouts" className="bg-gray-900 py-12 px-5 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">{heading}</h2>

        {layouts.length === 0 ? (
          <p className="text-center text-gray-500">No unit layouts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {layouts.map((layout) => (
              <div
                key={layout.id}
                className="bg-gray-800 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all"
              >
                <img
                  src={layout.layout_image}
                  alt={layout.layout_name}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{layout.layout_name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{layout.unit_layout_heading}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-300">
                      <strong>Carpet Area:</strong> {layout.unit_layout_carpet_area}
                    </p>
                    <p className="text-gray-300">
                      <strong>Price:</strong> ₹{layout.unit_layout_price}
                    </p>
                  </div>
                  <button
                    onClick={() => openModal(layout)}
                    className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg w-full hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedLayout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-8 rounded-xl w-11/12 sm:w-3/4 md:w-1/2">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-2xl font-semibold"
              >
                &times;
              </button>

              <h3 className="text-3xl font-semibold text-white mb-4">{selectedLayout.layout_name}</h3>
              <img
                src={selectedLayout.layout_image}
                alt={selectedLayout.layout_name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <p className="text-lg text-gray-300 mb-2">{selectedLayout.unit_layout_heading}</p>
              <p className="text-gray-300 mb-2">
                <strong>Carpet Area:</strong> {selectedLayout.unit_layout_carpet_area}
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Price:</strong> ₹{selectedLayout.unit_layout_price}
              </p>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">More Details:</h4>
                <p className="text-gray-300">
                  {/* Additional details can go here */}
                  More information about the unit layout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UnitLayouts;
