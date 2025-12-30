import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import GPU from './pages/GPU'
import Events from './pages/Events'
import Tasks from './pages/Tasks'
import Resources from './pages/Resources'
import TaskDetail from './pages/TaskDetail'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <header className="main-header">
            <div className="header-actions">
              <button className="header-btn">🔔</button>
              <button className="header-btn">⚙️</button>
              <div className="header-profile">👤</div>
            </div>
          </header>
          <main className="main-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/gpu" element={<GPU />} />
              <Route path="/events" element={<Events />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

