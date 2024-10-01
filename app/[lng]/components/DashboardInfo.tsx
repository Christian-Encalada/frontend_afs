'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';
import { useAuth } from '../contexts/AuthContext';

const DashboardInfoComponent: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'login');
  const { user } = useAuth();

  return <div>user: {user?.username}</div>;
};

export default DashboardInfoComponent;
