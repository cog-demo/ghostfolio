import { Transaction } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { formatCurrency, formatTimestamp } from '@/lib/formatters';

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-900">
                {tx.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{tx.customer}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatCurrency(tx.amount)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <StatusBadge status={tx.status} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {formatTimestamp(tx.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">No transactions found.</div>
      )}
    </div>
  );
}
