import { MouseEventHandler } from 'react';

const Button = ({
  type,
  children,
  onClick,
}: {
  type: 'submit' | 'reset' | 'button' | undefined;
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type={type}
      className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
