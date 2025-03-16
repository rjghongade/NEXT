"use client";

import React, { useEffect, useState } from "react";

interface FAQ {
  id: number;
  faq_title: string;
  faq_content: string;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [heading, setHeading] = useState<string>("Frequently Asked Questions");

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/faq?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => {
        if (data.page?.length > 0) {
          setHeading(data.page[0].heading);
        }
        setFaqs(data.faqs || []);
      })
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{heading}</h2>
        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <details key={faq.id} className="bg-white p-4 rounded-lg shadow-md">
                <summary className="font-semibold text-lg cursor-pointer">{faq.faq_title}</summary>
                <div
                  className="mt-2 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: faq.faq_content }}
                />
              </details>
            ))
          ) : (
            <p className="text-gray-500 text-center">No FAQs available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
