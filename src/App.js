import React, { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Courses from './pages/Courses';
import AdminRoles from './pages/AdminRoles';
import Memberships from './pages/Memberships';
import Achievements from './pages/Achievements';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import { FiX } from 'react-icons/fi';
import Navbar from './components/Navbar';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const sections = [
    'Profile',
    'Education',
    'Experience',
    'Courses',
    'Admin Roles',
    'Memberships',
    'Achievements',
    {
      name: 'Publications',
      sub: [
        { name: 'Journals', tab: 'journal' },
        { name: 'Conferences', tab: 'conference' },
        { name: 'Books', tab: 'book' }
      ]
    },
    'Projects'
  ];

  const scrollToWithOffset = (id) => {
    const yOffset = -80;
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const profileSection = document.getElementById("profile");
      const rect = profileSection?.getBoundingClientRect();
      if (rect && rect.top <= 80 && rect.bottom > 80) {
        setIsProfileVisible(true);
      } else {
        setIsProfileVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans relative overflow-x-hidden scroll-smooth">
      <Navbar
        sections={sections}
        scrollToWithOffset={scrollToWithOffset}
        setMenuOpen={setMenuOpen}
        isProfileVisible={isProfileVisible}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">
              <FiX />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 p-4 text-sm font-medium">
            {sections.map(section =>
              typeof section === 'string' ? (
                <a
                  key={section}
                  href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 transition"
                >
                  {section}
                </a>
              ) : (
                <div key={section.name} className="flex flex-col">
                  <span className="font-semibold">{section.name}</span>
                  {section.sub.map(item => (
                    <a
                      key={item.name}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToWithOffset("publications");
                        window.dispatchEvent(
                          new CustomEvent("change-tab", { detail: item.tab })
                        );
                        setMenuOpen(false);
                      }}
                      className="pl-4 text-sm hover:text-blue-600 transition"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Page Sections */}
      <main>
        <div id="profile" className="anchor-offset"><Profile /></div>
        <div id="education" className="anchor-offset"><Education /></div>
        <div id="experience" className="anchor-offset"><Experience /></div>
        <div id="courses" className="anchor-offset"><Courses /></div>
        <div id="admin-roles" className="anchor-offset"><AdminRoles /></div>
        <div id="memberships" className="anchor-offset"><Memberships /></div>
        <div id="skills" className="anchor-offset"><Skills /></div>
        <div id="achievements" className="anchor-offset"><Achievements /></div>
        <div id="publications" className="anchor-offset"><Publications /></div>
        <div id="projects" className="anchor-offset"><Projects /></div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 Dr. M. Nasir Uddin
      </footer>
    </div>
  );
}

export default App;
