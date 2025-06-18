import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get("/education")
      .then(res => setEducation(res.data))
      .catch(err => console.error("Failed to fetch education", err));
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {education.map((edu, i) => (
        <div key={i} className="mb-3">
          <p className="font-semibold">{edu.degreeType} in {edu.subject} ({edu.yearOfPassing})</p>
          <p>{edu.university}</p>
          <p className="text-sm text-gray-600">Result: {edu.result}</p>
        </div>
      ))}
    </section>
  );
}
