import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const ErrorCard = ({ message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center animate-fade-in-down z-50">
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-red-200">
        <CloseOutlined />
      </button>
    </div>
  );
};

export default ErrorCard;
