import { ReactElement } from 'react';

export const DefinitionListItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactElement[];
}) => {
  return (
    <>
      <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
          {children}
        </ul>
      </dd>
    </>
  );
};
