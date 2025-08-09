import React from 'react';

export default function GameCheff() {
  // A build do jogo (CRA) deve ser copiada para /public/games/cheff
  // via script: npm run game:copy
  return (
    <div className="h-[75vh] border rounded-2xl overflow-hidden bg-black">
      <iframe
        title="Chef Alerg - Jogo"
        src="/games/cheff/index.html"
        className="w-full h-full"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
