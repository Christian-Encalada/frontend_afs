'use client';

import UserTable from '@/[lng]/components/Users/UserTable';
import { useAuth } from '@/[lng]/contexts/AuthContext';
import SkeletonTable from '../../../components/SkeletonTable';

export default function ManageUsersPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { isLoading } = useAuth();

  return (
    <div>
      {isLoading ? (
        <SkeletonTable lng={lng} type='users' />
      ) : (
        <UserTable lng={lng} />
      )}
    </div>
  );
}
