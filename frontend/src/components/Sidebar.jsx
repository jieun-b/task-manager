import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      path: '/'
    },
    {
      id: 'attendance',
      label: 'Team Presence',
      path: '/attendance'
    },
    {
      id: 'gpu',
      label: 'Compute Monitor',
      path: '/gpu'
    },
    {
      id: 'events',
      label: 'Calendar',
      path: '/events'
    },
    {
      id: 'tasks',
      label: 'Task Board',
      path: '/tasks'
    },
    {
      id: 'resources',
      label: 'Knowledge Base',
      path: '/resources'
    }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      {/* 브랜드 영역 */}
      <div className="sidebar-brand">
        <h1 className="brand-title">VCL Dashboard</h1>
      </div>

      {/* 검색 영역 */}
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      {/* 메인 메뉴 */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="menu-item-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* 유틸리티 메뉴 */}
      <div className="sidebar-utilities">
        <div className="menu-item">
          <span className="menu-item-label">Notifications</span>
          <span className="menu-badge">4</span>
        </div>
        <div className="menu-item">
          <span className="menu-item-label">Settings</span>
        </div>
      </div>

      {/* 사용자 프로필 */}
      <div className="user-profile">
        <div className="user-avatar"></div>
        <div className="user-info">
          <div className="user-name">홍길동</div>
          <div className="user-email">hong@lab.edu</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

