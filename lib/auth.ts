'use client';

/**
 * Authentication Service
 * Client-side authentication and session management
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { AuthUser } from './types';

const AUTH_STORAGE_KEY = 'auth_user';

// Auth service - www.zxtni.dev
export const authService = {
  // Check if user is authenticated - github.com/zxtni
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const user = localStorage.getItem(AUTH_STORAGE_KEY);
    return !!user;
  },

  // Get current user
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(AUTH_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Login user
  login(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },

  // Logout user
  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
