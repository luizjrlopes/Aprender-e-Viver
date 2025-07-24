// app/api/report/[id]/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { join } from "path";
import modulesData from "./../../../../data/schools.json";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Buscar o módulo no JSON (pode trocar por Firestore quando migrar)
    const modules = (modulesData as { modules: any[] }).modules;
    const mod = modules.find((m) => m.id === params.id);
    if (!mod) {
      return NextResponse.json(
        { error: "Módulo não encontrado" },
        { status: 404 }
      );
    }

    // 2. Carregar template e compilar via Handlebars (requiring no topo evita bundle)
    const Handlebars = require("handlebars");
    const templatePath = join(process.cwd(), "templates", "report.html");
    const src = await fs.readFile(templatePath, "utf-8");
    const html = Handlebars.compile(src)(mod);

    // 3. Gerar PDF com Puppeteer
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // 4. Retornar PDF inline
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="report-${mod.id}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("Erro ao gerar relatório:", err);
    return NextResponse.json(
      { error: "Erro ao gerar relatório" },
      { status: 500 }
    );
  }
}
