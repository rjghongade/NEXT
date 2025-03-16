"use client";

import React, { useEffect, useState } from "react";

interface LocationData {
  heading: string;
  subheading: string | null;
  map: string;
}

const LocationMap = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/location-map?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
      })
      .catch((error) => console.error("Error fetching location map:", error));
  }, []);

  return (
    <section className="bg-gray-900 text-white py-12 px-5 dark:bg-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">
          {locationData?.heading || "Location Map"}
        </h2>
        {locationData?.subheading && (
          <p className="text-gray-400 mb-6">{locationData.subheading}</p>
        )}

        {locationData?.map ? (
          <div
            className="w-full max-w-full mx-auto overflow-hidden rounded-lg shadow-lg"
            dangerouslySetInnerHTML={{ __html: locationData.map }}
          />
        ) : (
          <p className="text-gray-500">Map data is not available.</p>
        )}
      </div>
    </section>
  );
};

export default LocationMap;
