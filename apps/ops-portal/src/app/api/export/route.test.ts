import { NextRequest } from 'next/server';
import { POST } from './route';

jest.mock('@finserv/services/export/exportService', () => ({
  exportTransactions: jest.fn(),
}));

import { exportTransactions } from '@finserv/services/export/exportService';

const mockedExportTransactions = exportTransactions as jest.MockedFunction<
  typeof exportTransactions
>;

function buildRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/export', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('validation', () => {
    it('should return 400 when customer is missing from the body', async () => {
      const response = await POST(buildRequest({}));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Customer is required');
    });

    it('should return 400 when customer is an empty string', async () => {
      const response = await POST(buildRequest({ customer: '' }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Customer is required');
    });
  });

  describe('successful export', () => {
    it('should return 200 with rowCount on success', async () => {
      mockedExportTransactions.mockResolvedValue({
        success: true,
        rowCount: 42,
      });

      const response = await POST(buildRequest({ customer: 'Acme Corp' }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        rowCount: 42,
        message: 'Download started',
      });
      expect(mockedExportTransactions).toHaveBeenCalledWith({ customer: 'Acme Corp' });
    });

    it('should forward the customer parameter to exportTransactions', async () => {
      mockedExportTransactions.mockResolvedValue({ success: true, rowCount: 0 });

      await POST(buildRequest({ customer: 'Summit Group' }));

      expect(mockedExportTransactions).toHaveBeenCalledTimes(1);
      expect(mockedExportTransactions).toHaveBeenCalledWith({ customer: 'Summit Group' });
    });
  });

  describe('failed export', () => {
    it('should return 500 when exportTransactions reports failure', async () => {
      mockedExportTransactions.mockResolvedValue({
        success: false,
        error: 'Request timed out',
      });

      const response = await POST(buildRequest({ customer: 'Big Co' }));
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Request timed out');
    });
  });

  describe('error handling', () => {
    it('should return 500 when exportTransactions throws', async () => {
      mockedExportTransactions.mockRejectedValue(new Error('Connection refused'));

      const response = await POST(buildRequest({ customer: 'Broken Co' }));
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Request timed out');
    });

    it('should return 500 when request body is not valid JSON', async () => {
      const request = new NextRequest('http://localhost/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not-json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Request timed out');
    });
  });
});
