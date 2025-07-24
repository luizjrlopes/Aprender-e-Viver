import { ReactNode } from 'react';

interface Props {
  message: ReactNode;
}

export default function Toast({ message }: Props) {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded">
      {message}
    </div>
  );
}
