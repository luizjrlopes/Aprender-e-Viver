export function buildPrompt(disciplinas: string[], conteudos: string[]): string {
  return `Você estudou: ${disciplinas.join(', ')} e deseja aplicar PEX com alunos que estudam: ${conteudos.join(', ')}. Gere 3 ideias de aplicativos educativos simples que integrem esses conteúdos usados nas disciplinas.`;
}
