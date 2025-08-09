import React from "react";
import AppLayout from "./components/AppLayout";

interface GameCheffProps {
  embedded?: boolean;
}

export default function GameCheff({ embedded = false }: GameCheffProps) {
  // A build do jogo (CRA) deve ser copiada para /public/games/cheff
  // via script: npm run game:copy
  const content = (
    <div className="h-[75vh] border rounded-2xl overflow-hidden bg-black">
      <iframe
        title="Chef Alerg - Jogo"
        src="/games/cheff/index.html"
        className="w-full h-full"
        allow="autoplay; fullscreen"
      />
    </div>
  );

  return embedded ? content : <AppLayout>{content}</AppLayout>;
}
