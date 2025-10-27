import React from 'react';
import Image from 'next/image';

// Helper function to check if icon is an image path
const isImagePath = (icon: string) => icon.startsWith('/') || icon.includes('.png') || icon.includes('.jpg') || icon.includes('.jpeg') || icon.includes('.svg');

interface ImageAndEmojiProps {
  icon: string;
  alt: string;
  size?: number;
}

export const ImageAndEmoji: React.FC<ImageAndEmojiProps> = ({ icon, alt, size = 24 }) => {
  const isImg = isImagePath(icon);
  return isImg ? (
    <div className={`relative w-[${size}px] h-[${size}px]`} style={{ width: size, height: size }}>
      <Image className={`w-[${size}px] h-[${size}px] object-contain`} src={icon} alt={alt} fill />
    </div>
  ) : (
    <span className={size >= 24 ? 'text-7xl' : 'text-4xl'}>{icon}</span>
  );
}; 