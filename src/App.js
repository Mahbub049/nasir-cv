import React, { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Courses from "./pages/Courses";
import AdminRoles from "./pages/AdminRoles";
import Memberships from "./pages/Memberships";
import Achievements from "./pages/Achievements";
import Publications from "./pages/Publications";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import { FiX } from "react-icons/fi";
import Navbar from "./components/Navbar";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const sections = [
    "Profile",
    "Education",
    "Experience",
    "Teaching",
    "Admin Roles",
    "Memberships",
    "Achievements",
    {
      name: "Publications",
      sub: [
        { name: "Journals", tab: "journal" },
        { name: "Conferences", tab: "conference" },
        { name: "Books", tab: "book" },
      ],
    },
    "Projects",
  ];

  const getSectionId = (section) => {
    return section.toLowerCase().replace(/\s+/g, "-");
  };

  const scrollToWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === "profile") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const yOffset = -70;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const handleNavbarState = () => {
      const profileSection = document.getElementById("profile");
      if (!profileSection) return;

      const navbarHeight = 85;

      /*
        Important:
        We use max(profile height, screen height) because profile data loads async.
        Otherwise navbar becomes white before profile section fully renders.
      */
      const profileHeight = Math.max(
        profileSection.offsetHeight,
        window.innerHeight
      );

      const shouldStayTransparent =
        window.scrollY < profileHeight - navbarHeight;

      setIsProfileVisible(shouldStayTransparent);
    };

    handleNavbarState();

    const timers = [
      setTimeout(handleNavbarState, 100),
      setTimeout(handleNavbarState, 500),
      setTimeout(handleNavbarState, 1000),
    ];

    window.addEventListener("scroll", handleNavbarState);
    window.addEventListener("resize", handleNavbarState);
    window.addEventListener("load", handleNavbarState);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", handleNavbarState);
      window.removeEventListener("resize", handleNavbarState);
      window.removeEventListener("load", handleNavbarState);
    };
  }, []);

  return (
    <div className="font-sans relative overflow-x-hidden scroll-smooth bg-white">
      <Navbar
        sections={sections}
        scrollToWithOffset={scrollToWithOffset}
        setMenuOpen={setMenuOpen}
        isProfileVisible={isProfileVisible}
        getSectionId={getSectionId}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="text-lg font-bold text-gray-900">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl text-gray-700"
            >
              <FiX />
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-5 text-sm font-medium">
            {sections.map((section) =>
              typeof section === "string" ? (
                <button
                  key={section}
                  onClick={() => {
                    scrollToWithOffset(getSectionId(section));
                    setMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-700 transition"
                >
                  {section}
                </button>
              ) : (
                <div key={section.name} className="flex flex-col">
                  <span className="px-3 py-2 font-semibold text-gray-900">
                    {section.name}
                  </span>

                  {section.sub.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        scrollToWithOffset("publications");
                        window.dispatchEvent(
                          new CustomEvent("change-tab", { detail: item.tab })
                        );
                        setMenuOpen(false);
                      }}
                      className="ml-4 text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-700 transition"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Page Sections */}
      <main>
        <div id="profile" className="anchor-offset">
          <Profile />
        </div>
        <div id="education" className="anchor-offset">
          <Education />
        </div>
        <div id="experience" className="anchor-offset">
          <Experience />
        </div>
        <div id="teaching" className="anchor-offset">
          <Courses />
        </div>
        <div id="admin-roles" className="anchor-offset">
          <AdminRoles />
        </div>
        <div id="memberships" className="anchor-offset">
          <Memberships />
        </div>
        {/* <div id="skills" className="anchor-offset">
          <Skills />
        </div> */}
        {/* <div id="achievements" className="anchor-offset">
          <Achievements />
        </div> */}
        <div id="publications" className="anchor-offset">
          <Publications />
        </div>
        <div id="projects" className="anchor-offset">
          <Projects />
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 Dr. M. Nasir Uddin
      </footer>
    </div>
  );
}

export default App;