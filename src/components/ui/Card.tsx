import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
};

const CardContent: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const CardFooter: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className = '' }) => {
  return <div className={`p-4 border-t bg-gray-50 ${className}`}>{children}</div>;
};

const CardImage: React.FC<{src: string; alt: string; className?: string}> = ({ src, alt, className = '' }) => {
  return (
    <div className="w-full h-48 overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover ${className}`} 
      />
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter, CardImage };