import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Task Manager MVP</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

