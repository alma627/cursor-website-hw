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
          <p className="mt-1 text-sm text-zinc-200">本地：true endding.SHIBEI.mp3</p>
        </div>
        <div className="flex items-center gap-2">
          {blocked ? (
            <button
              type="button"
              onClick={resume}
              className="rounded-lg bg-amber-500/90 px-3 py-1.5 text-sm font-medium text-stone-950 transition hover:bg-amber-400"
            >
              点击播放（解除浏览器限制）
            </button>
          ) : (
            <span className="text-xs text-emerald-400/90">
              {playing ? "正在播放" : "加载中…"}
            </span>
          )}
        </div>
      </div>
      <audio ref={audioRef} src={SRC} loop preload="auto" className="mt-3 w-full" controls />
    </div>
  );
}
