'use client';
import { useState } from 'react';
import { ModuloAppPEX } from '@/models/Module';
import Button from './ui/Button';

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
      <Button type="submit" className="ml-2">Salvar</Button>
    </form>
  );
}
