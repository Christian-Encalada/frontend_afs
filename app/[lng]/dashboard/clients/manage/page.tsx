'use client';

import ClientTable from '../../../components/Clients/ClientTable';
import SkeletonTable from '../../../components/SkeletonTable';
import { useAuth } from '../../../contexts/AuthContext';

export default function ManageClientsPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { isLoading } = useAuth();
  return (
    <div>
      {isLoading ? (
        <SkeletonTable lng={lng} type='clients' />
      ) : (
        <ClientTable lng={lng} />
      )}
    </div>
  );
}
