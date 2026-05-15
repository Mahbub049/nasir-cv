import { useEffect, useMemo, useState } from "react";
import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiLayers,
  FiMessageCircle,
  FiSearch,
  FiStar,
  FiTool,
} from "react-icons/fi";
import instance from "../api/axiosInstance";

const getIconByCategory = (category = "") => {
  const key = category.toLowerCase();

  if (key.includes("programming") || key.includes("coding")) return FiCode;
  if (key.includes("language")) return FiMessageCircle;
  if (key.includes("research")) return FiSearch;
  if (key.includes("teaching")) return FiBookOpen;
  if (key.includes("technical") || key.includes("software")) return FiTool;
  if (key.includes("machine") || key.includes("ai")) return FiCpu;

  return FiLayers;
};

export default function Skills() {
  const [skills, setSkills] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    instance
      .get("/api/skills")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.skills || [];

        const grouped = {};

        data.forEach((skill) => {
          const category = skill.category || "Others";

          if (!grouped[category]) {
            grouped[category] = [];
          }

          grouped[category].push(skill);
        });

        setSkills(grouped);

        const firstCategory = Object.keys(grouped)[0];
        if (firstCategory) {
          setActiveCategory(firstCategory);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch skills", err);
        setError("Skills information could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = Object.keys(skills);

  const totalSkills = useMemo(() => {
    return Object.values(skills).reduce((total, list) => total + list.length, 0);
  }, [skills]);

  const activeSkills = skills[activeCategory] || [];
  const ActiveIcon = getIconByCategory(activeCategory);

  return (
    <section id="skills" className="px-4 py-10 max-w-5xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-7">
        <p className="text-xs font-semibold tracking-[0.22em] text-blue-600 uppercase">
          Professional Competencies
        </p>

        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
          Skills
        </h2>

        <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-5" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-11 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="h-28 bg-gray-200 rounded-2xl" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && categories.length === 0 && (
        <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <FiAward className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-700 font-semibold">
            No skills information available.
          </p>
        </div>
      )}

      {/* Skills Panel */}
      {!loading && !error && categories.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Top Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
            <div className="p-5 md:border-r border-gray-200">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Total Skills
              </p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {totalSkills}
              </p>
            </div>

            <div className="p-5 md:border-r border-gray-200">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Skill Categories
              </p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {categories.length}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Active Domain
              </p>
              <p className="mt-1 text-lg font-bold text-blue-700">
                {activeCategory}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Category Sidebar */}
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/70 p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Categories
              </p>

              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = getIconByCategory(category);
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <Icon />
                        </span>

                        <span>
                          <span className="block text-sm font-bold">
                            {category}
                          </span>
                          <span
                            className={`block text-xs ${
                              isActive ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {skills[category].length} skill
                            {skills[category].length > 1 ? "s" : ""}
                          </span>
                        </span>
                      </span>

                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {skills[category].length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Skill Details */}
            <div className="md:col-span-8 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ActiveIcon className="text-xl" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {activeCategory}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Key competencies under this domain
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  <FiStar />
                  {activeSkills.length} listed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSkills.map((skill, index) => (
                  <div
                    key={skill._id || index}
                    className="group border border-gray-200 rounded-2xl p-4 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-xl bg-gray-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                        <FiCheckCircle />
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-gray-900">
                          {skill.skillName}
                        </h4>

                        {skill.description && (
                          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {activeSkills.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                  <p className="text-gray-500 text-sm">
                    No skills available under this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}