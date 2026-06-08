import { NextRequest, NextResponse } from 'next/server';
import { exportTransactions } from '@finserv/services/export/exportService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer } = body;

    if (!customer) {
      return NextResponse.json({ error: 'Customer is required' }, { status: 400 });
    }

    const result = await exportTransactions({ customer });

    if (!result.success || !result.csvContent) {
      return NextResponse.json({ error: result.error || 'Export failed' }, { status: 500 });
    }

    const filename = `${customer.replace(/\s+/g, '_')}_transactions.csv`;

    return new NextResponse(result.csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    // TODO: Add structured logging for export failures
    console.error('Export endpoint error:', error);
    return NextResponse.json({ error: 'Request timed out' }, { status: 500 });
  }
}
