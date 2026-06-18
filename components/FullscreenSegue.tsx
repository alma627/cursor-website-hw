"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SEGUE_GIFS = ["/gif/sp1.gif", "/gif/sp2.gif", "/gif/sp3.gif"] as const;

function pickSrc() {
  return SEGUE_GIFS[Math.floor(Math.random() * SEGUE_GIFS.length)];
}

type Layer = { src: string };

type Props = {
  /** Increment to play a new random segue (e.g. after nav intent). */
  token: number;
  onExitCompleteScrollTo: string | null;
  onFinished: () => void;
};

export function FullscreenSegue({
  token,
  onExitCompleteScrollTo,
  onFinished,
}: Props) {
  const [layer, setLayer] = useState<Layer | null>(null);
  const scrollToRef = useRef<string | null>(null);
  const prevToken = useRef(0);

  useEffect(() => {
    if (token <= 0 || token === prevToken.current) return;
    prevToken.current = token;
    scrollToRef.current = onExitCompleteScrollTo;
    setLayer({ src: pickSrc() });
  }, [token, onExitCompleteScrollTo]);

  useEffect(() => {
    if (!layer) return;
    const t = window.setTimeout(() => setLayer(null), 2200);
    return () => window.clearTimeout(t);
  }, [layer]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        const id = scrollToRef.current;
        scrollToRef.current = null;
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
        onFinished();
      }}
    >
      {layer ? (
        <motion.div
          key={layer.src}
          className="pointer-events-none fixed inset-0 z-[100] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layer.src}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
