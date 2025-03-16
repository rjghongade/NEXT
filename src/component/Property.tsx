'use client';  // Mark this file as a client-side component

import { useState, useEffect } from 'react';

interface Property {
  id: number;
  property_name: string;
  property_description: string;
  property_price: string;
  property_type: string;
  sub_location: string;
  builder_name: string;
  property_map: string;
  property_featured_photo: string;
}

const Property = () => {
  const [propertyData, setPropertyData] = useState<Property | null>(null);

  useEffect(() => {
    // Fetch the property data
    fetch('https://www.buyindiahomes.in/api/get-properties?website=peakhorizonbyglobalproperties.com')
      .then((response) => response.json())
      .then((data) => {
        setPropertyData(data.property_details[0]); // Access the first property from the list
      })
      .catch((error) => {
        console.error('Error fetching property data:', error);
      });
  }, []);

  if (!propertyData) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  return (
    <div className="property-container p-4">
      <h1 className="text-2xl font-bold">{propertyData.property_name}</h1>
      <h2 className="text-xl text-gray-600">{propertyData.sub_location}</h2>
      <p className="mt-2">{propertyData.property_description}</p>

      {/* Property Image */}
      <div className="mt-4">
        <img src={propertyData.property_featured_photo} alt={propertyData.property_name} className="w-full h-auto" />
      </div>

      {/* Property Details */}
      <div className="mt-4">
        <p><strong>Price: </strong>{propertyData.property_price} Cr</p>
        <p><strong>Type: </strong>{propertyData.property_type}</p>
        <p><strong>Builder: </strong>{propertyData.builder_name}</p>
      </div>

      {/* Google Map */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Property Location</h3>
        <div dangerouslySetInnerHTML={{ __html: propertyData.property_map }}></div>
      </div>
    </div>
  );
};

export default Property;
