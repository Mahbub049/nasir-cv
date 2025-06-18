import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Memberships() {
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        axios.get("/memberships")
            .then(res => setMemberships(res.data))
            .catch(err => console.error("Failed to fetch memberships", err));
    }, []);

    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold mb-4">Memberships</h2>
            {memberships.map((m, index) => (
                <div key={index} className="mb-2">
                    <p><strong>{m.name}</strong></p>
                    <p>Type: {m.type} | ID: {m.memberId}</p>
                </div>
            ))}

        </section>
    );
}
