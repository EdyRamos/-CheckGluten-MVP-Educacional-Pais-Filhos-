import React from 'react';
import { Mascot } from './assets/icons';

export default function GameCheff() {
  // A build do jogo (CRA) deve ser copiada para /public/games/cheff
  // via script: npm run game:copy
  return (
    <div>
      <Mascot className="w-16 h-16 mx-auto mb-4" />
      <div className="h-[75vh] border rounded-2xl overflow-hidden bg-black">
        <iframe
          title="Chef Alerg - Jogo"
          src="/games/cheff/index.html"
          className="w-full h-full"
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
}
