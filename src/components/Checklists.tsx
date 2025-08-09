import React, { useState } from "react";
import Card from "./Card";
import AlertIcon from "@/assets/icons/alert.svg";
import { ArrowLeft, Home } from "lucide-react";

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

const CHECKLISTS: Record<string, string[]> = {
  "Cozinha Segura": [
    "Separe utensílios exclusivos para sem glúten",
    "Higienize bancadas antes de cozinhar",
    "Guarde farinhas GF em potes fechados",
    "Torradeira: use saco próprio ou capa",
    "Leia rótulos mesmo dos produtos conhecidos",
    "Explique regras para todos da casa",
  ],
  "Festa Infantil": [
    "Converse com o anfitrião com antecedência",
    "Leve alternativa segura (bolo/lanches)",
    "Combine sinal para recusar alimentos",
    "Oriente sobre contaminação cruzada",
    "Identifique copos e pratos da criança",
    "Tenha cartão de orientação para adultos",
  ],
  Escola: [
    "Reunião com coordenação e professores",
    "Plano de cuidado e contatos de emergência",
    "Lancheira segura identificada",
    "Orientar merendeiras e amigos",
    "Área limpa para refeições",
    "Treino de leitura do rótulo com a criança",
  ],
};

type ChecklistKey = keyof typeof CHECKLISTS;

export function Checklists() {
  const [current, setCurrent] = useState<ChecklistKey | null>(null);
  const [done, setDone] = useState<Record<string, boolean[]>>(
    () =>
      Object.fromEntries(
        Object.keys(CHECKLISTS).map((k) => [
          k,
          Array(CHECKLISTS[k].length).fill(false),
        ])
      ) as Record<string, boolean[]>
  );

  const progress = (key: string) => {
    const arr = done[key] || [];
    const pct = Math.round((arr.filter(Boolean).length / arr.length) * 100);
    return isNaN(pct) ? 0 : pct;
  };

  if (!current) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {Object.keys(CHECKLISTS).map((name) => (
          <Card key={name} onClick={() => setCurrent(name as ChecklistKey)}>
            <div className="flex items-start gap-3">
              <img src={AlertIcon} alt="" className="w-5 h-5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{name}</h3>
                  <span className="text-xs text-gray-500">{progress(name)}% feito</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Checklist rápido, 2–3 min.</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const items = CHECKLISTS[current];
  const toggle = (i: number) => {
    const arr = [...done[current]];
    arr[i] = !arr[i];
    const next = { ...done, [current]: arr };
    setDone(next);
    console.log("checklist_complete", { contexto: current });
  };

  return (
    <div>
      <Header title={current} onBack={() => setCurrent(null)} />
      <div className="space-y-2">
        {items.map((t, i) => (
          <label key={i} className="flex items-center gap-3 p-3 border rounded-xl">
            <input
              type="checkbox"
              checked={done[current][i]}
              onChange={() => toggle(i)}
            />
            <span>{t}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">Progresso: {progress(current)}%</div>
    </div>
  );
}

export { CHECKLISTS };
