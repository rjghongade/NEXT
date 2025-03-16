'use client';

import React, { useEffect, useState } from "react";

interface Bank {
  id: number;
  bank_name: string;
  bank_slug: string;
  property_bank_photo: string;
}

const BanksSection = () => {
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/banks?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => setBanks(data.bank.banks))
      .catch((error) => console.error("Error fetching banks:", error));
  }, []);

  return (
    <section id="BanksSection" className="bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-6">🏦 Trusted Home Loan Banks</h2>
        <p className="text-gray-400 mb-12">
          Find the best home loan offers from top banks and financial institutions.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {banks.map((bank) => (
            <a
              key={bank.id}
              href={bank.bank_slug}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-all duration-300 ease-in-out transform hover:shadow-2xl"
            >
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-gray-700 shadow-md">
                <img
                  src={bank.property_bank_photo}
                  alt={bank.bank_name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white font-semibold text-base">{bank.bank_name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BanksSection;
