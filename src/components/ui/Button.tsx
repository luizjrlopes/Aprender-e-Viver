import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = '', ...rest }: Props) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
