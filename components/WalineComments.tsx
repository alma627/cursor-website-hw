"use client";

import { init, type WalineInstance } from "@waline/client";
import "@waline/client/style";
import { WALINE_SERVER_URL } from "@/lib/waline-config";
import { useEffect, useRef } from "react";

export function WalineComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const walineRef = useRef<WalineInstance | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    walineRef.current = init({
      el,
      serverURL: WALINE_SERVER_URL,
      path: "/",
      dark: true,
      lang: "zh-CN",
      login: "disable",
      requiredMeta: ["nick"],
      locale: {
        placeholder: "填写昵称即可留言，无需 GitHub 登录…",
      },
    });

    return () => {
      walineRef.current?.destroy();
      walineRef.current = null;
    };
  }, []);

  return (
    <div className="waline-card">
      <div ref={containerRef} className="waline-mount" />
    </div>
  );
}
