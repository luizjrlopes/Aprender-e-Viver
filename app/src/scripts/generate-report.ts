#!/usr/bin/env ts-node
import puppeteer from "puppeteer";
import { readFile } from "fs/promises";
import { join } from "path";

interface ModuleData {
  nomeModulo: string;
  nomeEscola: string;
  turma: string;
  semestre: string;
  descricao: string;
}

const DATA_PATH = join(__dirname, "../data/schools.json");

// Carrega e desserializa o JSON de forma assíncrona
async function loadModules(): Promise<ModuleData[]> {
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw).modules;
}

// Gera um PDF a partir dos dados de um módulo
async function generateReport(module: ModuleData, outputFile: string) {
  const html = `
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Relatório PEX</title>
        <style>
          body { font-family: sans-serif; margin: 2rem; }
          h1 { color: #0070f3; }
        </style>
      </head>
      <body>
        <h1>Relatório PEX – ${module.nomeModulo}</h1>
        <dl>
          <dt>Escola</dt><dd>${module.nomeEscola} (Turma ${module.turma})</dd>
          <dt>Semestre</dt><dd>${module.semestre}</dd>
          <dt>Tema</dt><dd>${module.nomeModulo}</dd>
        </dl>
        <h2>Descrição</h2>
        <p>${module.descricao}</p>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: outputFile, format: "A4", printBackground: true });
  await browser.close();
  console.log(`✅ ${outputFile} gerado.`);
}

// IIFE para usar top‑level await e gerar PDFs em paralelo
(async () => {
  try {
    const modules = await loadModules();
    if (!modules.length) throw new Error("Nenhum módulo encontrado no JSON.");

    await Promise.all(
      modules.map((mod, idx) =>
        generateReport(mod, `Relatorio_PEX${idx + 1}.pdf`)
      )
    );
    console.log("🎉 Todos os relatórios foram gerados!");
  } catch (err) {
    console.error("❌ Erro ao gerar relatórios:", err);
    process.exit(1);
  }
})();
