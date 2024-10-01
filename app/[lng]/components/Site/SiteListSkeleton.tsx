"use client"

import { useTranslation } from '@/i18n/client';
import React from 'react';

interface SiteListSkeletonTypes<TData, TValue> {
  rows: number;
  columns: number;
  lng: string;
  type?: string;
}

export function SiteListSkeleton<TData, TValue>({
  rows,
  columns,
  lng,
  type = 'list',
}: SiteListSkeletonTypes<TData, TValue>) {

  const { t } = useTranslation(lng, 'sites');

  return (
    <div className="animate-pulse p-2">
      <div className="items-center py-4 sm:flex sm:flex-row">
        {type === 'manage' ? (
            <h1 className='text-xl'>{t('layout_title_manage')}</h1>
          ) : ( 
            <h1 className='text-xl'>{t('layout_title_list')}</h1>
          )}
        <div className="max-w-xs mb-2 sm:mb-0">
        </div>
        <div className="ml-1 my-4 sm:ml-auto sm:my-0">
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
      <div className='overflow-x-auto rounded-lg'>
        <table className='min-w-full text-text-primary bg-gray-100 dark:bg-dark-primary dark:text-text-secondary rounded-lg'>
          <thead className='bg-bg-primary-opacity dark:bg-dark-primary'>
            <tr>
              {[...Array(columns)].map((_, index) => (
                <th key={index} className='px-6 py-3 text-left text-sm font-extrabold uppercase tracking-wider'>
                  <div className='h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded'></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-700 rounded-lg'>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex} className='border-b border-gray-200 dark:border-gray-600'>
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex} className='px-6 py-4 whitespace-nowrap'>
                    <div className='h-4 w-full bg-gray-300 dark:bg-gray-600 rounded'></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
