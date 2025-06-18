import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Publications() {
    const [publications, setPublications] = useState([]);
    const [activeTab, setActiveTab] = useState("journal");

    useEffect(() => {
        axios.get("/publications")
            .then(res => setPublications(res.data))
            .catch(err => console.error("Failed to fetch publications", err));
    }, []);

    const filtered = publications.filter(pub => pub.category === activeTab);

    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold mb-4">Publications</h2>

            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
                {["journal", "conference", "book"].map(tab => (
                    <button
                        key={tab}
                        className={`px-4 py-1 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}s
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {filtered.length === 0 ? (
                <p className="text-gray-500 italic">No {activeTab.toLowerCase()}s found.</p>
            ) : (
                filtered.map((pub, i) => (
                    <div key={i} className="mb-4 border-b pb-3">
                        <p className="font-semibold">{pub.title}</p>
                        <p className="text-sm text-gray-700">By: {pub.authors}</p>
                        {activeTab === "Journal" && <p className="text-sm">{pub.journalName} ({pub.year})</p>}
                        {activeTab === "Conference" && <p className="text-sm">{pub.conferenceName} ({pub.year}) - {pub.location}</p>}
                        {activeTab === "Book" && (
                            <>
                                <p className="text-sm">{pub.bookTitle} ({pub.year})</p>
                                {pub.chapterTitle && <p className="text-sm italic">Chapter: {pub.chapterTitle}</p>}
                            </>
                        )}
                        {pub.publisher && <p className="text-sm">Publisher: {pub.publisher}</p>}
                        {pub.doi && (
                            <a
                                href={`https://doi.org/${pub.doi}`}
                                className="text-blue-500 underline text-sm"
                                target="_blank"
                                rel="noreferrer"
                            >
                                DOI: {pub.doi}
                            </a>
                        )}
                    </div>
                ))
            )}
        </section>
    );
}
