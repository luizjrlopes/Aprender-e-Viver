import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import { promises as fs } from "fs";
import { join } from "path";
import modulesData from "@/../data/schools.json";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const modules = (modulesData as { modules: any[] }).modules;
    const mod = modules.find((m) => m.id === params.id);
    if (!mod) {
      return NextResponse.json(
        { error: "Módulo não encontrado" },
        { status: 404 }
      );
    }
    const templatePath = join(process.cwd(), "templates", "report.html");
    const src = await fs.readFile(templatePath, "utf-8");
    const html = Handlebars.compile(src)(mod);

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="report-${mod.id}.pdf"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao gerar relatório" },
      { status: 500 }
    );
  }
}
