import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    axios.get("/achievements")
      .then(res => setAchievements(res.data))
      .catch(err => console.error("Failed to fetch achievements", err));
  }, []);

  return (
    <section id="achievements" className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Achievements</h2>

      <div className="space-y-4">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="text-lg font-semibold text-gray-800">{a.title}</p>
            <p className="text-sm text-gray-600">Type: {a.type}</p>
            {a.remarks && (
              <p className="text-sm italic text-gray-500 mt-1">{a.remarks}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
