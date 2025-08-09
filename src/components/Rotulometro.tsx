import React, { useState } from "react";
import Btn from "./Btn";
import Card from "./Card";
import Alert from "./Alert";
import SearchIcon from "@/assets/icons/search.svg";
import { Play, Info, ArrowLeft, Home } from "lucide-react";

function Header({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-3 pb-4">
      {onBack ? (
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-gray-100">
          <ArrowLeft />
        </button>
      ) : (
        <Home className="text-blue-600" />
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}

const cls = (...s: string[]) => s.filter(Boolean).join(" ");

type Round = {
  ingredientes: string[];
  perigosos: number[];
  explicacoes: Record<string, string>;
};

const ROUNDS: Round[] = [
  {
    ingredientes: ["farinha de arroz", "açúcar", "malte de cevada", "goma xantana"],
    perigosos: [2],
    explicacoes: { "malte de cevada": "Derivado de cevada → contém glúten" },
  },
  {
    ingredientes: ["amido de milho", "triticale", "cacau", "fermento químico"],
    perigosos: [1],
    explicacoes: { triticale: "Híbrido de trigo+centeio → contém glúten" },
  },
  {
    ingredientes: ["polvilho doce", "aveia", "óleo vegetal", "sal"],
    perigosos: [1],
    explicacoes: {
      aveia: "Pode conter traços conforme processamento. Verifique 'sem glúten'.",
    },
  },
];

export function Rotulometro() {
  const [step, setStep] = useState<"idle" | "playing" | "result">("idle");
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState<string[]>([]);

  const cur = ROUNDS[round];

  const start = () => {
    setStep("playing");
    setRound(0);
    setPicked([]);
    setAcertos(0);
    setErros([]);
  };

  const toggle = (i: number) => {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  };

  const submit = () => {
    const corretos = cur.perigosos;
    const ok = picked.sort().join(",") === corretos.sort().join(",");
    if (ok) setAcertos((v) => v + 1);
    else {
      const errTerms = picked
        .filter((i) => !corretos.includes(i))
        .map((i) => cur.ingredientes[i]);
      setErros((e) => [...e, ...errTerms]);
    }
    console.log("game_level_complete", {
      level_id: round + 1,
      acertos: ok ? 1 : 0,
      erros: ok ? 0 : 1,
      termos_errados: picked
        .filter((i) => !cur.perigosos.includes(i))
        .map((i) => cur.ingredientes[i]),
    });
    if (round + 1 < ROUNDS.length) {
      setRound((r) => r + 1);
      setPicked([]);
    } else {
      setStep("result");
    }
  };

  if (step === "idle")
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-3 flex items-center justify-center gap-1">
          <img src={SearchIcon} alt="Pesquisar" className="w-4 h-4" />
          <span>Aprenda a identificar ingredientes de risco.</span>
        </p>
        <Btn onClick={start}>
          <Play className="inline mr-2" /> Começar
        </Btn>
      </div>
    );

  if (step === "result") {
    const total = ROUNDS.length;
    const score = Math.round((acertos / total) * 100);
    return (
      <div className="space-y-4">
        <Header title="Resultado" />
        <Card>
          <div className="text-2xl font-bold">{score}%</div>
          <div className="text-gray-600">Acertos: {acertos} / {total}</div>
          {erros.length > 0 && (
            <Alert variant="danger" className="mt-2">
              Termos para revisar: {Array.from(new Set(erros)).join(", ")}
            </Alert>
          )}
        </Card>
        <Btn variant="secondary" onClick={() => setStep("idle")}>
          Jogar novamente
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <Header title={`Fase ${round + 1} de ${ROUNDS.length}`} />
      <p className="text-sm text-gray-700 mb-2">
        Toque nos ingredientes que indicam risco de glúten.
      </p>
      <div className="grid sm:grid-cols-2 gap-2">
        {cur.ingredientes.map((ing, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={cls(
              "p-3 rounded-xl border text-left",
              picked.includes(i) ? "bg-yellow-100 border-yellow-400" : "bg-white"
            )}
          >
            {ing}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Btn variant="secondary" onClick={submit}>
          Confirmar escolha
        </Btn>
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <Info size={16} />
          Dica: procure trigo, centeio, cevada, malte, triticale…
        </div>
      </div>
      <Card className="mt-4 bg-blue-50 border-blue-200 text-sm">
        {Object.entries(cur.explicacoes).map(([k, v]) => (
          <div key={k}>
            <strong>{k}:</strong> {v}
          </div>
        ))}
      </Card>
    </div>
  );
}

export { ROUNDS, type Round };
