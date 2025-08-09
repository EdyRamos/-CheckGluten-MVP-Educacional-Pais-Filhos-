import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChefHat, GraduationCap, ListChecks, BookOpen, ArrowLeft, Play, Users, Home, Info, Star, Gamepad2 } from "lucide-react";
import GameCheff from "./GameCheff";

// Utilidades simples
const cls = (...s: string[]) => s.filter(Boolean).join(" ");

// Botão básico
function Btn({ children, onClick, variant = "primary", disabled = false }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost" | "outline"; disabled?: boolean }) {
  const base = "px-4 py-2 rounded-2xl font-medium transition border select-none";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600 disabled:opacity-50",
    ghost: "bg-transparent hover:bg-gray-100 border-transparent text-gray-800",
    outline: "bg-white border-gray-300 hover:bg-gray-50",
  } as const;
  return (
    <button onClick={onClick} disabled={disabled} className={cls(base, styles[variant])}>
      {children}
    </button>
  );
}

// Cartão
function Card({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md cursor-pointer focus:outline-none"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children}
    </motion.div>
  );
}

// Header
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

// --- CHECKLISTS ----------------------------------------------------------
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

function Checklists() {
  const [current, setCurrent] = useState<keyof typeof CHECKLISTS | null>(null);
  const [done, setDone] = useState<Record<string, boolean[]>>(() => Object.fromEntries(Object.keys(CHECKLISTS).map(k => [k, Array(CHECKLISTS[k].length).fill(false)])) as Record<string, boolean[]>);

  const progress = (key: string) => {
    const arr = done[key] || [];
    const pct = Math.round((arr.filter(Boolean).length / arr.length) * 100);
    return isNaN(pct) ? 0 : pct;
  };

  if (!current) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {Object.keys(CHECKLISTS).map((name) => (
          <Card key={name} onClick={() => setCurrent(name as any)}>
            <div className="flex items-start gap-3">
              <ListChecks className="text-green-600" />
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
            <input type="checkbox" checked={done[current][i]} onChange={() => toggle(i)} />
            <span>{t}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">Progresso: {progress(current)}%</div>
    </div>
  );
}

// --- MINI JOGO ROTULÔMETRO ----------------------------------------------

type Round = { ingredientes: string[]; perigosos: number[]; explicacoes: Record<string, string> };

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
    explicacoes: { aveia: "Pode conter traços conforme processamento. Verifique 'sem glúten'." },
  },
];

function Rotulometro() {
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
        <p className="text-gray-600 mb-3">Aprenda a identificar ingredientes de risco.</p>
        <Btn onClick={start}><Play className="inline mr-2" /> Começar</Btn>
      </div>
    );

  if (step === "result") {
    const total = ROUNDS.length;
    const score = Math.round((acertos / total) * 100);
    return (
      <div className="space-y-4">
        <Header title="Resultado" />
        <div className="p-5 border rounded-2xl">
          <div className="text-2xl font-bold">{score}%</div>
          <div className="text-gray-600">Acertos: {acertos} / {total}</div>
          {erros.length > 0 && (
            <div className="mt-2 text-sm text-red-600">Termos para revisar: {Array.from(new Set(erros)).join(", ")}</div>
          )}
        </div>
        <Btn variant="outline" onClick={() => setStep("idle")}>Jogar novamente</Btn>
      </div>
    );
  }

  return (
    <div>
      <Header title={`Fase ${round + 1} de ${ROUNDS.length}`} />
      <p className="text-sm text-gray-700 mb-2">Toque nos ingredientes que indicam risco de glúten.</p>
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
        <Btn variant="outline" onClick={submit}>Confirmar escolha</Btn>
        <div className="text-sm text-gray-600 flex items-center gap-1"><Info size={16}/>Dica: procure trigo, centeio, cevada, malte, triticale…</div>
      </div>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm">
        {Object.entries(cur.explicacoes).map(([k, v]) => (
          <div key={k}><strong>{k}:</strong> {v}</div>
        ))}
      </div>
    </div>
  );
}

// --- RECEITAS ------------------------------------------------------------

type Recipe = { id: string; title: string; time: string; difficulty: "Fácil" | "Médio"; ingredients: string[]; steps: string[]; swaps: string[] };

const RECIPES: Recipe[] = [
  {
    id: "panqueca-gf",
    title: "Panqueca Clássica sem Glúten",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["2 ovos", "1 xíc. farinha de arroz", "1/2 xíc. polvilho doce", "1 xíc. leite", "1 c.s. óleo", "sal"],
    steps: ["Bata tudo até ficar homogêneo.", "Aqueça frigideira untada.", "Doure dos dois lados e sirva."],
    swaps: ["Troque 1/2 xíc. farinha de arroz por 1/2 xíc. mistura pronta GF.", "Leite → bebida vegetal para versão sem lactose."],
  },
  {
    id: "bolo-cenoura-gf",
    title: "Bolo de Cenoura GF",
    time: "45 min",
    difficulty: "Médio",
    ingredients: ["3 cenouras", "3 ovos", "1/2 xíc. óleo", "1 1/2 xíc. mix farinha GF", "1 xíc. açúcar", "1 c.s. fermento"],
    steps: ["Bata cenoura, ovos e óleo.", "Misture secos e incorpore.", "Asse a 180°C por ~35min."],
    swaps: ["Use 70% farinha de arroz + 30% fécula de batata se não tiver mix."],
  },
  {
    id: "pao-forma-gf",
    title: "Pão de Forma GF Rápido",
    time: "60 min",
    difficulty: "Médio",
    ingredients: ["2 xíc. mix GF", "2 ovos", "1 xíc. água morna", "1 c.s. açúcar", "1 c.s. fermento biológico", "1/4 xíc. óleo", "sal"],
    steps: ["Ative fermento com água e açúcar.", "Misture tudo e bata.", "Descanso 30min e asse a 200°C por 30–35min."],
    swaps: ["Acrescente 1 c.s. psyllium para melhor textura."],
  },
];

function Recipes() {
  const [sel, setSel] = useState<Recipe | null>(null);
  if (!sel) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {RECIPES.map((r) => (
          <Card key={r.id} onClick={() => setSel(r)}>
            <div className="flex items-start gap-3">
              <ChefHat className="text-orange-600"/>
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <div className="text-xs text-gray-500">{r.time} • {r.difficulty}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div>
      <Header title={sel.title} onBack={() => setSel(null)} />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-2xl">
          <h4 className="font-semibold mb-2">Ingredientes</h4>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {sel.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>
        <div className="p-4 border rounded-2xl">
          <h4 className="font-semibold mb-2">Passo a passo</h4>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            {sel.steps.map((i, idx) => <li key={idx}>{i}</li>)}
          </ol>
        </div>
      </div>
      <div className="mt-4 p-4 border rounded-2xl bg-amber-50">
        <h4 className="font-semibold mb-2">Substituições</h4>
        <ul className="list-disc ml-5 space-y-1 text-sm">
          {sel.swaps.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>
      <div className="mt-4">
        <Btn onClick={() => { console.log("save_recipe", { recipe_id: sel.id, alergênicos: ["glúten"], tempo_preparo: sel.time }); alert("Receita salva! (simulação)"); }}>Salvar & gerar lista (simulação)</Btn>
      </div>
    </div>
  );
}

// --- PERFIL FAMILIAR -----------------------------------------------------
function Family() {
  const [kids, setKids] = useState<{ name: string; age: number }[]>([{ name: "Ana", age: 8 }]);
  const add = () => {
    const name = prompt("Nome da criança?")?.trim();
    const age = Number(prompt("Idade?"));
    if (!name || isNaN(age)) return;
    const next = [...kids, { name, age }];
    setKids(next);
    console.log("family_profile_created", { idade_faixa: age < 6 ? "0-5" : age < 12 ? "6-11" : "12+" });
  };
  return (
    <div>
      <Header title="Perfis da Família" />
      <div className="space-y-2">
        {kids.map((k, i) => (
          <div key={i} className="p-3 border rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-purple-600"/>
              <div>
                <div className="font-medium">{k.name}</div>
                <div className="text-xs text-gray-500">{k.age} anos</div>
              </div>
            </div>
            <Star className="text-yellow-500"/>
          </div>
        ))}
      </div>
      <div className="mt-4"><Btn variant="outline" onClick={add}>Adicionar perfil</Btn></div>
    </div>
  );
}

// --- APP PRINCIPAL -------------------------------------------------------

type Tab = "Home" | "Checklists" | "Rotulometro" | "Receitas" | "Familia" | "Jogo";

export default function App() {
  const [tab, setTab] = useState<Tab>("Home");

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-blue-600 text-white"><GraduationCap /></div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Chef Alerg</h1>
            <p className="text-sm text-gray-600">MVP Educacional — confiança para famílias celíacas</p>
          </div>
        </div>

        {tab === "Home" && (
          <div className="grid md:grid-cols-3 gap-4">
            <Card onClick={() => setTab("Checklists")}>
              <div className="flex items-start gap-3">
                <ListChecks className="text-green-600" />
                <div>
                  <div className="font-semibold">Checklists Rápidos</div>
                  <div className="text-sm text-gray-600">Cozinha, Festa e Escola — 2–3 min cada</div>
                </div>
              </div>
            </Card>
            <Card onClick={() => setTab("Rotulometro")}>
              <div className="flex items-start gap-3">
                <GraduationCap className="text-indigo-600" />
                <div>
                  <div className="font-semibold">Minigame Rotulômetro</div>
                  <div className="text-sm text-gray-600">Aprenda a detectar termos de risco</div>
                </div>
              </div>
            </Card>
            <Card onClick={() => setTab("Receitas")}>
              <div className="flex items-start gap-3">
                <ChefHat className="text-orange-600" />
                <div>
                  <div className="font-semibold">Receitas-Base</div>
                  <div className="text-sm text-gray-600">Substituições seguras e práticas</div>
                </div>
              </div>
            </Card>
<Card onClick={() => setTab("Jogo")}>
  <div className="flex items-start gap-3">
    <Gamepad2 className="text-pink-600" />
    <div>
      <div className="font-semibold">Jogo — Chef Alerg</div>
      <div className="text-sm text-gray-600">Aventura educativa (Phaser)</div>
    </div>
  </div>
</Card>
          </div>
        )}

        {tab === "Checklists" && <Checklists />}
        {tab === "Rotulometro" && <Rotulometro />}
        {tab === "Receitas" && <Recipes />}
        {tab === "Familia" && <Family />}
        {tab === "Jogo" && <GameCheff />}

        <div className="mt-8 flex flex-wrap gap-2">
          <Btn variant={tab === "Home" ? "primary" : "outline"} onClick={() => setTab("Home")}>Home</Btn>
          <Btn variant={tab === "Checklists" ? "primary" : "outline"} onClick={() => setTab("Checklists")}>Checklists</Btn>
          <Btn variant={tab === "Rotulometro" ? "primary" : "outline"} onClick={() => setTab("Rotulometro")}>Rotulômetro</Btn>
          <Btn variant={tab === "Receitas" ? "primary" : "outline"} onClick={() => setTab("Receitas")}>Receitas</Btn>
          <Btn variant={tab === "Familia" ? "primary" : "outline"} onClick={() => setTab("Familia")}>Família</Btn>
        </div>

        <div className="mt-6 p-4 border rounded-2xl bg-gray-50 text-xs text-gray-600">
          <div className="font-semibold mb-1">Notas para Demo</div>
          <ul className="list-disc ml-5 space-y-1">
            <li>Mostre o fluxo: Home → Checklists (marcar 2 itens) → Rotulômetro (1 rodada) → Receitas (salvar).</li>
            <li>Os eventos de telemetria são simulados via <code>console.log</code> (abra o DevTools).</li>
            <li>Este protótipo é client-side e não armazena dados reais (compliance/LGPD).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
