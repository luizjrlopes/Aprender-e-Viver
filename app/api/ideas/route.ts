import { NextResponse } from 'next/server';
import { generateIdeas } from '@/lib/api';

export async function POST(req: Request) {
  try {
    const { disciplinas, conteudos } = await req.json();
    if (!Array.isArray(disciplinas) || !Array.isArray(conteudos)) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    const ideas = await generateIdeas(disciplinas, conteudos);
    return NextResponse.json({ ideas });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao gerar ideias' }, { status: 500 });
  }
}
