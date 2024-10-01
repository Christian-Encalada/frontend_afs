import { cn } from '@/utils/utils';

import { DataTableStatusHeaderProps } from '@/types/table';
import { t } from 'i18next';

export default function DataTableStatusHeader<TData, TValue>({
  status,
  className,
}: DataTableStatusHeaderProps) {

  return (
    <span className={cn(className)}>
      {status ? t('sites:active') : t('sites:inactive')}
    </span>
  );
}
