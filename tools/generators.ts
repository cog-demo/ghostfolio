/**
 * Mock data generators for local development and testing.
 *
 * These utilities are used by the test suite and dev seeds.
 * Do not use in production code paths.
 *
 * TODO: Add support for generating compliance report data
 * TODO: Add configurable date ranges
 */

export function generateMockData(type: 'transactions' | 'users' | 'reports', count: number) {
  switch (type) {
    case 'transactions':
      return generateTransactionMocks(count);
    case 'users':
      return generateUserMocks(count);
    case 'reports':
      return generateReportMocks(count);
    default:
      throw new Error(`Unknown mock data type: ${type}`);
  }
}

function generateTransactionMocks(count: number) {
  const mocks = [];
  for (let i = 0; i < count; i++) {
    mocks.push({
      id: `MOCK-TXN-${i}`,
      amount: Math.random() * 100000,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    });
  }
  return mocks;
}

function generateUserMocks(count: number) {
  const roles = ['analyst', 'manager', 'admin', 'viewer'];
  const mocks = [];
  for (let i = 0; i < count; i++) {
    mocks.push({
      id: `USR-${String(i).padStart(4, '0')}`,
      name: `User ${i}`,
      role: roles[i % roles.length],
      active: Math.random() > 0.1,
    });
  }
  return mocks;
}

function generateReportMocks(count: number) {
  const types = ['daily_summary', 'weekly_audit', 'monthly_compliance', 'quarterly_review'];
  const mocks = [];
  for (let i = 0; i < count; i++) {
    mocks.push({
      id: `RPT-${String(i).padStart(6, '0')}`,
      type: types[i % types.length],
      generatedAt: new Date(Date.now() - Math.random() * 86400000 * 90).toISOString(),
      status: Math.random() > 0.05 ? 'completed' : 'failed',
    });
  }
  return mocks;
}
