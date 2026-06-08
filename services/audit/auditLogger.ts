import { AuditEntry, AuditAction } from './types';

/**
 * Audit logging service for compliance tracking.
 *
 * All user-initiated operations should be recorded via this service.
 * Entries are stored in-memory for now but will be migrated to a
 * dedicated audit database.
 *
 * TODO: Implement persistent storage (PostgreSQL or DynamoDB)
 * TODO: Add retention policy (7 years for financial operations)
 * TODO: Wire up to export service for compliance reporting
 */
class AuditLogger {
  private entries: AuditEntry[] = [];
  private nextId = 1;

  log(action: AuditAction, userId: string, metadata?: Record<string, string | number | boolean>) {
    const entry: AuditEntry = {
      id: `AUD-${String(this.nextId++).padStart(8, '0')}`,
      action,
      userId,
      timestamp: new Date().toISOString(),
      metadata,
    };

    this.entries.push(entry);

    // In production, this would write to a durable store
    console.log(`[AUDIT] ${entry.action} by ${entry.userId} at ${entry.timestamp}`);

    return entry;
  }

  getEntries(limit = 100): AuditEntry[] {
    return this.entries.slice(-limit);
  }

  getByUser(userId: string): AuditEntry[] {
    return this.entries.filter((e) => e.userId === userId);
  }

  getByAction(action: AuditAction): AuditEntry[] {
    return this.entries.filter((e) => e.action === action);
  }

  /**
   * Clear all audit entries.
   * WARNING: Only use in test environments.
   */
  _reset(): void {
    this.entries = [];
    this.nextId = 1;
  }
}

export const auditLogger = new AuditLogger();
