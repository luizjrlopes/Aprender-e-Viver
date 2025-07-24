import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const collection = db.collection('modules');

export async function GET() {
  const snapshot = await collection.get();
  const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const doc = await collection.add(body);
    return NextResponse.json({ id: doc.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao criar módulo' }, { status: 500 });
  }
}
