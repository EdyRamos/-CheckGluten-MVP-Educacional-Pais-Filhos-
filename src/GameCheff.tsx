import React from 'react';
import Card from './components/Card';

export default function GameCheff() {
  // A build do jogo (CRA) deve ser copiada para /public/games/cheff
  // via script: npm run game:copy
  return (
    <Card className="h-[75vh] overflow-hidden bg-black p-0">
      <iframe
        title="Chef Alerg - Jogo"
        src="/games/cheff/index.html"
        className="w-full h-full"
        allow="autoplay; fullscreen"
      />
    </Card>
  );
}
