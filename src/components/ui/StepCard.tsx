import React from 'react';

type StepCardProps = {
  number: number;
  title: string;
  description: string;
  className?: string;
};

export default function StepCard({ 
  number, 
  title, 
  description, 
  className = '' 
}: StepCardProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center mb-4">
        <div className="inline-flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full bg-[#6A4C93] text-white font-bold mr-3 text-center">
          {number}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}