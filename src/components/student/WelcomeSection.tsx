import React from 'react';
import Link from 'next/link';
import { StudentProfile } from '@/types';
import Avatar from '@/components/common/Avatar';
import { AiOutlineCalendar } from 'react-icons/ai';



export function WelcomeSection({ profile }: { profile: StudentProfile }) {
  return (
    <section className="mb-2" aria-labelledby="welcome-heading">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white/20 backdrop-blur-md rounded-xl p-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-3 cursor-pointer transition-transform hover:-translate-y-0.5">
            <Avatar
              avatarUrl={profile.avatar.avatarUrl}
              frameUrl={profile.avatar.frameUrl}
              backgroundUrl={profile.avatar.backgroundUrl}
              objectUrl1={profile.avatar.objectUrl1}
              objectUrl2={profile.avatar.objectUrl2}
              size={100}
            />
            <Link
              href="/student/progress"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-xl"
            >
              {profile.name}
            </Link>
          </div>
          <div className="space-y-3 font-semibold text-gray-800/80">
            <div className="flex items-center font-bold gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h2 id="welcome-heading" className="text-3xl ">
                <span className="">Good Day!</span>
                <span className="text-3xl ml-2">👋</span>
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-0">
                <AiOutlineCalendar className="text-lg" />
                <span className="">{profile.date}</span>
              </div>
              <div className="flex items-center gap-0">
                <span className="text-lg">✨</span>
                <span className="">Ready to learn something amazing?</span>
              </div>

            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-6 py-2">
            {/* Daily Challenge */}
            <button
              onClick={() => {
                window.location.href = "/student/daily-challenge";
              }}
              style={{
                backgroundImage: `url(/stem-hub/target.png)`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // borderRadius: '50%',
                padding: '10px',
                width: '100px',
                height: '100px',
              }} className="flex cursor-pointer flex-col text-blue-600/70 text-center items-center relative transition-transform hover:-translate-y-0.5">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-[10px] leading-none font-semibold uppercase">
                  Daily Challenge
                </div>
                <div className="text-center text-2xl font-bold mb-4 ">
                  {profile.overallProgress}%
                </div>
              </div>
            </button>

            {/* Assignments */}
            <button
              onClick={() => {
                window.location.href = "/student/assignments";
              }}
              className="flex cursor-pointer flex-col items-center gap-0.5 rounded-full bg-green-100/70 text-teal-600/70 px-6 py-4 backdrop-blur-sm transition-transform hover:-translate-y-0.5">
              <div className="text-2xl font-bold flex items-center gap-2">{profile.lessonsCompleted}
                <img src="/stem-hub/icons/assignments.png" alt="Assignments" className="w-6" />
              </div>
              <div className="text-xs font-semibold uppercase">Assignments</div>
            </button>

            {/* Achievements */}
            <button
              onClick={() => {
                window.location.href = "/student/achievements";
              }}
              className="flex cursor-pointer text-amber-700/70 flex-col items-center relative transition-transform hover:-translate-y-0.5">
              <img src="/stem-hub/emerald-trophy.png" alt="Achievements" className="h-20" />
              <span className="absolute top-2 text-white/90 w-full text-center font-semibold text-2xl ">
                {profile.achievementsEarned}
              </span>
              <div className="text-xs font-semibold uppercase">Achievements</div>
            </button>
          </div>
        </div>
      </div>
    </section >
  );
}