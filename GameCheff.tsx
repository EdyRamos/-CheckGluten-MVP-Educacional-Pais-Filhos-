// src/GameCheff.tsx
import React from "react";

export default function GameCheff() {
  return (
    <div className="h-[75vh] overflow-hidden rounded-2xl border bg-black shadow-sm">
      <iframe
        title="CheckGluten — Game"
        src="/games/cheff/index.html"
        className="w-full h-full"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
