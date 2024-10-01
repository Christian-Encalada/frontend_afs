'use client';

import { MdLanguage } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useTranslation } from '@/i18n/client';
import ThemeSwitch from './ThemeSwitch';
import UsernameSkeleton from './UsernameSkeleton';
import { ICONS } from '@/utils/iconsTopBar';

export default function NavIcons({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'dashboardIcons');
  const { user, isLoading } = useAuth();
  return (
    <div className='flex flex-wrap items-center gap-4 md:gap-7'>
      <div
        className='flex cursor-pointer items-center gap-2 text-text-primary dark:text-text-secondary'
        title={t('language')}
      >
        <MdLanguage className='h-5 w-5' />
        <p>{lng.toLocaleUpperCase()}</p>
      </div>
      {ICONS.map((icon) => (
        <div
          key={icon.titleKey}
          title={t(icon.titleKey)}
          className='text-text-primary dark:text-text-secondary'
        >
          {icon.icon}
        </div>
      ))}
      <div
        className='flex h-full cursor-pointer items-center gap-2 text-text-primary dark:text-text-secondary'
        title={t('profile')}
      >
        {isLoading ? <UsernameSkeleton /> : <p>{user?.username}</p>}
        <MdOutlineAccountCircle className='h-5 w-5' />
      </div>
      <ThemeSwitch />
    </div>
  );
}
