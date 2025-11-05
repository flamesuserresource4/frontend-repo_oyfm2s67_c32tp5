import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Studio from './components/Studio.jsx';
import AdminPanel from './components/AdminPanel.jsx';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white antialiased selection:bg-fuchsia-500/20 selection:text-fuchsia-200">
      <Navbar />
      <main className="relative">
        <Hero />

        {/* Studio: projects, blog, case studies, assistant (grouped) */}
        <section id="studio" className="relative z-10">
          <Studio />
        </section>

        {/* Separate Admin area so you can add content yourself */}
        <section id="admin" className="relative z-10 py-20">
          <AdminPanel />
        </section>
      </main>
    </div>
  );
}

export default App;
