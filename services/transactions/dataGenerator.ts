import { TransactionRecord } from './types';

/**
 * Generates synthetic transaction data for a given customer.
 *
 * Dataset sizes are calibrated to real-world volumes:
 * - Small customers: ~50 transactions
 * - Medium customers: ~500 transactions
 * - Enterprise customers (Acme Capital): ~500,000 transactions
 *
 * This simulates the data distribution we see in production where
 * a handful of enterprise clients represent 80% of transaction volume.
 */

const CUSTOMER_SIZES: Record<string, number> = {
  'Acme Capital': 500_000,
  'Meridian Holdings': 500,
  'Pinnacle Finance': 120,
  'Oakwood Ventures': 45,
  'Summit Group': 80,
};

const CATEGORIES = [
  'wire_transfer',
  'ach_payment',
  'check_deposit',
  'internal_transfer',
  'fee_payment',
  'dividend_distribution',
  'loan_disbursement',
  'settlement',
];

const STATUSES: TransactionRecord['status'][] = ['completed', 'pending', 'failed', 'processing'];

export function generateTransactions(customerName: string): TransactionRecord[] {
  const count = CUSTOMER_SIZES[customerName] ?? 50;
  const transactions: TransactionRecord[] = [];

  // Use a seeded approach for consistent data
  let seed = hashString(customerName);

  for (let i = 0; i < count; i++) {
    seed = nextSeed(seed);
    const amount = (seed % 1_000_000) / 100;

    seed = nextSeed(seed);
    const statusIndex = seed % STATUSES.length;

    seed = nextSeed(seed);
    const categoryIndex = seed % CATEGORIES.length;

    seed = nextSeed(seed);
    const dayOffset = seed % 365;
    const hourOffset = seed % 24;

    const timestamp = new Date(2024, 0, 1 + dayOffset, hourOffset, seed % 60);

    transactions.push({
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      customerId: customerName.toLowerCase().replace(/\s+/g, '-'),
      customerName,
      amount,
      currency: 'USD',
      status: STATUSES[statusIndex],
      timestamp: timestamp.toISOString(),
      category: CATEGORIES[categoryIndex],
      reference: `REF-${customerName.substring(0, 3).toUpperCase()}-${String(i).padStart(8, '0')}`,
    });
  }

  return transactions;
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function nextSeed(seed: number): number {
  // Simple LCG for deterministic pseudo-random numbers
  return Math.abs((seed * 1664525 + 1013904223) & 0x7fffffff);
}
