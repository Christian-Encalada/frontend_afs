'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useDebounce } from 'use-debounce';

import { getClients } from '../../services/clientsService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/tableClient';
import { Datum } from '@/types/clientsResponse';
import { clientsColumns } from './Columns';
import PaginationControls from '../PaginationControllers';
import { ColumnToggle } from '../ColumnToggle';
import { useTranslation } from '@/i18n/client';
import FilterInput from '../FilterInput';
import { toast } from 'react-toastify';
import NewClientDialog from './NewClientDialog';
import DatePicker from '../DatePicker';
import SkeletonRows from '../SkeletonRows';
import CantonFilter from '../CantonFilter';

export default function ClientTable({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'clients');
  const [data, setData] = useState([] as Datum[]);
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValues, setFilterValues] = useState({
    name: '',
    lastName: '',
    document: '',
    createdAt: '',
    cantonName: '',
  });
  const [debouncedFilterValues] = useDebounce(filterValues, 300);

  const handleCantonSelect = (cantonName: string) => {
    setFilterValues({
      ...filterValues,
      cantonName: cantonName,
    });
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : '';
    setFilterValues({
      ...filterValues,
      createdAt: formattedDate,
    });
  };

  useEffect(() => {
    const newFilters = Object.keys(debouncedFilterValues).map((key) => ({
      id: key,
      value: debouncedFilterValues[key as keyof typeof debouncedFilterValues],
    }));
    setFilters(newFilters as ColumnFiltersState);
  }, [debouncedFilterValues]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const filterObj = filters.reduce(
      (acc, filter) => {
        if (
          filter.id === 'name' ||
          filter.id === 'lastName' ||
          filter.id === 'document' ||
          filter.id === 'createdAt' ||
          filter.id === 'cantonName'
        ) {
          acc[filter.id] = filter.value as string | undefined;
        }
        return acc;
      },
      {} as {
        name?: string;
        lastName?: string;
        document?: string;
        createdAt?: string;
        cantonName?: string;
      }
    );
    try {
      const response = await getClients(
        pagination.pageIndex + 1,
        pagination.pageSize,
        filterObj
      );
      setData(response.ClientsPaginated.data);
      setPageCount(response.ClientsPaginated.totalPages);
    } catch (error) {
      toast.error(error as any, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  useEffect(() => {
    if (filters.length > 0) {
      fetchData();
    }
  }, [pagination.pageIndex, pagination.pageSize, filters, fetchData]);

  const columns = clientsColumns({ reloadData: fetchData, lng });

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    pageCount: pageCount,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    state: { pagination, sorting, columnFilters: filters },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  return (
    <>
      <div className='mb-5 flex items-center justify-between'>
        <h1 className='text-base sm:text-xl'>{t('manage')}</h1>
        <NewClientDialog lng={lng} reloadData={fetchData} />
      </div>
      <div className='flex'>
        <ColumnToggle table={table} lng={lng} />
      </div>
      <div className='mt-2 overflow-hidden rounded-md border border-text-primary border-opacity-40 dark:border-dark-text-secondary'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`my-2 flex flex-col items-start justify-start gap-1 text-nowrap ${header.id === 'direction' ? 'w-56' : ''}`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            header.column.id === 'createdAt' ? (
                              <DatePicker
                                type='clients'
                                onChange={handleDateChange}
                                lng={lng}
                              />
                            ) : header.column.id === 'canton_name' ? (
                              <CantonFilter
                                onSelect={handleCantonSelect}
                                lng={lng}
                              />
                            ) : (
                              <FilterInput
                                id={header.column.id}
                                placeholder={t(
                                  `filter_by_${header.column.id}` as any
                                )}
                                value={
                                  filterValues[
                                    header.column
                                      .id as keyof typeof filterValues
                                  ] as string
                                }
                                type='clients'
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
          {loading ? (
            <SkeletonRows rows={7} columns={columns.length} />
          ) : data.length > 0 ? (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div
                        className={`${cell.id === '3_direction' ? 'w-56 text-pretty' : ''}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {t('no_data')}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <PaginationControls table={table} lng={lng} />
    </>
  );
}
