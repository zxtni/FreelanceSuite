import { NextRequest, NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';
import { Client } from '@/lib/types';

export async function GET() {
  try {
    const data = await readJSONFile<{ clients: Client[] }>('clients.json');
    return NextResponse.json(data.clients);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readJSONFile<{ clients: Client[] }>('clients.json');
    
    const newClient: Client = {
      id: (data.clients.length + 1).toString(),
      ...body,
      totalProjects: 0,
      totalRevenue: 0,
      createdAt: new Date().toISOString(),
    };
    
    data.clients.push(newClient);
    await writeJSONFile('clients.json', data);
    
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readJSONFile<{ clients: Client[] }>('clients.json');
    
    const index = data.clients.findIndex(c => c.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }
    
    data.clients[index] = { ...data.clients[index], ...body };
    await writeJSONFile('clients.json', data);
    
    return NextResponse.json(data.clients[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update client' },
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
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readJSONFile<{ clients: Client[] }>('clients.json');
    data.clients = data.clients.filter(c => c.id !== id);
    await writeJSONFile('clients.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
