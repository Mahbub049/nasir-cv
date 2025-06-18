import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { FaPhoneAlt, FaEnvelope, FaGoogle, FaResearchgate } from "react-icons/fa";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/profile")
            .then(res => {
                setProfile(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch profile", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-6 text-gray-500">Loading...</p>;
    if (!profile) return <p className="text-center text-red-500 mt-6">No profile data found.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Picture + Name */}
            <div className="flex flex-col items-center text-center">
                <img
                    src={profile.image || "/default-profile.jpg"}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md"
                    alt="Profile"
                />
                <h2 className="text-2xl md:text-3xl font-bold mt-4">{profile.name}</h2>
                <p className="text-gray-600">{profile.designation}</p>
                <p className="text-gray-700">{profile.university}</p>
                <p className="text-gray-500 text-sm mt-1">{profile.address}</p>
            </div>

            {/* Contact Info - Side-by-Side & Centered */}
            <div className="mt-8 flex flex-col md:flex-row justify-center items-start gap-10 text-sm md:text-base text-center md:text-left">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1 flex items-center justify-center md:justify-start gap-2">
                        <FaPhoneAlt /> Contact Numbers
                    </h3>
                    {profile.phones?.map((num, i) => (
                        <p key={i} className="text-gray-700">{num}</p>
                    ))}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1 flex items-center justify-center md:justify-start gap-2">
                        <FaEnvelope /> Emails
                    </h3>
                    {profile.emails?.map((email, i) => (
                        <p key={i} className="text-gray-700">{email}</p>
                    ))}
                </div>
            </div>



            {/* Research Links */}
            {(profile.googleScholar || profile.researchGate) && (
                <div className="mt-8 text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Research Profiles</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {profile.googleScholar && (
                            <a
                                href={profile.googleScholar}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaGoogle /> Google Scholar
                            </a>
                        )}
                        {profile.researchGate && (
                            <a
                                href={profile.researchGate}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaResearchgate /> ResearchGate
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Research Interests */}
            {profile.interests?.length > 0 && (
                <div className="mt-8 text-center">
                    <h3 className="font-semibold text-gray-800 mb-2">Research Interests</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {profile.interests.map((interest, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-100 border border-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm shadow-sm hover:bg-gray-200 transition"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
