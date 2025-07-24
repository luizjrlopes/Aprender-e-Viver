#!/usr/bin/env ts-node
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import { join } from 'path';

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
  const tplPath = join(__dirname, '../templates/report.html');
  const tpl = await readFile(tplPath, 'utf-8');
  const html = Handlebars.compile(tpl)(module);

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
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
