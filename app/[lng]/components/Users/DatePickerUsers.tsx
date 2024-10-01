'use client';

import { cn } from '@/utils/utils';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popoverClient';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendarClient';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from '@/i18n/client';

export default function DatePickerUsers({
  onChange,
  lng,
}: {
  onChange: (date: Date | undefined) => void;
  lng: string;
}) {
  const [date, setDate] = useState<Date>();
  const { t } = useTranslation(lng, 'users');

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex max-w-sm items-center gap-2 rounded border-0 bg-bg-primary-opacity p-2 text-left text-sm font-normal text-text-primary placeholder:text-text-primary dark:bg-dark-primary dark:text-dark-text-primary dark:placeholder-dark-text-secondary',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'PPP') : <span>{t('filter_by_createdAt')}</span>}
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
  );
}
