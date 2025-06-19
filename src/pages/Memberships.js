import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    axios.get("/memberships")
      .then(res => {
        console.log("✅ Memberships fetched:", res.data); // Debug log
        setMemberships(res.data);
      })
      .catch(err => console.error("Failed to fetch memberships", err));
  }, []);

  return (
    <section className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Memberships</h2>

      <div className="space-y-4">
        {memberships.map((m, index) => (
          <div key={index} className="bg-white border rounded-md shadow-sm p-4">
            <p className="text-lg font-semibold text-gray-800">{m.name}</p>
            <p className="text-sm text-gray-600">Type: {m.type} | ID: {m.memberId}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
