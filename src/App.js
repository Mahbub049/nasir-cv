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
    <div className="font-sans relative overflow-x-hidden">
      {/* Desktop Nav */}
      <header className="sticky top-0 z-50 bg-white shadow-md hidden md:block">
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

      {/* Mobile Nav Toggle */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow flex justify-between items-center px-4 py-3">
        {/* <h1 className="text-lg font-bold">Dr. Mohammed Nasir Uddin</h1> */}
        <button onClick={() => setMenuOpen(true)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Overlay Sidebar Menu */}
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

      {/* Page Sections */}
      <main className="scroll-smooth">
        <div id="profile" className="scroll-mt-20"><Profile /></div>
        <div id="education" className="scroll-mt-20"><Education /></div>
        <div id="experience" className="scroll-mt-20"><Experience /></div>
        <div id="courses" className="scroll-mt-20"><Courses /></div>
        <div id="admin-roles" className="scroll-mt-20"><AdminRoles /></div>
        <div id="memberships" className="scroll-mt-20"><Memberships /></div>
        <div id="skills" className="scroll-mt-20"><Skills /></div>
        <div id="achievements" className="scroll-mt-20"><Achievements /></div>
        <div id="publications" className="scroll-mt-20"><Publications /></div>
        <div id="projects" className="scroll-mt-20"><Projects /></div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 Dr. M. Nasir Uddin
      </footer>
    </div>
  );
}

export default App;
