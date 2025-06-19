import React from 'react';
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

function App() {
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
    <div className="font-sans">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="flex flex-wrap justify-center gap-4 py-3 text-sm font-medium bg-white">
          {sections.map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-blue-600 transition-colors px-2 py-1"
            >
              {section}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Sections with scroll-mt to prevent overlap */}
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

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 Prof. Nasir Uddin
      </footer>
    </div>
  );
}

export default App;
