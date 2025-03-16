'use client';

import React, { useEffect, useState } from "react";

interface FAQ {
  id: number;
  faq_title: string;
  faq_content: string;
}

interface Blog {
  id: number;
  post_title: string;
  post_slug: string;
  post_content_short: string;
  post_content_full: string;
  post_photo: string;
  created_at: string;
}

const ContentSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqHeading, setFaqHeading] = useState<string>("Frequently Asked Questions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch("https://www.buyindiahomes.in/api/faq?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => {
        if (data.page?.length > 0) {
          setFaqHeading(data.page[0].heading);
        }
        setFaqs(data.faqs || []);
      })
      .catch((error) => console.error("Error fetching FAQs:", error));

    fetch("https://www.buyindiahomes.in/api/blogs?website=peakhorizonbyglobalproperties.com")
      .then((response) => response.json())
      .then((data) => setBlogs(data.blogs || []))
      .catch((error) => console.error("Error fetching Blogs:", error));
  }, []);

  // Open the modal with the selected blog details
  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-6 rounded-lg shadow-xl mb-16">
        <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-10">
          {faqHeading}
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <details
                key={faq.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:bg-gray-700"
              >
                <summary className="font-semibold text-xl cursor-pointer text-gray-100 hover:text-yellow-400">
                  {faq.faq_title}
                </summary>
                <div
                  className="mt-4 text-gray-300"
                  dangerouslySetInnerHTML={{ __html: faq.faq_content }}
                />
              </details>
            ))
          ) : (
            <p className="text-center text-gray-500">No FAQs available at the moment.</p>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="mt-16 mb-16">
        <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-10">
          Latest Blogs
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-5">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="relative mb-6 overflow-hidden rounded-md">
                  <img
                    src={blog.post_photo}
                    alt={blog.post_title}
                    className="w-full h-64 object-cover transition-transform duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-100">{blog.post_title}</h3>
                <p className="text-gray-400 mt-2">{blog.post_content_short}</p>
                <button
                  onClick={() => openModal(blog)}
                  className="inline-block mt-4 text-yellow-400 font-medium hover:text-yellow-300 transition-colors"
                >
                  Read More →
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs available at the moment.</p>
          )}
        </div>
      </section>

      {/* Modal (Popup) */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-4xl w-full p-8 transition-all duration-300 transform scale-100">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-yellow-400 mb-6">
              {selectedBlog.post_title}
            </h2>
            <div className="mb-6">
              <img
                src={selectedBlog.post_photo}
                alt={selectedBlog.post_title}
                className="w-full h-64 object-cover rounded-md mb-6"
              />
            </div>
            <div
              className="text-gray-300 mt-4 prose prose-lg prose-invert"
              dangerouslySetInnerHTML={{ __html: selectedBlog.post_content_full }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
