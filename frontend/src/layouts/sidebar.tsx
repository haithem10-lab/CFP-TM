import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, Check, Loader, Users, Trash2 } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home size={16} /> },
    { to: '/tasks', label: 'Tasks', icon: <List size={16} /> },
    { to: '/completed', label: 'Completed', icon: <Check size={16} /> },
    { to: '/in-progress', label: 'In Progress', icon: <Loader size={16} /> },
    { to: '/team', label: 'Team', icon: <Users size={16} /> },
    { to: '/trash', label: 'Trash', icon: <Trash2 size={16} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="text-blue-600 font-bold text-lg mb-6">CFP TM</div>
      <nav className="space-y-2">
        {menuItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
              }`
            }
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;