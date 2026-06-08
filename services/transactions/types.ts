export interface TransactionRecord {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  timestamp: string;
  category: string;
  reference: string;
  metadata?: Record<string, string>;
}

export interface TransactionFilter {
  customerId?: string;
  customerName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
