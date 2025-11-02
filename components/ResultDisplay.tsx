
import React from 'react';

interface ResultDisplayProps {
  url: string;
  onCopy: () => void;
  copySuccess: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ url, onCopy, copySuccess }) => {
  return (
    <div className="mt-6">
      <label htmlFor="generatedUrl" className="block text-sm font-medium text-gray-700 mb-2">Link Gerado:</label>
      <div className="flex">
        <input
          type="text"
          id="generatedUrl"
          value={url}
          readOnly
          className="flex-1 p-3 border border-gray-300 rounded-l-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onCopy}
          className={`text-white px-4 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            copySuccess 
              ? 'bg-green-500 focus:ring-green-400' 
              : 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400'
          }`}
          aria-label="Copiar link"
        >
          {copySuccess ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
        </button>
      </div>
    </div>
  );
};
