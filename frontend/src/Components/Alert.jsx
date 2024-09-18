import React from 'react';

export const Alert = ({ children, className }) => {
  return (
    <div className={`p-4 rounded-md bg-blue-100 text-blue-900 ${className}`} role="alert">
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => {
  return <h5 className="font-bold mb-1">{children}</h5>;
};

export const AlertDescription = ({ children }) => {
  return <p>{children}</p>;
};