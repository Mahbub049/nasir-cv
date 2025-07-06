import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { FaBookOpen } from "react-icons/fa";

export default function Courses() {
    const [groupedCourses, setGroupedCourses] = useState({});

    useEffect(() => {
        axios.get("/courses")
            .then(res => {
                const grouped = {};
                res.data.forEach(course => {
                    const program = course.program || "Others";
                    if (!grouped[program]) grouped[program] = [];
                    grouped[program].push(course);
                });
                setGroupedCourses(grouped);
            })
            .catch(err => console.error("Failed to fetch courses", err));
    }, []);

    return (
        <section id="courses" className="px-4 py-8 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Teaching</h2>

            {Object.entries(groupedCourses).map(([program, courses]) => (
                <div key={program} className="mb-10">
                    <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-4">{program}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2 mb-1">
                                    <FaBookOpen className="text-blue-600" />
                                    {course.courseName}
                                </h4>
                                {course.remarks && (
                                    <p className="text-sm text-gray-600 mt-1">{course.remarks}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
