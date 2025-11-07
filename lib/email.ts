import nodemailer from 'nodemailer'

// Gmail configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thezxtni@gmail.com',
    pass: 'xrnb kbkr xgoa hbph', // App password
  },
})

export interface SendEmailParams {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from = 'TheZxtni <thezxtni@gmail.com>' }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    })

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function verifyEmailConnection() {
  try {
    await transporter.verify()
    console.log('Email server is ready to send messages')
    return true
  } catch (error) {
    console.error('Email server verification failed:', error)
    return false
  }
}
