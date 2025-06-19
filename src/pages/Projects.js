import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Failed to fetch projects", err));
  }, []);

  return (
    <section id="projects" className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Projects</h2>

      <div className="space-y-5">
        {projects.map((p, i) => (
          <div
            key={i}
            className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="text-lg font-semibold text-gray-800">{p.title}</p>
            <p className="text-sm text-gray-600 mt-1">Status: {p.status}</p>
            <p className="text-sm text-gray-600">Funding: {p.fundingSource}</p>
            {p.grantingBody && (
              <p className="text-sm text-gray-600">Granting Body: {p.grantingBody}</p>
            )}
            {p.notes && (
              <p className="text-sm italic text-gray-500 mt-1">{p.notes}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
