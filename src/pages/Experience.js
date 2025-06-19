import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get("/experience")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.from) - new Date(a.from));
        setExperiences(sorted);
      })
      .catch(err => console.error("Failed to fetch experience", err));
  }, []);

  // Role-based color utility
  const getRoleColor = (designation) => {
    if (designation.toLowerCase().includes("professor")) return "border-green-600";
    if (designation.toLowerCase().includes("lecturer")) return "border-yellow-500";
    return "border-blue-500";
  };

  return (
    <section id="experience" className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Experience</h2>

      <div className="space-y-6 relative">
        {experiences.map((exp, i) => {
          const roleBorder = getRoleColor(exp.designation);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative border-l-4 ${roleBorder} pl-6 bg-white py-5 rounded-md shadow-sm hover:shadow-md transition`}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-3 top-5 w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
                <FaBriefcase className="text-sm" />
              </div>

              {/* Designation */}
              <h3 className="text-lg font-semibold text-gray-900">{exp.designation}</h3>

              {/* Institution */}
              <p className="text-gray-800 font-medium">{exp.institution}</p>

              {/* Department */}
              {exp.department && (
                <p className="text-sm text-gray-600">{exp.department}</p>
              )}

              {/* Address */}
              {exp.address && (
                <p className="text-sm text-gray-500">{exp.address}</p>
              )}

              {/* Duration */}
              <p className="text-sm text-gray-600 mt-1">
                {new Date(exp.from).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric"
                })}{" "}
                –{" "}
                {exp.to === "Present"
                  ? "Present"
                  : new Date(exp.to).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric"
                    })}
              </p>

              {/* Remarks */}
              {exp.remarks && (
                <p className="italic text-sm text-gray-600 mt-2">{exp.remarks}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
