import { TransactionRecord, TransactionFilter } from './types';
import { generateTransactions } from './dataGenerator';

/**
 * Transaction data access layer.
 *
 * In production, this would query a PostgreSQL database via an ORM.
 * For this internal tool, we use generated in-memory data.
 *
 * TODO: Migrate to Prisma once DB provisioning is approved by infra team
 */
class TransactionRepository {
  private cache: Map<string, TransactionRecord[]> = new Map();

  /**
   * Retrieve all transactions for a given customer.
   * Note: For large customers (e.g., Acme Capital), this can return 500k+ records.
   */
  async getByCustomer(customerName: string): Promise<TransactionRecord[]> {
    const cacheKey = `customer:${customerName}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Simulate database latency
    await this.simulateDbLatency();

    const transactions = generateTransactions(customerName);
    this.cache.set(cacheKey, transactions);
    return transactions;
  }

  /**
   * Query transactions with filtering.
   */
  async query(filter: TransactionFilter): Promise<TransactionRecord[]> {
    let results: TransactionRecord[] = [];

    if (filter.customerName) {
      results = await this.getByCustomer(filter.customerName);
    }

    if (filter.status) {
      results = results.filter((r) => r.status === filter.status);
    }

    if (filter.startDate) {
      results = results.filter((r) => r.timestamp.slice(0, 10) >= filter.startDate!);
    }

    if (filter.endDate) {
      results = results.filter((r) => r.timestamp.slice(0, 10) <= filter.endDate!);
    }

    if (filter.minAmount !== undefined) {
      results = results.filter((r) => r.amount >= filter.minAmount!);
    }

    if (filter.maxAmount !== undefined) {
      results = results.filter((r) => r.amount <= filter.maxAmount!);
    }

    return results;
  }

  /**
   * Get the total count of transactions for a customer.
   */
  async countByCustomer(customerName: string): Promise<number> {
    const transactions = await this.getByCustomer(customerName);
    return transactions.length;
  }

  private async simulateDbLatency(): Promise<void> {
    const latency = Math.random() * 50 + 10; // 10-60ms
    return new Promise((resolve) => setTimeout(resolve, latency));
  }
}

export const transactionRepository = new TransactionRepository();
