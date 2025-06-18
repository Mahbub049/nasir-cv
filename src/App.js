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
  return (
    <div>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="flex flex-wrap justify-center gap-4 py-3 text-sm font-medium">
          <a href="#profile">Profile</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#courses">Courses</a>
          <a href="#admin-roles">Admin Roles</a>
          <a href="#memberships">Memberships</a>
          <a href="#achievements">Achievements</a>
          <a href="#publications">Publications</a>
          <a href="#projects">Projects</a>
        </nav>
      </header>

      <main>
        <Profile />
        <Education />
        <Experience />
        <Courses />
        <AdminRoles />
        <Memberships />
        <Skills />
        <Achievements />
        <Publications />
        <Projects />
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 Prof. Nasir Uddin
      </footer>
    </div>
  );
}

export default App;
