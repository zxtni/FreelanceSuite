"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

export function BillingSettings() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "5555", expiry: "08/26", isDefault: false },
  ])

  const handleDeletePayment = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  return (
    <div className="bg-card border border-border rounded-lg p-12 flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <RefreshCw className="w-12 h-12 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
        <p className="text-muted-foreground">Billing features will be available soon.</p>
      </div>
    </div>
  )
}
