import { FaClipboardList } from 'react-icons/fa';
import { FaUserTag } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdBusiness,
  MdCalendarMonth,
  MdPeopleAlt,
} from 'react-icons/md';
import { MenuItem } from '@/types/item';

export const navItems: MenuItem[] = [
  {
    id: 'schedule',
    label: 'schedule',
    icon: <MdCalendarMonth className='h-6 w-6' />,
    roles: ['super admin', 'admin', 'assistant'],
    children: [
      {
        id: 'view_schedule',
        label: 'view_schedule',
        url: '/dashboard/schedule/view',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'add_appointment',
        label: 'add_appointment',
        url: '/dashboard/schedule/add',
        roles: ['super admin', 'admin', 'assistant'],
      },
    ],
  },
  {
    id: 'clients',
    label: 'clients',
    icon: <FaUserTag className='h-6 w-6' />,
    roles: ['super admin', 'admin', 'assistant'],
    children: [
      {
        id: 'manage_clients',
        label: 'manage_clients',
        url: '/dashboard/clients/manage',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'clients_list',
        label: 'clients_list',
        url: '/dashboard/clients/list',
        roles: ['super admin', 'admin', 'assistant'],
      },
    ],
  },
  {
    id: 'system_users',
    label: 'system_users',
    icon: <MdPeopleAlt className='h-6 w-6' />,
    roles: ['super admin', 'admin'],
    children: [
      {
        id: 'manage_users',
        label: 'manage_users',
        url: '/dashboard/users/manage',
        roles: ['super admin', 'admin'],
      },
      {
        id: 'users_list',
        label: 'users_list',
        url: '/dashboard/users/list',
        roles: ['super admin', 'admin'],
      },
    ],
  },
  {
    id: 'sites',
    label: 'sites',
    icon: <MdBusiness className='h-6 w-6' />,
    roles: ['super admin'],
    children: [
      {
        id: 'sites_list',
        label: 'sites_list',
        url: '/dashboard/sites/list',
        roles: ['super admin'],
      },
      {
        id: 'manage_sites',
        label: 'manage_sites',
        url: '/dashboard/sites/manage',
        roles: ['super admin'],
      },
    ],
  },
  {
    id: 'reports',
    label: 'reports',
    icon: <FaClipboardList className='h-6 w-6' />,
    roles: ['super admin', 'admin', 'assistant'],
    children: [
      {
        id: 'client_report',
        label: 'client_report',
        url: '/dashboard/reports/clients',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'appointment_report',
        label: 'appointment_report',
        url: '/dashboard/reports/appointments',
        roles: ['super admin', 'admin', 'assistant'],
      },
    ],
  },
  {
    id: 'administration',
    label: 'administration',
    icon: <MdAdminPanelSettings className='h-6 w-6' />,
    roles: ['super admin', 'admin', 'assistant'],
    children: [
      {
        id: 'profile',
        label: 'profile',
        url: '/dashboard/administration/profile',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'change_password',
        label: 'change_password',
        url: '/dashboard/administration/password',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'email_templates',
        label: 'email_templates',
        url: '/dashboard/administration/email',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'whatsapp_templates',
        label: 'whatsapp_templates',
        url: '/dashboard/administration/whatsapp',
        roles: ['super admin', 'admin', 'assistant'],
      },
      {
        id: 'business_data',
        label: 'business_data',
        url: '/dashboard/administration/business',
        roles: ['super admin', 'admin'],
      },
    ],
  },
  {
    id: 'templates',
    label: 'templates',
    icon: <LuLayoutTemplate className="h-6 w-6" />,
    roles: ['super admin', 'admin'],
    children: [
      {
        id: 'admin_template',
        label: 'admin_template',
        url: '/dashboard/templates/manage',
        roles: ['super admin', 'admin'],
      },
    ],
  },
  ];
  
