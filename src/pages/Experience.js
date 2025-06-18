import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get("/experience")
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Failed to fetch experience", err));
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {experiences.map((exp, i) => (
        <div key={i} className="mb-3 border-l-4 pl-4 border-blue-500">
          <p className="font-bold">{exp.title}</p>
          <p>{exp.institution}, {exp.department}</p>
          <p>{exp.address}</p>
          <p>{new Date(exp.from).toDateString()} – {exp.to}</p>
          {exp.remarks && <p className="italic text-sm">{exp.remarks}</p>}
        </div>
      ))}
    </section>
  );
}
