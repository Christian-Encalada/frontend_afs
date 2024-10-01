'use client';

import { useTranslation } from '@/i18n/client';
import NavItem from './NavItem';
import RightSideBar from './RightSideBar';
import { DivProps } from '@/types/drawers';
import { useSidebarMenu } from '../hooks/useSideBarMenu';
import { useAuth } from '../contexts/AuthContext';
import SideBarSkeleton from './SideBarSkeleton';

export default function SideBar({ lng, className = '', ...props }: DivProps) {
  const { t } = useTranslation(lng, 'dashboardDirection');
  const { isLoading } = useAuth();
  const { navItems, activeItem, handleItemClick } = useSidebarMenu();

  if (isLoading) {
    return <SideBarSkeleton />;
  }

  if (!activeItem) return null;

  return (
    <div className={`flex ${className}`.trim()} {...props}>
      <div className='flex flex-col items-center gap-1 border-r border-text-primary border-opacity-15 bg-white px-3 py-6 dark:border-r-2 dark:border-dark-text-secondary dark:border-opacity-40 dark:bg-dark-primary'>
        {navItems.map((item) => (
          <NavItem
            label={t(item.label)}
            key={item.id}
            onClick={() => handleItemClick(item)}
            icon={item.icon}
            isActive={item.id === activeItem.id}
          />
        ))}
      </div>
      <RightSideBar activeItem={activeItem} lng={lng} />
    </div>
  );
}
