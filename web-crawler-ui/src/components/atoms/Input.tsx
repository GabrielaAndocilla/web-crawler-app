import { InputHTMLAttributes } from 'react';

const Input = ({
  name,
  className,
  ...res
}: {
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...res}
      name={name}
      id={name}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
    />
  );
};
export default Input;
