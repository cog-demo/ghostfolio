import { Transaction } from './types';

/**
 * Static transaction data for the ops-portal UI.
 * In production this would come from the transaction service API.
 */
export const transactions: Transaction[] = [
  {
    id: 'TXN-001842',
    customer: 'Meridian Holdings',
    amount: 45200.0,
    status: 'completed',
    timestamp: '2024-03-15T09:23:00Z',
  },
  {
    id: 'TXN-001843',
    customer: 'Acme Capital',
    amount: 128750.5,
    status: 'completed',
    timestamp: '2024-03-15T09:45:00Z',
  },
  {
    id: 'TXN-001844',
    customer: 'Pinnacle Finance',
    amount: 8900.0,
    status: 'pending',
    timestamp: '2024-03-15T10:02:00Z',
  },
  {
    id: 'TXN-001845',
    customer: 'Acme Capital',
    amount: 340000.0,
    status: 'completed',
    timestamp: '2024-03-15T10:15:00Z',
  },
  {
    id: 'TXN-001846',
    customer: 'Oakwood Ventures',
    amount: 22100.75,
    status: 'completed',
    timestamp: '2024-03-15T10:30:00Z',
  },
  {
    id: 'TXN-001847',
    customer: 'Meridian Holdings',
    amount: 67500.0,
    status: 'processing',
    timestamp: '2024-03-15T11:00:00Z',
  },
  {
    id: 'TXN-001848',
    customer: 'Acme Capital',
    amount: 891200.0,
    status: 'completed',
    timestamp: '2024-03-15T11:22:00Z',
  },
  {
    id: 'TXN-001849',
    customer: 'Summit Group',
    amount: 15400.0,
    status: 'failed',
    timestamp: '2024-03-15T11:45:00Z',
  },
  {
    id: 'TXN-001850',
    customer: 'Acme Capital',
    amount: 2450000.0,
    status: 'completed',
    timestamp: '2024-03-15T12:00:00Z',
  },
  {
    id: 'TXN-001851',
    customer: 'Pinnacle Finance',
    amount: 33200.0,
    status: 'completed',
    timestamp: '2024-03-15T12:15:00Z',
  },
  {
    id: 'TXN-001852',
    customer: 'Acme Capital',
    amount: 178500.0,
    status: 'pending',
    timestamp: '2024-03-15T12:30:00Z',
  },
  {
    id: 'TXN-001853',
    customer: 'Oakwood Ventures',
    amount: 4500.0,
    status: 'completed',
    timestamp: '2024-03-15T13:00:00Z',
  },
];
