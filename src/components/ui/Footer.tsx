import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-10 mb-6 text-sm text-gray-500">
      <div className="flex justify-center space-x-4 mb-2">
        <a href="https://github.com/saisasir" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
          <i className="fab fa-github fa-lg"></i>
        </a>
        <a href="https://www.linkedin.com/in/saisasirkosuri/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
          <i className="fab fa-linkedin fa-lg"></i>
        </a>
        <a href="mailto:saisasir18@example.com" className="text-orange-500 hover:text-orange-600">
          <i className="fas fa-envelope fa-lg"></i>
        </a>
      </div>
      <p>
  Licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MIT License</a>. © 2025
</p>

    </footer>
  );
};

export default Footer;
