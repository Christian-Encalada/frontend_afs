import { TranslationKeys } from '@/types/dashboardLayout';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineNotificationsNone, MdOutlineSettings } from 'react-icons/md';

export const ICONS: { titleKey: TranslationKeys; icon: JSX.Element }[] = [
  {
    titleKey: 'notifications',
    icon: <MdOutlineNotificationsNone className='h-5 w-5 cursor-pointer' />,
  },
  {
    titleKey: 'search',
    icon: <FiSearch className='h-5 w-5 cursor-pointer' />,
  },
  {
    titleKey: 'settings',
    icon: <MdOutlineSettings className='h-5 w-5 cursor-pointer' />,
  },
];
