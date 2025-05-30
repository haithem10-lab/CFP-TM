import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-700">Tasks</h1>
      <div className="w-48 h-10 rounded-full bg-gray-100 flex items-center px-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none text-sm"
        />
      </div>
    </header>
  );
};

export default Header;