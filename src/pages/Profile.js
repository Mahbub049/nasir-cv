import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {
  FaEnvelope,
  FaGoogle,
  FaResearchgate,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover blur-[4px] scale-105"
        >
          <source src="/background.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/65" />

        <p className="relative z-10 text-sm tracking-[0.22em] uppercase text-white/70">
          Loading Profile...
        </p>
      </section>
    );
  }

  if (!profile) {
    return (
      <p className="mt-6 text-center text-red-500">
        No profile data found.
      </p>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover blur-[2px] scale-105"
      >
        <source src="/background.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/70" />

      <div className="relative z-10 min-h-screen px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
            
            {/* Left Side - Photo + Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mx-auto w-full max-w-[360px] lg:mx-0"
            >
              <div className="relative">
                {/* Main image design */}
                <div className="relative overflow-hidden rounded-[34px] border border-white/20 bg-white/[0.045] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                  <div className="overflow-hidden rounded-[26px]">
                    <img
                      src={profile.image || "/default-profile.jpg"}
                      alt={profile.name || "Profile"}
                      className="h-[430px] w-full object-cover object-top"
                    />
                  </div>

                  {/* Bottom photo base */}
                  <div className="mt-3 flex items-center justify-between px-1">
                    <div className="h-[1px] w-20 bg-white/30"></div>
                    <div className="h-2 w-2 rounded-full bg-white/60"></div>
                    <div className="h-[1px] w-20 bg-white/30"></div>
                  </div>
                </div>
              </div>

              {/* Buttons below photo */}
              {(profile.googleScholar ||
                profile.researchGate ||
                profile.emails?.length > 0) && (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {profile.googleScholar && (
                    <a
                      href={profile.googleScholar}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/85"
                    >
                      <FaGoogle /> Google Scholar
                    </a>
                  )}

                  {profile.researchGate && (
                    <a
                      href={profile.researchGate}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/88 transition hover:bg-white hover:text-black"
                    >
                      <FaResearchgate /> ResearchGate
                    </a>
                  )}

                  {profile.emails?.[0] && (
                    <a
                      href={`mailto:${profile.emails[0]}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/88 transition hover:bg-white hover:text-black"
                    >
                      <FaEnvelope /> Email
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-center lg:text-left"
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px]">
                {profile.name}
              </h1>

              {profile.designation && (
                <p className="mt-4 text-xl font-semibold text-white/90">
                  {profile.designation}
                </p>
              )}

              {profile.department && (
                <p className="mt-2 text-base text-white/75">
                  {profile.department}
                </p>
              )}

              <div className="mt-5 flex flex-col items-center gap-2 text-sm text-white/70 lg:items-start">
                {profile.university && (
                  <div className="flex items-center gap-2">
                    <FaUniversity className="text-white/45" />
                    <span>{profile.university}</span>
                  </div>
                )}

                {/* {profile.address && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-white/45" />
                    <span>{profile.address}</span>
                  </div>
                )} */}
              </div>

              {/* Overview */}
              {profile.overview && (
                <div className="mt-4">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/82">
                    Overview
                  </h2>
                  <p className="max-w-2xl text-justify text-[15.5px] leading-8 text-white/82 sm:text-base">
                    {profile.overview}
                  </p>
                </div>
              )}

              {/* Research Interests */}
              {profile.interests?.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/82">
                    Research Interests
                  </h2>

                  <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
                    {profile.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-sm text-white/80 transition hover:bg-white hover:text-black"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}