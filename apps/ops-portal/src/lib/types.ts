export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'processing';

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: TransactionStatus;
  timestamp: string;
  category?: string;
  reference?: string;
}

export interface ExportRequest {
  customer: string;
  startDate?: string;
  endDate?: string;
}

export interface ExportResult {
  success: boolean;
  rowCount?: number;
  error?: string;
}
