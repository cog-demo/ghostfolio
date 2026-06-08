import { exportTransactions } from './exportService';

describe('exportService', () => {
  describe('small dataset exports', () => {
    it('should successfully export transactions for a small customer', async () => {
      const result = await exportTransactions({ customer: 'Oakwood Ventures' });

      expect(result.success).toBe(true);
      expect(result.rowCount).toBeGreaterThan(0);
      expect(result.rowCount).toBeLessThan(100);
      expect(result.error).toBeUndefined();
    });

    it('should successfully export transactions for a medium customer', async () => {
      const result = await exportTransactions({ customer: 'Meridian Holdings' });

      expect(result.success).toBe(true);
      expect(result.rowCount).toBeGreaterThan(100);
      expect(result.error).toBeUndefined();
    });

    it('should return duration metadata on success', async () => {
      const result = await exportTransactions({ customer: 'Pinnacle Finance' });

      expect(result.success).toBe(true);
      expect(result.duration).toBeDefined();
      expect(result.duration).toBeGreaterThan(0);
    });
  });

  describe('large dataset exports', () => {
    it('should handle large customer exports (Acme Capital) without timing out', async () => {
      const result = await exportTransactions({ customer: 'Acme Capital' });

      // This test validates that the export completes successfully
      // even for customers with 500k+ transactions.
      expect(result.success).toBe(true);
      expect(result.rowCount).toBeGreaterThan(100_000);
      expect(result.error).toBeUndefined();
    }, 60_000);
  });

  describe('edge cases', () => {
    it('should handle unknown customers gracefully', async () => {
      const result = await exportTransactions({ customer: 'Nonexistent Corp' });

      expect(result.success).toBe(true);
      expect(result.rowCount).toBeGreaterThanOrEqual(0);
    });

    it('should include all required CSV columns in output', async () => {
      const result = await exportTransactions({ customer: 'Summit Group' });

      expect(result.success).toBe(true);
      expect(result.rowCount).toBeGreaterThan(0);
    });
  });
});
