import { HTMLAttributes } from 'react';

const ListElement = ({
  title,
  subtitle,
  ...res
}: {
  title?: string;
  subtitle?: string;
} & HTMLAttributes<HTMLLIElement>) => {
  return (
    <li {...res} className="justify-between gap-x-3 py-2 px-2 text-gray-900 ">
      {title && (
        <p className="text-sm font-semibold leading-6 w-3/4">{title}</p>
      )}
      {subtitle && (
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {subtitle}
        </p>
      )}
    </li>
  );
};

export default ListElement;
