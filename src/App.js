import React, { useState } from 'react';
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
import { FiMenu, FiX } from 'react-icons/fi';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    'Profile',
    'Education',
    'Experience',
    'Courses',
    'Admin Roles',
    'Memberships',
    'Achievements',
    'Publications',
    'Projects'
  ];

  return (
    <div className="font-sans relative overflow-x-hidden scroll-smooth">
      {/* Desktop Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md hidden md:block">
        <nav className="flex justify-center gap-6 py-3 text-sm font-medium">
          {sections.map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-blue-600 transition"
            >
              {section}
            </a>
          ))}
        </nav>
      </header>

      {/* Mobile Navbar Toggle */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md md:hidden flex justify-between items-center px-4 py-3">
        <button onClick={() => setMenuOpen(true)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">
              <FiX />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 p-4 text-sm font-medium">
            {sections.map(section => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600 transition"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Sections with scroll-mt to prevent hiding */}
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
