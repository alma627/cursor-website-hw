"use client";
import React from 'react';

export default function MusicPlayer() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            音乐播放器
          </p>
          <p className="mt-1 text-sm text-zinc-200">正在播放: True Ending</p>
          
          <audio 
            controls 
            crossOrigin="anonymous" 
            src="https://raw.githubusercontent.com/alma627/cursor-website-hw/main/public/music/true%20ending.SHIBEI.MP3"
          />
        </div>
      </div>
    </div>
  );
}
