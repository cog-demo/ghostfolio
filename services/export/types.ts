export interface ExportOptions {
  customer: string;
  startDate?: string;
  endDate?: string;
  format?: 'csv' | 'json';
}

export interface ExportResult {
  success: boolean;
  rowCount?: number;
  csvContent?: string;
  filePath?: string;
  error?: string;
  duration?: number;
}
