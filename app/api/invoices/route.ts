import { NextRequest, NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';
import { Invoice } from '@/lib/types';

export async function GET() {
  try {
    const data = await readJSONFile<{ invoices: Invoice[] }>('invoices.json');
    return NextResponse.json(data.invoices);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readJSONFile<{ invoices: Invoice[] }>('invoices.json');
    
    const newInvoice: Invoice = {
      id: (data.invoices.length + 1).toString(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(data.invoices.length + 1).padStart(3, '0')}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    data.invoices.push(newInvoice);
    await writeJSONFile('invoices.json', data);
    
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readJSONFile<{ invoices: Invoice[] }>('invoices.json');
    
    const index = data.invoices.findIndex(i => i.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }
    
    data.invoices[index] = { ...data.invoices[index], ...body };
    await writeJSONFile('invoices.json', data);
    
    return NextResponse.json(data.invoices[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Invoice ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readJSONFile<{ invoices: Invoice[] }>('invoices.json');
    data.invoices = data.invoices.filter(i => i.id !== id);
    await writeJSONFile('invoices.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}
