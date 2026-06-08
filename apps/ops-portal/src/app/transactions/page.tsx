'use client';

import { useState } from 'react';
import { TransactionTable } from '@/components/TransactionTable';
import { ExportDialog } from '@/components/ExportDialog';
import { transactions } from '@/lib/data';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());

    const txDate = tx.timestamp.slice(0, 10);
    const afterStart = !startDate || txDate >= startDate;
    const beforeEnd = !endDate || txDate <= endDate;

    return matchesSearch && afterStart && beforeEnd;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and export transaction records across all customers.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="startDate" className="text-sm text-gray-600">
            From
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="endDate" className="text-sm text-gray-600">
            To
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setShowExportDialog(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export CSV
          </button>
        </div>
      </div>

      <TransactionTable transactions={filteredTransactions} />

      {showExportDialog && (
        <ExportDialog
          onClose={() => setShowExportDialog(false)}
          customers={[...new Set(transactions.map((tx) => tx.customer))]}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
}
