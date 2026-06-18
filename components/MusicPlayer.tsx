"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/music/true ending.SHIBEI.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.85;
    void a
      .play()
      .then(() => {
        setPlaying(true);
        setBlocked(false);
      })
      .catch(() => {
        setBlocked(true);
        setPlaying(false);
      });
  }, []);

  const resume = () => {
    const a = audioRef.current;
    if (!a) return;
    void a.play().then(() => {
      setPlaying(true);
      setBlocked(false);
    });
  };

   return (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          音乐播放器
        </p>
        <p className="mt-1 text-sm text-zinc-200">正在播放: True Ending</p>
        
        {/* 这是你唯一需要的播放器，带上跨域属性 */}
        <audio 
          controls 
          crossOrigin="anonymous" 
          src="https://raw.githubusercontent.com/alma627/cursor-website-hw/main/public/music/true%20ending.SHIBEI.MP3"
        />
      </div>
    </div>
  </div>
);
