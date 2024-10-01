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

import { deleteUser, getUsers } from '../../services/usersService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/[lng]/components/ui/tableClient';
import { UserDatum } from '@/types/usersResponse';
import { usersColumns } from './Columns';
import PaginationControls from '../PaginationControllers';
import { ColumnToggle } from '../ColumnToggle';
import { useTranslation } from '@/i18n/client';
import FilterInput from '../FilterInput';
import { toast } from 'react-toastify';
import NewUserDialog from './NewUserDialog';
import DatePicker from '../DatePicker';
import SkeletonRows from '../SkeletonRows';
import { DropMenuStatus } from '@/[lng]/components/Site/Table/DropMenuStatus';

export default function UserTable({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'users');
  const [data, setData] = useState([] as UserDatum[]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValues, setFilterValues] = useState({
    username: '',
    role: '',
    status: undefined,
    createdAt: '',
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

  useEffect(() => {
    const newFilters = Object.keys(debouncedFilterValues)
      .filter((key) => debouncedFilterValues[key as keyof typeof debouncedFilterValues] !== undefined)
      .map((key) => ({
        id: key,
        value: debouncedFilterValues[key as keyof typeof debouncedFilterValues],
      }));
    setFilters(newFilters as ColumnFiltersState);
  }, [debouncedFilterValues]);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteUser(id);
      if (response.message) {
        toast.success(response.message, { autoClose: 2000 });
      }
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        autoClose: 2000,
      });
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const filterObj = filters.reduce(
      (acc, filter) => {
        if (
          filter.id === 'username' ||
          filter.id === 'role' ||
          filter.id === 'status' ||
          filter.id === 'createdAt'
        ) {
          acc[filter.id] = String(filter.value);
        }
        return acc;
      },
      {} as {
        username?: string;
        role?: string;
        status?: string;
        createdAt?: string;
      }
    );

    try {
      const response = await getUsers(
        pagination.pageIndex + 1,
        pagination.pageSize,
        filterObj
      );
      setData(response.UsersPaginated.data);
      setPageCount(response.UsersPaginated.totalPages);
    } catch (error) {
      toast.error(error as any, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, filters, fetchData]);

  const columns = usersColumns({ handleDelete, reloadData: fetchData, lng });

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
        <h1 className='text-xl'>{t('manage')}</h1>
        <NewUserDialog lng={lng} reloadData={fetchData} />
      </div>
      <div className='flex gap-y-4 flex-col sm:flex-row sm:gap-4'>
        <ColumnToggle table={table} lng={lng} />
      </div>
      <div className='mt-2 overflow-hidden rounded-md border border-text-primary dark:border-2 dark:border-dark-text-secondary'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div className='my-2 flex flex-col items-start justify-start gap-1'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.id === 'status' ? (
                            <DropMenuStatus
                              lng={lng}
                              filterValue={table.getColumn('status')?.getFilterValue() as boolean | undefined}
                              setFilterValue={(value) => table.getColumn('status')?.setFilterValue(value)}
                            />
                          ) : header.column.getCanFilter() ? (
                            header.column.id === 'createdAt' ? (
                              <DatePicker
                                onChange={handleDateChange}
                                lng={lng}
                                type='users'
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
                                type='users'
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
