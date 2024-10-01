'use client';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/[lng]/components/ui/sites/tableSites';

import { useCallback, useEffect, useState } from 'react';
import FilterInput from "@/[lng]/components/FilterInput";
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from '@/i18n/client';
import { DropMenuStatus } from '@/[lng]/components/Site/Table/DropMenuStatus';
import { SearchX } from 'lucide-react';
import PaginationControls from '@/[lng]/components/PaginationControllers';
import DatePicker from '@/[lng]/components/DatePicker';
import SkeletonRows from '@/[lng]/components/SkeletonRows';
import { useDebounce } from 'use-debounce';
import { getSites } from '@/[lng]/services/siteService';
import { SiteDatum } from '@/types/sitesResponse';
import { siteAllColumns } from '@/[lng]/components/Site/Table/AllColumns';
import NewSiteDialog from '@/[lng]/components/Site/NewSiteDialog';

interface DataTableProps<TData, TValue> {
  lng: string;
  type: string;
}

export function SiteTable<TData, TValue>({
  lng,
  type,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation(lng, 'sites');

  const [sites, setSites] = useState([] as SiteDatum[]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState({
    name: '',
    createdAt: '',
    status: undefined as boolean | undefined,
  });
  const [debouncedFilterValues] = useDebounce(filterValues, 300);

  
  const handleDateChange = (selectedDate: Date | undefined) => {
    const formattedDate = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : '';
    setFilterValues({
      ...filterValues,
      createdAt: formattedDate,
    });
  };
  
  const handleStatusFilterChange = (status: boolean | undefined) => {
    setFilterValues(prev => ({
      ...prev,
      status,
    }));    
  }
  

  useEffect(() => {
    const newFilters = Object.keys(debouncedFilterValues).map((key) => ({
      id: key,
      value: debouncedFilterValues[key as keyof typeof debouncedFilterValues],
    }));
    setFilters(newFilters as ColumnFiltersState);
  }, [debouncedFilterValues]);

  const fetchSites = useCallback(async () => {
    setIsTableLoading(true);
    try {
      const filterObj = filters.reduce(
        (acc, filter) => {
          if (filter.id === 'name' || filter.id === 'createdAt') {
            acc[filter.id] = filter.value as string | undefined;
          } else if (filter.id === 'status') {
            acc[filter.id] = filter.value as boolean | undefined;
          }
          return acc;
        },
        {} as { name?: string; createdAt?: string; status?: boolean }
      );

      const response = await getSites(
        pagination.pageIndex + 1,
        pagination.pageSize,
        filterObj
      );
      
      // Thanks to Stiven for help <3
      setSites(response.SitePaginated.data);
      setPageCount(response.SitePaginated.totalPages);
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setIsTableLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  useEffect(() => {
      if (filters.length > 0) {
        fetchSites();
      }
  }, [pagination.pageIndex, pagination.pageSize, filters, fetchSites]);

  const formatLocale = lng === 'es' ? es : enUS;

  const columns = siteAllColumns({ reloadData: fetchSites, lng, type});

  const table = useReactTable({
    data: sites,
    columns,
    manualPagination: true,
    pageCount,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setFilters,
    state: {
      sorting,
      columnFilters: filters,
      pagination,
    },
  });

  return (
    <div>
      {type === 'manage' && (
        <div className='mb-7 flex flex-col items-center gap-5 sm:flex-row sm:gap-0 sm:mb-10 sm:justify-between'>
          <h1 className='text-xl'>{t('layout_title_manage')}</h1>
          <NewSiteDialog lng={lng} reloadData={fetchSites} />
        </div>
      )}
      <div className="overflow-hidden rounded-md border border-text-primary dark:border-2 dark:border-dark-text-secondary">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`my-2 flex flex-col items-start justify-start gap-1 text-nowrap ${
                            header.id === 'direction' ? 'w-56' : ''
                          }`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            header.column.id === 'createdAt' ? (
                              <DatePicker
                                type='sites'
                                onChange={handleDateChange}
                                lng={lng}
                              />
                            ) : header.column.id === 'status' ? (
                              <DropMenuStatus
                                lng={lng}
                                filterValue={
                                  table.getColumn('status')?.getFilterValue() as
                                    | boolean
                                    | undefined
                                }
                                setFilterValue={(value) => handleStatusFilterChange(value)}
                              />
                            ) : (
                              <FilterInput
                                id={header.column.id}
                                placeholder={t(`filter_by_${header.column.id}` as any)}
                                value={
                                  filterValues[
                                    header.column.id as keyof typeof filterValues
                                  ] as string
                                }
                                type='sites'
                                onChange={(event) =>
                                  setFilterValues({
                                    ...filterValues,
                                    [header.column.id]: event.target.value,
                                  })
                                }
                              />
                            )
                          ) : null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isTableLoading ? (
            <SkeletonRows rows={7} columns={columns.length} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === 'createdAt'
                          ? format(
                              new Date(cell.getValue() as string),
                              'dd/MM/yyyy',
                              { locale: formatLocale }
                            )
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    <div className='flex items-center justify-center'>
                      {t('not_results')}
                      <SearchX className='ml-2 h-4 w-4' />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <PaginationControls table={table} lng={lng} />
    </div>
  );
}
