'use client';

import TemplateTable from '@/[lng]/components/Templates/TemplateTable'; // Importar el componente TemplateTable
import { useAuth } from '@/[lng]/contexts/AuthContext';
import SkeletonTable from '../../../components/SkeletonTable';

export default function AdminTemplatesEmailPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { isLoading } = useAuth();

  return (
    <div>
      {isLoading ? (
        <SkeletonTable lng={lng} type="templates" /> 
      ) : (
        <TemplateTable lng={lng} />
      )}
    </div>
  );
}
