import { useEffect, useMemo, useState } from "react";
import {
  FiBookOpen,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiFileText,
  FiLayers,
  FiUser,
} from "react-icons/fi";
import axios from "../api/axiosInstance";

const ITEMS_PER_PAGE = 10;

const tabs = [
  { key: "journal", label: "Journals", icon: FiFileText },
  { key: "conference", label: "Conferences", icon: FiLayers },
  { key: "book", label: "Books", icon: FiBookOpen },
];

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [activeTab, setActiveTab] = useState("journal");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/publications")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.publications || [];
        setPublications(data);
      })
      .catch((err) => {
        console.error("Failed to fetch publications", err);
        setError("Publication information could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const tabMatch = hash.match(/tab=(\w+)/);

    if (tabMatch) {
      setActiveTab(tabMatch[1]);
    }

    const handleTabChange = (e) => {
      setActiveTab(e.detail);
      window.history.replaceState(null, "", `#publications?tab=${e.detail}`);
    };

    window.addEventListener("change-tab", handleTabChange);
    return () => window.removeEventListener("change-tab", handleTabChange);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const getAuthorsText = (authors) => {
    if (Array.isArray(authors)) return authors.join(", ");
    return authors || "Author information not available";
  };

  const getDoiLink = (doi) => {
    if (!doi) return "";
    if (doi.startsWith("http://") || doi.startsWith("https://")) return doi;
    return `https://doi.org/${doi}`;
  };

  const counts = useMemo(() => {
    return publications.reduce(
      (acc, pub) => {
        const category = pub.category?.toLowerCase();
        if (category) acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      { journal: 0, conference: 0, book: 0 }
    );
  }, [publications]);

  const filtered = publications.filter(
    (pub) => pub.category?.toLowerCase() === activeTab
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section
      id="publications"
      className="px-4 py-10 max-w-5xl mx-auto scroll-mt-28"
    >
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-blue-600 uppercase">
          Research Contributions
        </p>

        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
          Publications
        </h2>

        <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  window.history.replaceState(
                    null,
                    "",
                    `#publications?tab=${tab.key}`
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon className="text-sm" />
                {tab.label}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {counts[tab.key] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && currentItems.length === 0 && (
        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <FiBookOpen className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-700 font-semibold">
            No {activeTab} publications found.
          </p>
        </div>
      )}

      {/* Publications */}
      {!loading && !error && currentItems.length > 0 && (
        <div className="space-y-4">
          {currentItems.map((pub, index) => {
            const doiLink = getDoiLink(pub.doi);

            return (
              <article
                key={pub._id || index}
                className="group relative bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />

                <div className="flex gap-4">
                  {/* Serial Number */}
                  <div className="shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-sm font-bold">
                      {String(startIndex + index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold uppercase">
                        <FiBookOpen />
                        {pub.category || activeTab}
                      </span>

                      {pub.year && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
                          <FiCalendar />
                          {pub.year}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition">
                      {pub.title}
                    </h3>

                    <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                      <FiUser className="mt-0.5 shrink-0 text-blue-600" />
                      <p className="leading-relaxed">
                        <span className="font-semibold text-gray-700">
                          Authors:
                        </span>{" "}
                        {getAuthorsText(pub.authors)}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                      {pub.source && (
                        <p>
                          <span className="font-semibold text-gray-700">
                            Source:
                          </span>{" "}
                          {pub.source}
                        </p>
                      )}

                      {pub.chapterTitle && (
                        <p>
                          <span className="font-semibold text-gray-700">
                            Chapter:
                          </span>{" "}
                          <span className="italic">{pub.chapterTitle}</span>
                        </p>
                      )}

                      {pub.publisher && (
                        <p>
                          <span className="font-semibold text-gray-700">
                            Publisher:
                          </span>{" "}
                          {pub.publisher}
                        </p>
                      )}

                      {pub.isbn && (
                        <p>
                          <span className="font-semibold text-gray-700">
                            ISBN:
                          </span>{" "}
                          {pub.isbn}
                        </p>
                      )}
                    </div>

                    {pub.doi && (
                      <div className="mt-3">
                        <a
                          href={doiLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                        >
                          DOI
                          <FiExternalLink />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center mt-7 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <FiChevronLeft />
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
            <FiChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}