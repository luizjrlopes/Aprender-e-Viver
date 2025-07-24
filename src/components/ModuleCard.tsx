import { ModuloAppPEX } from '../models/Module';

interface Props {
  module: ModuloAppPEX;
}

export default function ModuleCard({ module }: Props) {
  return (
    <div>
      <h3>{module.nomeEscola}</h3>
      <p>{module.conteudoEscolar.join(', ')}</p>
      <a href={module.linkApp} target="_blank">Abrir Módulo</a>
    </div>
  );
}
