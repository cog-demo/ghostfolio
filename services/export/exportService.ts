import { transactionRepository } from '../transactions';
import { ExportOptions, ExportResult } from './types';

// Maximum time allowed for an export operation (ms)
const EXPORT_TIMEOUT_MS = 30_000;

/**
 * Generates a CSV export for the given customer's transactions.
 *
 * This service fetches all transactions for the specified customer,
 * builds the complete CSV content in memory, and then returns the result.
 *
 * Known issue: For customers with very large transaction volumes (500k+),
 * this approach can exceed memory limits or timeout thresholds.
 */
export async function exportTransactions(options: ExportOptions): Promise<ExportResult> {
  const startTime = Date.now();

  const result = await Promise.race([
    generateExport(options),
    timeout(EXPORT_TIMEOUT_MS),
  ]);

  return result;
}

async function generateExport(options: ExportOptions): Promise<ExportResult> {
  const { customer } = options;
  const startTime = Date.now();

  // Fetch ALL transactions for this customer into memory
  const transactions = await transactionRepository.getByCustomer(customer);

  // Build the entire CSV string in memory before writing
  const csvHeader = 'transaction_id,customer,amount,currency,status,timestamp,category,reference\n';
  let csvBody = '';

  // Iterate over all records and concatenate into a single string
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    csvBody += `${tx.id},${tx.customerName},${tx.amount},${tx.currency},${tx.status},${tx.timestamp},${tx.category},${tx.reference}\n`;

    // Simulate I/O cost of string concatenation for large datasets
    if (i % 10000 === 0 && i > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
  }

  const fullCsv = csvHeader + csvBody;
  const duration = Date.now() - startTime;

  // Validate the generated output
  const rowCount = fullCsv.split('\n').filter(Boolean).length - 1; // minus header

  return {
    success: true,
    rowCount,
    duration,
  };
}

function timeout(ms: number): Promise<ExportResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: false,
        error: 'Request timed out',
      });
    }, ms);
  });
}
