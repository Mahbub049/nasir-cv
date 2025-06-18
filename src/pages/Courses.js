import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("/courses")
            .then(res => setCourses(res.data))
            .catch(err => console.error("Failed to fetch courses", err));
    }, []);

    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold mb-4">Courses Taught</h2>
            {courses.map((course, index) => (
                <div key={index} className="mb-2 p-3 border rounded bg-white">
                    <strong>{course.courseName}</strong> ({course.program})
                    {course.remarks && <p className="text-gray-600 text-sm mt-1">{course.remarks}</p>}
                </div>
            ))}

        </section>
    );
}
