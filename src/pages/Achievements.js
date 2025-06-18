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
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      {achievements.map((a, i) => (
        <div key={i}>
          <p className="font-semibold">{a.title}</p>
          <p className="text-sm">Type: {a.type}</p>
          {a.remarks && <p className="text-sm italic">{a.remarks}</p>}
        </div>
      ))}
    </section>
  );
}
