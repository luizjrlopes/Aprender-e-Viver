import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModuleCard from '@/components/ModuleCard';
import { ModuloAppPEX } from '@/models/Module';

test('renders module card', () => {
  const mod: ModuloAppPEX = {
    id: '1',
    nomeEscola: 'Escola',
    cidade: 'Cidade',
    semestre: 1,
    disciplinasFaculdade: [],
    conteudoEscolar: ['tema'],
    nomeModulo: 'Modulo',
    descricao: '',
    tecnologia: '',
    linkApp: 'http://example.com',
    imagens: [],
  };
  render(<ModuleCard module={mod} />);
  expect(screen.getByText('Escola')).toBeInTheDocument();
});
