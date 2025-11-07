import type React from "react"
import type { Metadata } from "next"
import { Outfit, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { PageTransitionProvider } from "@/contexts/page-transition-context"
import { CustomCursor } from "@/components/custom-cursor"
import { Toaster } from "@/components/ui/sonner"

/**
 * FreelanceSuite - Root Layout
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 * 
 * © 2025 FreelanceSuite - All Rights Reserved
 */

const _outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

// Created by: www.zxtni.dev | github.com/zxtni | t.me/zxtni
export const metadata: Metadata = {
  title: "Zxtni - Freelance Management System",
  description: "Manage clients, projects, invoices and payments in one place",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

// Root Layout Component
// Developed by: https://www.zxtni.dev | https://github.com/zxtni
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme Script - www.zxtni.dev */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const html = document.documentElement;
                  
                  if (theme === 'light') {
                    html.classList.remove('dark');
                  } else if (theme === 'dark') {
                    html.classList.add('dark');
                  } else {
                    // Default to dark theme
                    html.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                  }
                } catch (e) {
                  // Fallback to dark theme
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {/* Custom Cursor Component - Created by t.me/zxtni */}
        <CustomCursor>
          <AuthProvider>
            <PageTransitionProvider>
              {children}
            </PageTransitionProvider>
          </AuthProvider>
        </CustomCursor>
        <Toaster position="top-right" />
        {/* Analytics - www.zxtni.dev */}
        <Analytics />
      </body>
    </html>
  )
}

// © 2025 FreelanceSuite by zxtni | https://github.com/zxtni/FreelanceSuite
