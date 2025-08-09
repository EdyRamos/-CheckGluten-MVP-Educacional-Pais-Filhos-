// src/GameCheff.tsx
import React from "react";
import Card from "./components/Card";

type Props = {
  /** Futuro: render diferente quando embutido em modal/etc */
  embedded?: boolean;
};

/**
 * GameCheff
 * Renderiza o jogo (build estática) via iframe.
 * Copie a build do jogo para: public/games/cheff/index.html
 * Ex.: npm run game:copy (script que você preferir)
 */
export default function GameCheff({ embedded }: Props) {
  return (
    <Card className="h-[75vh] overflow-hidden bg-black p-0">
      <iframe
        title="CheckGluten — Jogo"
        src="/games/cheff/index.html"
        className="w-full h-full"
        allow="autoplay; fullscreen"
      />
    </Card>
  );
}
