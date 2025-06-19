import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Skills() {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    axios.get("/skills")
      .then(res => {
        const grouped = {};
        res.data.forEach(skill => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = [];
          }
          grouped[skill.category].push(skill);
        });
        setSkills(grouped);
      })
      .catch(err => console.error("Failed to fetch skills", err));
  }, []);

  return (
    <section id="skills" className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Skills</h2>

      <div className="space-y-8">
        {Object.entries(skills).map(([category, skillsList]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-blue-700 mb-3 border-b pb-1">{category}</h3>
            <div className="space-y-3">
              {skillsList.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="text-lg font-semibold text-gray-800">{skill.skillName}</p>
                  {skill.description && (
                    <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
