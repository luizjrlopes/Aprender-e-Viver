'use client';
import { useState } from 'react';
import { ModuloAppPEX } from '@/models/Module';

interface Props {
  onSave: (mod: Partial<ModuloAppPEX>) => void;
}

export default function ModuleForm({ onSave }: Props) {
  const [nomeModulo, setNomeModulo] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onSave({ nomeModulo }); }}>
      <input
        className="border p-2"
        value={nomeModulo}
        onChange={e => setNomeModulo(e.target.value)}
        placeholder="Nome do módulo"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white">Salvar</button>
    </form>
  );
}
