'use client';

import React from 'react';
import Image from 'next/image';

interface CharacterMessageProps {
  message: React.ReactNode; // Allow React nodes for richer content if needed
  imageSrc?: string;
  imageAlt?: string;
  imageSize?: number;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({
  message,
  imageSrc = "/images/jacky.jpg",
  imageAlt = "Character",
  imageSize = 100,
}) => {
  return (
    <div className="flex items-center mb-12">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageSize}
        height={imageSize}
        className="mr-4 rounded-full flex-shrink-0" // Added flex-shrink-0
      />
      <div className="relative">
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <div className="text-gray-700 font-medium">{message}</div>
        </div>
        {/* Speech bubble pointer */}
        <div 
          className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 rotate-180 w-0 h-0 
                     border-t-8 border-t-transparent 
                     border-b-8 border-b-transparent 
                     border-l-8 border-l-gray-100" 
          style={{ marginLeft: '-1px' }} // Adjusted for slight overlap/positioning
        ></div>
      </div>
    </div>
  );
};

export default CharacterMessage; 