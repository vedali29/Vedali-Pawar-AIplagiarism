import React, { useState } from 'react';

export const Accordion = ({ children, type = 'single', collapsible = false, className }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
};

export const AccordionItem = ({ value, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        return child;
      })}
    </div>
  );
};

export const AccordionTrigger = ({ children, isOpen, setIsOpen }) => {
  return (
    <button
      className="flex justify-between w-full px-4 py-2 text-left"
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
    >
      {children}
      <span 
        className="transform transition-transform duration-200" 
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        ▼
      </span>
    </button>
  );
};

export const AccordionContent = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="px-4 py-2 bg-gray-50 text-black">
      {children}
    </div>
  );
};
