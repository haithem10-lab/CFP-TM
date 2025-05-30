import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import Footer from './layouts/footer';
import TaskCard from './components/TaskCard';

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path="/tasks" element={<TaskCard />} />
              <Route path="/completed" element={<div className="text-center text-gray-500">Tâches complétées</div>} />
              <Route path="/in-progress" element={<div className="text-center text-gray-500">Tâches en cours</div>} />
              <Route path="/team" element={<div className="text-center text-gray-500">Équipe</div>} />
              <Route path="/trash" element={<div className="text-center text-gray-500">Corbeille</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;