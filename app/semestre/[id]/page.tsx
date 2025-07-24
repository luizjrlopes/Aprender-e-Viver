"use client";
import { useState } from "react";
import ModuleCard from "@/components/ModuleCard";
import { ModuloAppPEX } from "@/models/Module";
import modulesData from "@/../data/schools.json";
import Button from "@/components/ui/Button";

interface Props {
  params: { id: string };
}

const allModules = (modulesData as { modules: ModuloAppPEX[] }).modules;

export default function SemestrePage({ params }: Props) {
  const mods = allModules.filter((m) => m.semestre === Number(params.id));
  const [ideas, setIdeas] = useState("");
  const [disciplinas, setDisciplinas] = useState("");
  const [conteudos, setConteudos] = useState("");

  async function handleIdeas() {
    const res = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        disciplinas: disciplinas.split(",").map((s) => s.trim()),
        conteudos: conteudos.split(",").map((s) => s.trim()),
      }),
    });
    const data = await res.json();
    setIdeas(data.ideas);
  }

  async function handleReport(id: string) {
    const res = await fetch(`/api/report/${id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  return (
    <div>
      <h1>{`Semestre ${params.id}`}</h1>
      <div>
        {mods.map((mod) => (
          <div key={mod.id} className="mb-4">
            <ModuleCard module={mod} />
            <Button className="mt-2" onClick={() => handleReport(mod.id)}>
              Gerar Relatório
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2>Gerar Ideias de Apps</h2>
        <input
          className="border p-1 mr-2"
          placeholder="Disciplinas"
          value={disciplinas}
          onChange={(e) => setDisciplinas(e.target.value)}
        />
        <input
          className="border p-1 mr-2"
          placeholder="Conteúdos"
          value={conteudos}
          onChange={(e) => setConteudos(e.target.value)}
        />
        <Button onClick={handleIdeas} className="bg-green-600">
          Gerar
        </Button>
        {ideas && <pre className="mt-4 whitespace-pre-wrap">{ideas}</pre>}
      </div>
    </div>
  );
}
