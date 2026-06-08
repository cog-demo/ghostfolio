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

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    const filename = `transactions-${customer.replace(/\s+/g, '_').toLowerCase()}.csv`;

    return new Response(result.csvContent, {
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
