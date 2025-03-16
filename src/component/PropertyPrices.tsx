'use client';

import { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';

interface PropertyPrice {
  id: number;
  property_type: string;
  property_tower: string;
  property_carpet: string;
  property_price: string;
  price_unit: string;
  carpet_unit: string;
  price_tag: string;
  property_carpet_sqm: number;
  property_carpet_sqft: number;
  carpet_unit_sqm: string;
  carpet_unit_sqft: string;
}

interface PriceData {
  page: { heading: string; subheading: string | null }[];
  property_prices: PropertyPrice[];
}

const PropertyPrices = () => {
  const [data, setData] = useState<PriceData | null>(null);

  useEffect(() => {
    fetch('https://www.buyindiahomes.in/api/property-prices?website=peakhorizonbyglobalproperties.com')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching price data:', err));
  }, []);

  if (!data) return <div className="text-center py-4 text-gray-400">Loading...</div>;

  return (
    <section className="w-full py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8">{data.page[0].heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.property_prices.map((property) => (
            <div
              key={property.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-white">{property.property_type}</h3>
              <p className="text-gray-400 mt-2">Tower: {property.property_tower}</p>
              <p className="text-gray-400 mt-2">
                Carpet Area: {property.property_carpet_sqft} {property.carpet_unit_sqft} /{' '}
                {property.property_carpet_sqm.toFixed(2)} {property.carpet_unit_sqm}
              </p>
              <div className="flex items-center text-yellow-400 text-2xl font-bold mt-4">
                <FaRupeeSign /> <span>{property.property_price} {property.price_unit}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{property.price_tag} Price</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyPrices;
