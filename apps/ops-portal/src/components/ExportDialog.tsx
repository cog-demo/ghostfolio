'use client';

import { useState } from 'react';

interface ExportDialogProps {
  onClose: () => void;
  customers: string[];
}

type ExportState = 'idle' | 'loading' | 'success' | 'error';

export function ExportDialog({ onClose, customers }: ExportDialogProps) {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [exportState, setExportState] = useState<ExportState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleExport = async () => {
    if (!selectedCustomer) return;

    setExportState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: selectedCustomer }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        response.headers.get('Content-Disposition')?.match(/filename="(.+)"/)?.[1] ??
        `${selectedCustomer.replace(/\s+/g, '_')}_transactions.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setExportState('success');
    } catch (err) {
      setExportState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Export failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">Export Transactions</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select a customer to export their transaction history as CSV.
        </p>

        <div className="mt-4">
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={exportState === 'loading'}
          >
            <option value="">Select a customer...</option>
            {customers.map((customer) => (
              <option key={customer} value={customer}>
                {customer}
              </option>
            ))}
          </select>
        </div>

        {exportState === 'loading' && (
          <div className="mt-4 rounded-md bg-blue-50 p-3">
            <p className="text-sm text-blue-700">Generating export...</p>
          </div>
        )}

        {exportState === 'success' && (
          <div className="mt-4 rounded-md bg-green-50 p-3">
            <p className="text-sm text-green-700">Export downloaded successfully</p>
          </div>
        )}

        {exportState === 'error' && (
          <div className="mt-4 rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-700">Export failed: {errorMessage}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleExport}
            disabled={!selectedCustomer || exportState === 'loading'}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {exportState === 'loading' ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>
    </div>
  );
}
