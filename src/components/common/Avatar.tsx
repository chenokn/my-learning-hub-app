import React, { useState } from "react";

type AvatarProps = {
  avatarUrl?: string;       // Main avatar image
  frameUrl?: string;        // Frame image (can be PNG or SVG)
  backgroundUrl?: string;   // Background image
  objectUrl1?: string;       // object image
  objectUrl2?: string;       // object image
  size?: number;            // Optional size, default 200
  emoji?: string;           // If provided, render emoji instead of images
};

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  frameUrl,
  backgroundUrl,
  objectUrl1,
  objectUrl2,
  size = 200,
  emoji,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Calculate proportional sizes based on the main size
  const containerSize = size;
  const avatarSize = Math.round(size * 1); // 70% of container size
  const frameSize = Math.round(size * 1.9); // 160% of container size for frame
  const objectSize = Math.round(size * 0.2); // 20% of container size for floating objects
  const avatarOffset = Math.round(size * 0.275); // 27.5% offset for avatar positioning
  const frameOffset = Math.round(size * 0.45); // 45% offset for frame positioning

  const handleImageError = (imageType: string) => {
    setImageErrors(prev => ({ ...prev, [imageType]: true }));
  };

  if (emoji) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 via-lime-200 to-white shadow-lg"
        style={{ width: `${containerSize}px`, height: `${containerSize}px`, fontSize: `${containerSize * 0.6}px` }}
      >
        <span>{emoji}</span>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-full self-center"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Image */}
      {!imageErrors.background && backgroundUrl && (
        <img
          src={backgroundUrl}
          alt="Background"
          className="absolute w-full h-full rounded-full"
          onError={() => handleImageError('background')}
        />
      )}

      {/* Avatar Image */}
      {!imageErrors.avatar && avatarUrl && (
        <div
          className="overflow-hidden rounded-full absolute z-10"
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            left: `${(containerSize - avatarSize) / 2}px`,
            top: `${(containerSize - avatarSize) / 2}px`
          }}
        >
          <img
            src={avatarUrl}
            alt="Avatar"
            className="object-contain animate-avatar-image"
            style={{ marginTop: `${avatarOffset}px` }}
            onError={() => handleImageError('avatar')}
          />
        </div>
      )}

      {/* Frame Image */}
      {!imageErrors.frame && frameUrl && (
        <div
          className="absolute pointer-events-none z-20"
          style={{
            width: `${frameSize}px`,
            height: `${frameSize}px`,
            left: `-${frameOffset}px`,
            top: `-${frameOffset * 1.2}px`
          }}
        >
          <img
            src={frameUrl}
            alt="Frame"
            className="w-full h-full"
            onError={() => handleImageError('frame')}
          />
        </div>
      )}

      {/* Floating Object 1 */}
      {!imageErrors.object1 && objectUrl1 && (
        <div
          className="absolute z-30 animate-floating"
          style={{
            width: `${objectSize}px`,
            height: `${objectSize}px`,
            bottom: `-${objectSize * 0.25}px`,
            right: `-${objectSize * 0.25}px`
          }}
        >
          <img
            src={objectUrl1}
            alt="Floating Object 1"
            className="w-full h-full object-contain"
            onError={() => handleImageError('object1')}
          />
        </div>
      )}

      {/* Floating Object 2 */}
      {!imageErrors.object2 && objectUrl2 && (
        <div
          className="absolute z-30 animate-floating"
          style={{
            width: `${objectSize}px`,
            height: `${objectSize}px`,
            bottom: `-${objectSize * 0.25}px`,
            left: `-${objectSize * 0.25}px`
          }}
        >
          <img
            src={objectUrl2}
            alt="Floating Object 2"
            className="w-full h-full object-contain scale-x-[-1]"
            onError={() => handleImageError('object2')}
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
