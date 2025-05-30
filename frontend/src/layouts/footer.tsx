import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-center text-sm text-gray-500 py-3">
      &copy; {new Date().getFullYear()} CFP. Tous droits réservés.
    </footer>
  );
};

export default Footer;