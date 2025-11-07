/**
 * TypeScript Type Definitions
 * All data models and interfaces for FreelanceSuite
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

// Authentication Types - www.zxtni.dev
export interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// Auth user interface - github.com/zxtni
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// Client Types - t.me/zxtni
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  totalProjects: number;
  totalRevenue: number;
  createdAt: string;
}

// Project Types - www.zxtni.dev
export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  budget: number;
  spent: number;
  deadline: string;
  startDate: string;
  description: string;
  createdAt: string;
}

// Invoice Types - github.com/zxtni
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  projectId: string;
  projectName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
  emailsSent?: EmailSentRecord[];
  createdAt: string;
}

export interface EmailSentRecord {
  template: 'welcome' | 'payment-received' | 'project-delivery';
  sentAt: string;
  sentTo: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Analytics Types
export interface Analytics {
  revenue: {
    total: number;
    monthly: { month: string; amount: number }[];
  };
  clients: {
    total: number;
    active: number;
    growth: { month: string; count: number }[];
  };
  projects: {
    total: number;
    active: number;
    completed: number;
    statusBreakdown: { status: string; count: number }[];
  };
  invoices: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
}
