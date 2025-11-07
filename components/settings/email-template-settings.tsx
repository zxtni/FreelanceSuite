"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Save, RotateCcw, Eye } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const defaultTemplates = {
  welcome: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to Our Project!</h1>
    </div>
    <div class="content">
      <p>Hi {{clientName}},</p>
      <p>Thank you for choosing us for your project: <strong>{{projectName}}</strong></p>
      <p>We're excited to work with you and deliver exceptional results!</p>
      <a href="#" class="button">View Project Details</a>
      <p>If you have any questions, feel free to reach out to us.</p>
      <p>Best regards,<br>The Zxtni Team</p>
    </div>
    <div class="footer">
      <p>© 2025 TheZxtni</p>
    </div>
  </div>
</body>
</html>`,
  paymentReceived: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Payment Received</h1>
    </div>
    <div class="content">
      <p>Hi {{clientName}},</p>
      <div class="success-box">
        <p><strong>Great news!</strong> We've received your payment.</p>
      </div>
      <p>Thank you for your payment for <strong>{{projectName}}</strong></p>
      <p>Your transaction has been processed successfully.</p>
      <p>Best regards,<br>The Zxtni Team</p>
    </div>
    <div class="footer">
      <p>© 2025 TheZxtni</p>
    </div>
  </div>
</body>
</html>`,
  projectDelivery: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .delivery-box { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .button { background: #f5576c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Project Delivered!</h1>
    </div>
    <div class="content">
      <p>Hi {{clientName}},</p>
      <div class="delivery-box">
        <p><strong>Your project is ready!</strong></p>
      </div>
      <p>We're excited to inform you that <strong>{{projectName}}</strong> has been completed and is ready for review.</p>
      <a href="#" class="button">View Deliverables</a>
      <p>Please review the deliverables and let us know if you need any revisions.</p>
      <p>Best regards,<br>The Zxtni Team</p>
    </div>
    <div class="footer">
      <p>© 2025 TheZxtni</p>
    </div>
  </div>
</body>
</html>`
}

export function EmailTemplateSettings() {
  const [templates, setTemplates] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('emailTemplates')
      return saved ? JSON.parse(saved) : defaultTemplates
    }
    return defaultTemplates
  })
  
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'welcome' | 'paymentReceived' | 'projectDelivery'>('welcome')

  const handleSave = () => {
    localStorage.setItem('emailTemplates', JSON.stringify(templates))
    toast.success('Email templates saved successfully!')
  }

  const handleReset = (template: 'welcome' | 'paymentReceived' | 'projectDelivery') => {
    setTemplates({
      ...templates,
      [template]: defaultTemplates[template]
    })
    toast.info('Template reset to default')
  }

  const handlePreview = (template: string) => {
    const preview = template
      .replace(/{{clientName}}/g, 'John Doe')
      .replace(/{{projectName}}/g, 'Sample Project')
    setPreviewTemplate(preview)
  }

  return (
    <>
      <Card className="bg-card/60 backdrop-blur-xl border-border shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            <CardTitle>Email Templates</CardTitle>
          </div>
          <CardDescription>
            Customize HTML email templates sent to clients. Use {`{{clientName}}`} and {`{{projectName}}`} as placeholders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="welcome">Welcome Email</TabsTrigger>
              <TabsTrigger value="paymentReceived">Payment Received</TabsTrigger>
              <TabsTrigger value="projectDelivery">Project Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="welcome" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-template">Welcome Email HTML Template</Label>
                <Textarea
                  id="welcome-template"
                  value={templates.welcome}
                  onChange={(e) => setTemplates({ ...templates, welcome: e.target.value })}
                  className="font-mono text-xs min-h-[400px]"
                  placeholder="Enter HTML template..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Template
                </Button>
                <Button onClick={() => handleReset('welcome')} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </Button>
                <Button onClick={() => handlePreview(templates.welcome)} variant="secondary" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="paymentReceived" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-template">Payment Received HTML Template</Label>
                <Textarea
                  id="payment-template"
                  value={templates.paymentReceived}
                  onChange={(e) => setTemplates({ ...templates, paymentReceived: e.target.value })}
                  className="font-mono text-xs min-h-[400px]"
                  placeholder="Enter HTML template..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Template
                </Button>
                <Button onClick={() => handleReset('paymentReceived')} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </Button>
                <Button onClick={() => handlePreview(templates.paymentReceived)} variant="secondary" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="projectDelivery" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-template">Project Delivery HTML Template</Label>
                <Textarea
                  id="delivery-template"
                  value={templates.projectDelivery}
                  onChange={(e) => setTemplates({ ...templates, projectDelivery: e.target.value })}
                  className="font-mono text-xs min-h-[400px]"
                  placeholder="Enter HTML template..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Template
                </Button>
                <Button onClick={() => handleReset('projectDelivery')} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </Button>
                <Button onClick={() => handlePreview(templates.projectDelivery)} variant="secondary" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Template Preview</DialogTitle>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-white">
            <iframe
              srcDoc={previewTemplate || ''}
              className="w-full h-[600px] border-0"
              title="Email Preview"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
