"use client";

import { useCallback, useState } from "react";
import { FullscreenSegue } from "@/components/FullscreenSegue";
import { WalineComments } from "@/components/WalineComments";
import MusicPlayer from '@/components/MusicPlayer';

const POKEMON_GIF = `/images/${encodeURIComponent("pokemon love GIF.gif")}`;

const SIDEBAR_AVATAR_SRC = "/images/avatar.jpg";
const SIDEBAR_BG_SRC = "/images/sidebar-bg.jpg";
const SIDEBAR_WING_SRC = "/images/wing.png";

/** Notion 公开页嵌入（原 API 已移除） */
const RICE_LOG_EMBED_SRC =
  "https://somber-gladiolus-6d1.notion.site/ebd//38235f777ec980b88826fd3e98ce01d1?v=38235f777ec98009bdc0000c53f3eb95";

const NAV = [
  { id: "visual", label: "作品画廊" },
  { id: "music", label: "音乐播放器" },
  { id: "notion", label: "精神饭团食用记录" },
  { id: "guestbook", label: "留言区" },
] as const;

type Props = {
  gallery: string[];
};

export function HomeShell({ gallery }: Props) {
  const [segue, setSegue] = useState({ token: 0, target: null as string | null });
  const [wingsVisible, setWingsVisible] = useState(true);

  const go = useCallback((id: string) => {
    setSegue((s) => ({ token: s.token + 1, target: id }));
  }, []);

  return (
    <div className="relative min-h-screen">
      <FullscreenSegue
        token={segue.token}
        onExitCompleteScrollTo={segue.target}
        onFinished={() => setSegue((s) => ({ ...s, target: null }))}
      />

      <div className="flex min-h-screen">
        <aside
          className="fixed left-0 top-0 z-20 flex h-screen w-[var(--sidebar-w)] flex-col border-r border-white/10 bg-stone-950/80 shadow-xl backdrop-blur-md"
          style={{
            backgroundImage: `url(${SIDEBAR_BG_SRC})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
          <div className="relative flex h-full flex-col gap-6 p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="sidebar-avatar-wrap">
                {wingsVisible ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={SIDEBAR_WING_SRC}
                    alt=""
                    onError={() => setWingsVisible(false)}
                    className="sidebar-avatar-wings"
                    aria-hidden
                  />
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SIDEBAR_AVATAR_SRC}
                  alt="仓鼠头像"
                  className="sidebar-avatar"
                />
              </div>
              <div className="relative z-10">
                <p className="text-lg font-semibold tracking-wide text-white">
                我是热水627
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-300/90">
                 Wubba lubba dub dub!
                  <br />
                  欢迎光临いらっしゃいませ
                </p>
              </div>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-zinc-100 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <p className="text-[10px] leading-relaxed text-zinc-500">
              资源路径：/images · /gif · /gallery · /music
            </p>
          </div>
        </aside>

        <main className="ml-[var(--sidebar-w)] min-h-screen flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10 pb-24">
            <section className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-banner.jpg"
                alt="主视觉"
                className="aspect-[21/9] w-full object-cover sm:aspect-[24/9]"
              />
            </section>

            <section className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { src: "/images/gif1.gif", label: "展示 GIF 1" },
                { src: "/images/gif2.gif", label: "展示 GIF 2" },
                { src: POKEMON_GIF, label: "展示 GIF 3" },
              ].map((g) => (
                <figure
                  key={g.src}
                  className="overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.label}
                    className="aspect-video w-full object-cover"
                  />
                  <figcaption className="px-3 py-2 text-center text-xs text-zinc-400">
                    {g.label}
                  </figcaption>
                </figure>
              ))}
            </section>

            <section id="visual" className="scroll-mt-28 pt-16">
              <h2 className="mb-4 text-xl font-semibold text-white">作品画廊</h2>
              <div
                className="rounded-2xl border border-white/10 p-4 sm:p-6"
                style={{
                  backgroundImage: "url(/images/gallery-exclusive-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="rounded-xl bg-black/45 p-4 backdrop-blur-sm sm:p-6">
                  {gallery.length === 0 ? (
                    <p className="text-sm text-zinc-400">
                      未在{" "}
                      <code className="rounded bg-white/10 px-1">/public/gallery</code>{" "}
                      检测到图片。
                    </p>
                  ) : (
                    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                      {gallery.map((src) => (
                        <div key={src} className="gallery-masonry-item mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt=""
                            className="w-full rounded-lg border border-white/10 object-cover shadow-md"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section id="music" className="scroll-mt-28 pt-16">
              <h2 className="mb-4 text-xl font-semibold text-white">音乐播放器</h2>
              <MusicPlayer />
            </section>

            <section id="notion" className="scroll-mt-28 pt-16">
              <h2 className="mb-4 text-xl font-semibold text-white">
                精神饭团食用记录
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg ring-1 ring-white/5">
                <iframe
                  src={RICE_LOG_EMBED_SRC}
                  title="精神饭团食用记录"
                  className="block h-[600px] w-full border-0 bg-[#191919]"
                  allowFullScreen
                />
              </div>

              <div id="guestbook" className="scroll-mt-28 mt-10">
                <h2 className="mb-4 text-xl font-semibold text-white">留言区</h2>
                <WalineComments />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
