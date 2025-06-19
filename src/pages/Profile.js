import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGoogle,
  FaResearchgate,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-6 text-gray-500">Loading...</p>;
  if (!profile)
    return <p className="text-center text-red-500 mt-6">No profile data found.</p>;

  return (
    <section className="w-full px-4 py-10 bg-white text-gray-900">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center text-center">
        {/* Profile Image + Name */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={profile.image || "/default-profile.jpg"}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100 shadow-md"
          alt="Profile"
        />
        <h1 className="text-2xl md:text-3xl font-bold mt-4">{profile.name}</h1>
        <p className="text-gray-600 font-medium">{profile.designation}</p>
        {profile.department && (
          <p className="text-sm text-gray-500 italic">{profile.department}</p>
        )}
        <p className="text-gray-700">{profile.university}</p>
        <p className="text-gray-500 text-sm mt-1">{profile.address}</p>

        {/* Research Profiles (Now at Top) */}
        {(profile.googleScholar || profile.researchGate) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm">
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
          </motion.div>
        )}

        {/* Contact + Emails */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <FaPhoneAlt /> Contact Numbers
            </h3>
            {profile.phones?.map((num, i) => (
              <p key={i} className="text-gray-700">{num}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <FaEnvelope /> Emails
            </h3>
            {profile.emails?.map((email, i) => (
              <p key={i} className="text-gray-700">{email}</p>
            ))}
          </motion.div>
        </div>

        {/* Overview */}
        {profile.overview && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-justify max-w-3xl px-4 md:px-0"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">Overview</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {profile.overview}
            </p>
          </motion.div>
        )}

        {/* Research Interests */}
        {profile.interests?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
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
          </motion.div>
        )}
      </div>
    </section>
  );
}