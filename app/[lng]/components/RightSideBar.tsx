'use client';
import { useTranslation } from '@/i18n/client';
import { MenuItem } from '@/types/item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdArrowDropright } from 'react-icons/io';

export default function RightSideBar({
  activeItem,
  lng,
}: {
  activeItem: MenuItem;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'dashboardDirection');
  const path = usePathname();
  const actualPath = '/' + path.split('/').slice(2).join('/');
  return (
    <div className='w-60 bg-white py-8 pl-2 pr-6 shadow-md dark:bg-dark-primary'>
      <div className='mb-4 ml-5 flex items-center gap-2 text-sm font-normal text-text-primary opacity-45 dark:text-text-secondary dark:opacity-80'>
        {activeItem.icon}
        <span>{t(activeItem.label).toUpperCase()}</span>
      </div>
      <div className='mt-8 flex flex-col gap-2'>
        {activeItem.children.map((child) => (
          <Link
            key={child.id}
            href={child.url}
            className={`${actualPath === child.url ? 'ml-2 bg-bg-primary-opacity pl-2 font-bold text-bg-primary dark:bg-dark-secondary dark:text-dark-text-primary' : 'ml-5 text-text-primary dark:text-text-secondary dark:hover:text-dark-text-primary'} flex w-full items-center gap-1 rounded-xl py-3 text-sm hover:text-bg-primary`}
          >
            {actualPath === child.url ? (
              <IoMdArrowDropright className='h-5 w-5 text-bg-primary dark:text-dark-text-primary' />
            ) : null}
            {t(child.label)}
          </Link>
        ))}
      </div>
    </div>
  );
}
