import { useRouter } from 'next/router';
import ModuleCard from '../../../components/ModuleCard';
import schoolsData from '@/data/schools.json';
import { ModuloAppPEX } from '@/models/Module';

const modules: ModuloAppPEX[] = (schoolsData as { modules: ModuloAppPEX[] }).modules;

export default function SemestreModule() {
  const router = useRouter();
  const { id } = router.query;
  const mods = modules.filter((m) => m.semestre === Number(id));
  return (
    <div>
      <h1>{`Semestre ${id}`}</h1>
      <div>
        {mods.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>
    </div>
  );
}
