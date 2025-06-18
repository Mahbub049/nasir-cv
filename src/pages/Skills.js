import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Skills() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        axios.get("/skills")
            .then(res => setSkills(res.data))
            .catch(err => console.error("Failed to fetch skills", err));
    }, []);

    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            {skills.map((skill, index) => (
                <div key={index} className="mb-2">
                    <p><strong>{skill.skillName}</strong> ({skill.category})</p>
                    {skill.description && <p className="text-gray-600 text-sm">{skill.description}</p>}
                </div>
            ))}

        </section>
    );
}
