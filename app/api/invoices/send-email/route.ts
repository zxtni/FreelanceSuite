import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { getEmailTemplate, getEmailSubject, type EmailTemplate } from '@/lib/email-templates'
import { readInvoices, writeInvoices } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invoiceId, template, clientEmail, clientName, projectName } = body

    if (!invoiceId || !template || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get invoice data
    const invoices = await readInvoices()
    const invoice = invoices.find((inv) => inv.id === invoiceId)

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Prepare email data
    const emailData = {
      clientName: clientName || invoice.clientName,
      invoiceNumber: invoice.id,
      amount: `₹${invoice.amount.toLocaleString()}`,
      dueDate: invoice.dueDate,
      projectName: projectName || invoice.projectName,
      invoiceLink: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/invoices/${invoice.id}`,
    }

    // Get HTML template
    const html = getEmailTemplate(template as EmailTemplate, emailData)
    const subject = getEmailSubject(template as EmailTemplate, invoice.id)

    // Send email
    const result = await sendEmail({
      to: clientEmail,
      subject,
      html,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }

    // Update invoice with email sent record
    const updatedInvoices = invoices.map((inv) => {
      if (inv.id === invoiceId) {
        const emailsSent = inv.emailsSent || []
        return {
          ...inv,
          emailsSent: [
            ...emailsSent,
            {
              template,
              sentAt: new Date().toISOString(),
              sentTo: clientEmail,
            },
          ],
        }
      }
      return inv
    })

    await writeInvoices(updatedInvoices)

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId,
    })
  } catch (error) {
    console.error('Error in send-email API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
