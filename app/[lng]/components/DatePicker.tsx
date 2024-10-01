'use client';

import { cn } from '@/utils/utils';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popoverClient';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendarClient';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from '@/i18n/client';

export default function DatePicker({
  onChange,
  type,
  lng,
}: {
  onChange: (date: Date | undefined) => void;
  lng: string;
  type: string;
}) {
  const [date, setDate] = useState<Date>();
  const { t } = useTranslation(lng, type as any);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  const clearDate = () => {
    setDate(undefined);
    onChange(undefined);
  };

  return (
    <div className='flex'>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              `${type === 'sites' ? 'hover:bg-bg-primary-opacity hover:text-text-primary dark:hover:bg-dark-primary dark:hover:text-slate-50' : ''} flex w-full -ml-2 max-w-sm min-w-sm items-center gap-2 rounded border border-slate-400 bg-white p-2 text-left text-sm font-normal text-text-primary placeholder:text-text-primary dark:bg-dark-text-secondary dark:text-dark-text-primary dark:placeholder-dark-text-primary`,
              !date && 'text-muted-foreground sm:w-40 '
            )}
          >
            {date ? (
              format(date, 'PPP', { locale: lng === 'es' ? es : enUS })
            ) : (
              <span>{t('filter_by_createdAt')}</span>
            )}
            <CalendarIcon className='mr-2 h-4 w-4' />
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            locale={lng === 'es' ? es : enUS}
            mode='single'
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date && (
        <button
          onClick={clearDate}
          className='flex items-center justify-center p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600'
          aria-label='Clear date'
        >
          <XCircleIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}
