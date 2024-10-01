"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/[lng]/components/ui/sites/dropdown-menu";
import { Button } from "@/[lng]/components/ui/sites/buttonSites";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/client";
import * as React from "react";

interface DropMenuStatusProps {
  lng: string;
  filterValue: boolean | undefined;
  setFilterValue: (value: boolean | undefined) => void;
}

export const DropMenuStatus: React.FC<DropMenuStatusProps> = ({
  lng,
  filterValue,
  setFilterValue,
}) => {
  const { t } = useTranslation(lng, 'sites');

  const getLabel = () => {
    if (filterValue === true) return t('active');
    if (filterValue === false) return t('inactive');
    return t('all');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-white text-text-primary border border-slate-400 dark:border-slate-400 dark:bg-dark-text-secondary dark:text-dark-text-primary">
        <Button variant="outline" className="sm:ml-auto my-3 sm:my-0 sm:mr-1 font-normal hover:bg-bg-primary-opacity hover:text-text-primary">
          {getLabel()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-dark-primary">
        <DropdownMenuCheckboxItem
          checked={filterValue === true}
          onCheckedChange={(value) =>
            setFilterValue(value ? true : undefined)
          }
        >
          {t('active')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={filterValue === false}
          onCheckedChange={(value) =>
            setFilterValue(value ? false : undefined)
          }
        >
          {t('inactive')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={filterValue === undefined}
          onCheckedChange={() => setFilterValue(undefined)}
        >
          {t('all')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
