import { useEffect, useState } from "react";
import { FiAward, FiUserCheck } from "react-icons/fi";
// import { FiAward, FiCreditCard, FiUserCheck } from "react-icons/fi";
import instance from "../api/axiosInstance";

const logoMap = {
  "bangladesh red crescent society": "/logos/red-crescent.png",
  "bangladesh mathematical society": "/logos/mathematical-society.png",
  "institute of electrical and electronics engineers (ieee)": "/logos/ieee.png",
};

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getLogo = (name) => {
    const normalizedName = name?.toLowerCase().trim().replace(/\s+/g, " ");
    return logoMap[normalizedName] || "";
  };

  useEffect(() => {
    instance
      .get("/api/memberships")
      .then((res) => {
        console.log("✅ Memberships fetched:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.memberships || [];

        setMemberships(data);
      })
      .catch((err) => {
        console.error("Failed to fetch memberships", err);
        setError("Membership information could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 py-14 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase">
          Professional Affiliations
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          Memberships
        </h2>

        <div className="mt-4 w-20 h-1 bg-blue-600 mx-auto rounded-full" />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-500 py-8">
          Loading memberships...
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && memberships.length === 0 && (
        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 text-gray-500 rounded-xl p-6 text-center">
          No membership information available.
        </div>
      )}

      {/* Membership Cards */}
      {!loading && !error && memberships.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memberships.map((m, index) => {
            const logo = getLogo(m.name);

            return (
              <div
                key={m._id || index}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />

                <div className="flex items-start gap-5">
                  {/* Organization Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden group-hover:shadow-md transition-all duration-300">
                    {logo ? (
                      <img
                        src={logo}
                        alt={m.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <FiAward className="text-2xl text-blue-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                      {m.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Professional membership and academic affiliation
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                        <FiUserCheck />
                        {m.type || "N/A"}
                      </span>

                      {/* <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                        <FiCreditCard className="text-blue-600" />
                        ID: {m.memberId || "N/A"}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}