import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const ITEMS_PER_PAGE = 10;

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [activeTab, setActiveTab] = useState("journal");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/publications")
      .then(res => setPublications(res.data))
      .catch(err => console.error("Failed to fetch publications", err));
  }, []);

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Filtered publications by tab
  const filtered = publications.filter(
    pub => pub.category.toLowerCase() === activeTab
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="publications" className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Publications</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-6">
        {["journal", "conference", "book"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}s
          </button>
        ))}
      </div>

      {/* Content */}
      {currentItems.length === 0 ? (
        <p className="text-center text-gray-500 italic">No {activeTab}s found.</p>
      ) : (
        currentItems.map((pub, i) => (
          <div key={i} className="mb-6 border-b pb-4">
            <p className="font-semibold text-lg">{pub.title}</p>
            <p className="text-sm text-gray-700">By: {pub.authors}</p>
            <p className="text-sm text-gray-600">{pub.source} ({pub.year})</p>

            {pub.chapterTitle && (
              <p className="text-sm italic text-gray-500">Chapter: {pub.chapterTitle}</p>
            )}
            {pub.publisher && (
              <p className="text-sm text-gray-500">Publisher: {pub.publisher}</p>
            )}
            {pub.isbn && (
              <p className="text-sm text-gray-500">ISBN: {pub.isbn}</p>
            )}
            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                className="text-sm text-blue-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                DOI: {pub.doi}
              </a>
            )}
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
