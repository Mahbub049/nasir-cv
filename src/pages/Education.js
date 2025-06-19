import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { FaUniversity, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get("/education")
      .then(res => {
        // Sort by passing year descending
        const sorted = res.data.sort((a, b) => b.passingYear - a.passingYear);
        setEducation(sorted);
      })
      .catch(err => console.error("Failed to fetch education", err));
  }, []);

  // Utility: badge color based on degree type
  const getBadgeColor = (degree) => {
    const d = degree.toLowerCase();
    if (d.includes("phd")) return "bg-purple-100 text-purple-800";
    if (d.includes("m.phil") || d.includes("msc")) return "bg-blue-100 text-blue-800";
    if (d.includes("b.sc")) return "bg-green-100 text-green-800";
    if (d.includes("hsc") || d.includes("ssc")) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <section id="education" className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Education</h2>

      <div className="space-y-6">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="border border-gray-200 rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-2 md:mb-0">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  {edu.degreeType} in {edu.subject}
                </h3>
                <p className="text-gray-700 flex items-center gap-2 mt-1">
                  <FaUniversity className="text-gray-500" />
                  {edu.university}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full mb-1 ${getBadgeColor(
                    edu.degreeType
                  )}`}
                >
                  {edu.degreeType}
                </span>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  {edu.passingYear}
                </p>
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Result:</span> {edu.result}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
