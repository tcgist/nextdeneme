"use client"

import { FC } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-orange-500"
        >
          <path
            d="M16 2L2 8L16 14L30 8L16 2Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M2 16L16 22L30 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 24L16 30L30 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.5"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          FinansGPT
        </span>
        <span className="text-[10px] text-gray-400 -mt-1">
          Finansal Yapay Zeka
        </span>
      </div>
    </div>
  );
};

export default Logo; 