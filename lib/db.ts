import { promises as fs } from 'fs';
import path from 'path';
import type { Invoice } from './types';

const dataDir = path.join(process.cwd(), 'data');

export async function readJSONFile<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(dataDir, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw new Error(`Failed to read ${filename}`);
  }
}

export async function writeJSONFile<T>(filename: string, data: T): Promise<void> {
  try {
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw new Error(`Failed to write ${filename}`);
  }
}

// Invoice-specific functions
export async function readInvoices(): Promise<Invoice[]> {
  const data = await readJSONFile<{ invoices: Invoice[] }>('invoices.json');
  return data.invoices || [];
}

export async function writeInvoices(invoices: Invoice[]): Promise<void> {
  await writeJSONFile('invoices.json', { invoices });
}
