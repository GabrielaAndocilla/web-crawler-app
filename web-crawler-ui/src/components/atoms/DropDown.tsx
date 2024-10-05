import { SelectHTMLAttributes } from 'react';

const DropDown = <T extends Record<string, string | number>>({
  options,
  keyOption,
  valueOption = keyOption,
  ...res
}: {
  options: T[];
  keyOption: keyof T;
  valueOption?: keyof T;
} & SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...res}
      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-6 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
    >
      {options.map((option, index) => (
        <option key={index} value={option[valueOption]}>
          {option[keyOption]}
        </option>
      ))}
    </select>
  );
};
export default DropDown;
