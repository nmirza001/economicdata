import React from 'react';

export const AuthorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-lg m-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">📈</div>
          <div>
            <h2 className="text-2xl font-light text-[#1E364D]">Nasir Mirza</h2>
            <p className="text-gray-600">Economics & Computer Science Student at CSBSJU</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-600">
          <p>
            Analyzing India's economic journey through data visualization and statistical analysis.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl">✉️</span>
            <a 
              href="mailto:nmirza001@csbsju.edu"
              className="text-blue-600 hover:text-blue-800"
            >
              nmirza001@csbsju.edu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};