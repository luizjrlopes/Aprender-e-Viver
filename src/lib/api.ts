#!/usr/bin/env ts-node
import OpenAI from "openai";

let openai: OpenAI | null = null;

export async function generateIdeas(
  disciplinas: string[],
  conteudos: string[]
): Promise<string> {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY || (process.env.NODE_ENV === 'test' ? 'test' : '');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    openai = new OpenAI({ apiKey });
  }
  const system = `Você é um assistente que sugere ideias de apps educativos.`;
  const user = `Eu estudei: ${disciplinas.join(
    ", "
  )}. Os alunos veem: ${conteudos.join(
    ", "
  )}. Dê 3 ideias curtas de apps educativos.`;

  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  // === Checagem de segurança para StrictNullChecks ===
  if (!chat.choices?.length) {
    throw new Error("Resposta vazia da API OpenAI: nenhuma escolha retornada.");
  }
  const message = chat.choices[0].message;
  if (!message?.content) {
    throw new Error(
      "Resposta malformada da API OpenAI: sem conteúdo na mensagem."
    );
  }

  return message.content.trim();
}
