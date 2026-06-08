import { TransactionFilter } from '../types';

/**
 * Validate transaction filter parameters.
 *
 * Returns an array of error messages, empty if valid.
 */
export function validateFilter(filter: TransactionFilter): string[] {
  const errors: string[] = [];

  if (filter.startDate && isNaN(Date.parse(filter.startDate))) {
    errors.push('Invalid startDate format. Expected ISO 8601.');
  }

  if (filter.endDate && isNaN(Date.parse(filter.endDate))) {
    errors.push('Invalid endDate format. Expected ISO 8601.');
  }

  if (filter.startDate && filter.endDate) {
    if (new Date(filter.startDate) > new Date(filter.endDate)) {
      errors.push('startDate must be before endDate.');
    }
  }

  if (filter.minAmount !== undefined && filter.minAmount < 0) {
    errors.push('minAmount must be non-negative.');
  }

  if (filter.maxAmount !== undefined && filter.maxAmount < 0) {
    errors.push('maxAmount must be non-negative.');
  }

  if (
    filter.minAmount !== undefined &&
    filter.maxAmount !== undefined &&
    filter.minAmount > filter.maxAmount
  ) {
    errors.push('minAmount must be less than or equal to maxAmount.');
  }

  return errors;
}
