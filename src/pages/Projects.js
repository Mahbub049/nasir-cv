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
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {projects.map((p, i) => (
        <div key={i} className="mb-3">
          <p className="font-semibold">{p.title}</p>
          <p>Status: {p.status}</p>
          <p>Funding: {p.fundingSource}</p>
          {p.grantingBody && <p>Granting Body: {p.grantingBody}</p>}
          {p.notes && <p className="italic text-sm">{p.notes}</p>}
        </div>
      ))}
    </section>
  );
}
