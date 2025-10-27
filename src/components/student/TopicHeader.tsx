import React from 'react';
import Image from 'next/image';

interface SubjectHeaderProps {
  title: string;
  message: string;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  title,
  message,
}) => {
  return (
    <section className="backdrop-blur-sm bg-white/50 rounded-t-2xl p-3 shadow-xl mb-0.5" aria-labelledby="subject-heading">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
        <div className="flex w-full items-center gap-4 md:gap-6">
          <div className="relative w-16 h-16 md:w-36 md:h-36">
            <Image
              src={"/stem-hub/" + title.toLowerCase().replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, "-") + ".png"}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-3 w-full">
            <div className="flex flex-row items-center gap-3">
              <h2 id="subject-heading" className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {title}
              </h2>
            </div>
            <div className="text-gray-600 text-md mt-1">
              {message}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}; 