import { FilterInputProps } from '@/types/table';

export default function FilterInput({
  id,
  placeholder,
  value,
  type,
  onChange,
}: FilterInputProps) {
  return (
    <input
      type='text'
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className= '-ml-2 w-40 rounded border border-slate-400 bg-white p-2 text-sm text-text-primary placeholder:font-normal placeholder:text-slate-400 dark:bg-dark-text-secondary dark:text-dark-text-primary dark:placeholder-dark-text-primary'
    />
  );
}
