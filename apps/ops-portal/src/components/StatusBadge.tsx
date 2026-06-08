import { TransactionStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: TransactionStatus;
}

const statusStyles: Record<TransactionStatus, string> = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  processing: 'bg-blue-100 text-blue-800',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
