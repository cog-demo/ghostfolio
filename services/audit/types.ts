export type AuditAction =
  | 'export.initiated'
  | 'export.completed'
  | 'export.failed'
  | 'transaction.viewed'
  | 'transaction.updated'
  | 'report.generated'
  | 'user.login'
  | 'user.logout';

export interface AuditEntry {
  id: string;
  action: AuditAction;
  userId: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditFilter {
  userId?: string;
  action?: AuditAction;
  startDate?: string;
  endDate?: string;
}
