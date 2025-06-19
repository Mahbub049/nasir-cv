import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function AdminRoles() {
  const [groupedRoles, setGroupedRoles] = useState({});

  useEffect(() => {
    axios.get("/admin-roles")
      .then(res => {
        const grouped = {};
        res.data.forEach(role => {
          const type = role.roleType || "Other";
          if (!grouped[type]) grouped[type] = [];
          grouped[type].push(role);
        });
        setGroupedRoles(grouped);
      })
      .catch(err => console.error("Failed to fetch admin roles", err));
  }, []);

  return (
    <section id="admin-roles" className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Administrative Roles</h2>

      {Object.entries(groupedRoles).map(([type, roles]) => (
        <div key={type} className="mb-10">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-4">{type}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r, i) => (
              <div
                key={i}
                className="p-4 bg-white border-l-4 border-blue-500 rounded-md shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-md font-semibold text-gray-800">
                  {r.title}
                </h4>

                <p className="text-gray-700 mt-1">{r.departmentOrEvent}</p>

                {(r.from || r.to) && (
                  <p className="text-sm text-gray-600 mt-1">
                    {r.from}{r.to ? ` – ${r.to}` : ""}
                  </p>
                )}

                {r.notes && (
                  <p className="italic text-sm text-gray-600 mt-2">{r.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
