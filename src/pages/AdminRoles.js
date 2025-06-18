import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get("/admin-roles")
      .then(res => setRoles(res.data))
      .catch(err => console.error("Failed to fetch admin roles", err));
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Administrative Roles</h2>
      {roles.map((r, i) => (
        <div key={i} className="mb-3">
          <p className="font-bold">{r.title} <span className="text-sm text-gray-600">({r.roleType})</span></p>
          <p>{r.departmentOrEvent}</p>
          <p>{r.from} – {r.to}</p>
          {r.notes && <p className="italic text-sm">{r.notes}</p>}
        </div>
      ))}
    </section>
  );
}
