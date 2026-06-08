'use client';

import { useState } from 'react';
import { TransactionTable } from '@/components/TransactionTable';
import { ExportDialog } from '@/components/ExportDialog';
import { transactions } from '@/lib/data';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and export transaction records across all customers.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowExportDialog(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Export CSV
        </button>
      </div>

      <TransactionTable transactions={filteredTransactions} />

      {showExportDialog && (
        <ExportDialog
          onClose={() => setShowExportDialog(false)}
          customers={[...new Set(transactions.map((tx) => tx.customer))]}
        />
      )}
    </div>
  );
}
