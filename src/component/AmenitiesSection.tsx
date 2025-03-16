'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Amenity {
  id: number;
  amenity_name: string;
  amenity_slug: string;
  property_amenities_photo: string;
  created_at: string;
  updated_at: string;
}

interface AmenitiesData {
  amenities: {
    page: { heading: string; subheading: string | null };
    amenities: Amenity[];
  };
}

const AmenitiesSection = () => {
  const [data, setData] = useState<AmenitiesData | null>(null);

  useEffect(() => {
    fetch('https://www.buyindiahomes.in/api/amenities?website=peakhorizonbyglobalproperties.com')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching amenities data:', err));
  }, []);

  if (!data) return <div className="text-center py-4 text-gray-400">Loading...</div>;

  return (
    <section id='AmenitiesSection' className="w-full py-16 bg-gray-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8">{data.amenities.page.heading}</h2>
        {data.amenities.page.subheading && (
          <p className="text-center text-gray-400 mb-12">{data.amenities.page.subheading}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.amenities.amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={amenity.property_amenities_photo}
                  alt={amenity.amenity_name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{amenity.amenity_name}</h3>
              <p className="text-gray-400 text-sm">Last Updated: {new Date(amenity.updated_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
