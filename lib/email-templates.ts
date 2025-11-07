interface EmailTemplateData {
  clientName: string
  invoiceNumber: string
  amount: string
  dueDate?: string
  projectName?: string
  invoiceLink?: string
}

export function getWelcomeTemplate(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome - Invoice from TheZxtni</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: bold;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .invoice-details {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    .invoice-details h3 {
      margin-top: 0;
      color: #667eea;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .detail-label {
      font-weight: 600;
      color: #555;
    }
    .detail-value {
      color: #333;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: white;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome!</h1>
      <p style="font-size: 18px; margin: 10px 0;">New Invoice from TheZxtni</p>
    </div>
    
    <div class="content">
      <h2 style="color: #667eea;">Hello ${data.clientName}!</h2>
      <p>Thank you for choosing to work with us! We're excited to start this journey together.</p>
      <p>This email contains your invoice details for the project: <strong>${data.projectName || 'Your Project'}</strong></p>
      
      <div class="invoice-details">
        <h3>Invoice Details</h3>
        <div class="detail-row">
          <span class="detail-label">Invoice Number:</span>
          <span class="detail-value">#${data.invoiceNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount:</span>
          <span class="detail-value" style="font-size: 24px; color: #667eea; font-weight: bold;">${data.amount}</span>
        </div>
        ${data.dueDate ? `
        <div class="detail-row">
          <span class="detail-label">Due Date:</span>
          <span class="detail-value">${data.dueDate}</span>
        </div>
        ` : ''}
      </div>
      
      <p>Please review the invoice and let us know if you have any questions. We're here to help!</p>
      
      <div style="text-align: center;">
        ${data.invoiceLink ? `<a href="${data.invoiceLink}" class="button">View Invoice</a>` : ''}
      </div>
      
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Looking forward to a great collaboration!<br>
        <strong>The Zxtni Team</strong>
      </p>
    </div>
    
    <div class="footer">
      <p>© 2025 TheZxtni - Code Universe by Rahul Mondal</p>
      <p>thezxtni@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `
}

export function getPaymentReceivedTemplate(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Received - TheZxtni</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: bold;
    }
    .checkmark {
      font-size: 80px;
      text-align: center;
      margin: 20px 0;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .payment-details {
      background: #f0fdf4;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #10b981;
    }
    .payment-details h3 {
      margin-top: 0;
      color: #10b981;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .detail-label {
      font-weight: 600;
      color: #555;
    }
    .detail-value {
      color: #333;
    }
    .success-badge {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: white;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Payment Received!</h1>
      <p style="font-size: 18px; margin: 10px 0;">Thank you for your payment</p>
    </div>
    
    <div class="checkmark">✓</div>
    
    <div class="content">
      <h2 style="color: #10b981;">Dear ${data.clientName},</h2>
      <p>We're pleased to confirm that we have received your payment. Thank you for your prompt payment!</p>
      
      <div class="payment-details">
        <h3>Payment Confirmation</h3>
        <div style="text-align: center; margin-bottom: 15px;">
          <span class="success-badge">Paid</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Invoice Number:</span>
          <span class="detail-value">#${data.invoiceNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount Paid:</span>
          <span class="detail-value" style="font-size: 24px; color: #10b981; font-weight: bold;">${data.amount}</span>
        </div>
        ${data.projectName ? `
        <div class="detail-row">
          <span class="detail-label">Project:</span>
          <span class="detail-value">${data.projectName}</span>
        </div>
        ` : ''}
      </div>
      
      <p>Your payment has been successfully processed and recorded in our system. You will receive a detailed receipt shortly.</p>
      
      <p style="background: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">
        <strong>What's Next?</strong><br>
        We'll begin working on your project immediately. You can expect regular updates on the progress.
      </p>
      
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Thank you for your business!<br>
        <strong>The Zxtni Team</strong>
      </p>
    </div>
    
    <div class="footer">
      <p>© 2025 TheZxtni - Code Universe by Rahul Mondal</p>
      <p>thezxtni@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `
}

export function getProjectDeliveryTemplate(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Delivered - TheZxtni</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      color: white;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: bold;
    }
    .icon {
      font-size: 80px;
      text-align: center;
      margin: 20px 0;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .delivery-details {
      background: #fdf2f8;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #ec4899;
    }
    .delivery-details h3 {
      margin-top: 0;
      color: #ec4899;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .detail-label {
      font-weight: 600;
      color: #555;
    }
    .detail-value {
      color: #333;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      font-weight: bold;
    }
    .highlight-box {
      background: #eff6ff;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #3b82f6;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: white;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Project Delivered!</h1>
      <p style="font-size: 18px; margin: 10px 0;">Your project is ready</p>
    </div>
    
    <div class="icon">🎁</div>
    
    <div class="content">
      <h2 style="color: #ec4899;">Dear ${data.clientName},</h2>
      <p>We're excited to inform you that your project has been completed and is ready for delivery!</p>
      
      <div class="delivery-details">
        <h3>Delivery Information</h3>
        <div class="detail-row">
          <span class="detail-label">Project Name:</span>
          <span class="detail-value"><strong>${data.projectName || 'Your Project'}</strong></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Invoice Number:</span>
          <span class="detail-value">#${data.invoiceNumber}</span>
        </div>
        ${data.amount ? `
        <div class="detail-row">
          <span class="detail-label">Project Value:</span>
          <span class="detail-value" style="font-size: 20px; color: #ec4899; font-weight: bold;">${data.amount}</span>
        </div>
        ` : ''}
      </div>
      
      <div class="highlight-box">
        <h4 style="margin-top: 0; color: #3b82f6;">📦 What's Included:</h4>
        <ul style="margin: 10px 0;">
          <li>Complete project files and documentation</li>
          <li>Source code (if applicable)</li>
          <li>Setup instructions and guidelines</li>
          <li>Support documentation</li>
        </ul>
      </div>
      
      <p>Please review the deliverables and let us know if you need any clarifications or have questions.</p>
      
      <div style="text-align: center;">
        ${data.invoiceLink ? `<a href="${data.invoiceLink}" class="button">View Project Details</a>` : ''}
      </div>
      
      <div style="background: #dcfce7; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #10b981;">
        <strong>💚 We Value Your Feedback!</strong><br>
        Your satisfaction is our priority. Please don't hesitate to reach out if you need any revisions or support.
      </div>
      
      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Thank you for trusting us with your project!<br>
        <strong>The Zxtni Team</strong>
      </p>
    </div>
    
    <div class="footer">
      <p>© 2025 TheZxtni - Code Universe by Rahul Mondal</p>
      <p>thezxtni@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `
}

export type EmailTemplate = 'welcome' | 'payment-received' | 'project-delivery'

export function getEmailTemplate(template: EmailTemplate, data: EmailTemplateData): string {
  switch (template) {
    case 'welcome':
      return getWelcomeTemplate(data)
    case 'payment-received':
      return getPaymentReceivedTemplate(data)
    case 'project-delivery':
      return getProjectDeliveryTemplate(data)
    default:
      return getWelcomeTemplate(data)
  }
}

export function getEmailSubject(template: EmailTemplate, invoiceNumber: string): string {
  switch (template) {
    case 'welcome':
      return `Welcome! Invoice #${invoiceNumber} from TheZxtni`
    case 'payment-received':
      return `Payment Received - Invoice #${invoiceNumber} | TheZxtni`
    case 'project-delivery':
      return `Project Delivered - Invoice #${invoiceNumber} | TheZxtni`
    default:
      return `Invoice #${invoiceNumber} from TheZxtni`
  }
}
