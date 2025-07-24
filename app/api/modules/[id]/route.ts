import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const collection = db.collection('modules');

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const doc = await collection.doc(params.id).get();
  if (!doc.exists) {
    return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  }
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await collection.doc(params.id).set(body, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await collection.doc(params.id).delete();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 });
  }
}
