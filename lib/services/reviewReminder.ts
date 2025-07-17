// Types for review reminder configuration
export interface ReviewReminderConfig {
  campaignId: string
  recipientId: string
  name: string
  email?: string
  phone?: string
  businessName: string
  reviewUrl: string
  sendMethod: 'email' | 'sms' | 'both'
  maxAttempts: number
  delayBetweenAttempts: number // in hours
}

export interface ReminderResult {
  success: boolean
  method: 'email' | 'sms'
  error?: string
  creditsUsed: number
}

// Email template
const emailTemplate = (config: ReviewReminderConfig) => ({
  subject: `${config.name}, how was your experience with ${config.businessName}?`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leave a Review</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .button { 
            display: inline-block; 
            padding: 12px 30px; 
            background-color: #3B82F6; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold;
            margin: 20px 0;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            font-size: 12px; 
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Hi ${config.name}!</h2>
          </div>
          
          <p>Thank you for visiting ${config.businessName}!</p>
          
          <p>We'd love to hear about your experience. Your feedback helps us improve 
          and helps other customers make informed decisions.</p>
          
          <div style="text-align: center;">
            <a href="${config.reviewUrl}" class="button">Leave a Review</a>
          </div>
          
          <p>It only takes a minute, and we really appreciate it!</p>
          
          <div class="footer">
            <p>If you no longer wish to receive these reminders, 
            <a href="${config.reviewUrl}?unsubscribe=true">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  text: `
Hi ${config.name}!

Thank you for visiting ${config.businessName}!

We'd love to hear about your experience. Your feedback helps us improve 
and helps other customers make informed decisions.

Leave a Review: ${config.reviewUrl}

It only takes a minute, and we really appreciate it!

---
If you no longer wish to receive these reminders, visit: 
${config.reviewUrl}?unsubscribe=true
  `.trim()
})

// SMS template
const smsTemplate = (config: ReviewReminderConfig) => 
  `Hi ${config.name}! Thanks for visiting ${config.businessName}. ` +
  `We'd love your feedback! Leave a review: ${config.reviewUrl} ` +
  `Reply STOP to unsubscribe.`

// Calculate SMS segments (160 chars per segment)
function calculateSmsSegments(message: string): number {
  const length = message.length
  if (length <= 160) return 1
  // For multi-part messages, each segment is 153 chars
  return Math.ceil(length / 153)
}

// Send email reminder
async function sendEmailReminder(config: ReviewReminderConfig): Promise<ReminderResult> {
  try {
    const template = emailTemplate(config)
    
    // TODO: Integrate with actual email service (SendGrid, AWS SES, etc.)
    // For now, we'll simulate the send
    console.log('Sending email to:', config.email)
    console.log('Email content:', template)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      method: 'email',
      creditsUsed: 1
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      method: 'email',
      error: error instanceof Error ? error.message : 'Unknown error',
      creditsUsed: 0
    }
  }
}

// Send SMS reminder
async function sendSmsReminder(config: ReviewReminderConfig): Promise<ReminderResult> {
  try {
    const message = smsTemplate(config)
    const segments = calculateSmsSegments(message)
    
    // TODO: Integrate with actual SMS service (Twilio, AWS SNS, etc.)
    // For now, we'll simulate the send
    console.log('Sending SMS to:', config.phone)
    console.log('SMS content:', message)
    console.log('SMS segments:', segments)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      method: 'sms',
      creditsUsed: segments
    }
  } catch (error) {
    console.error('Failed to send SMS:', error)
    return {
      success: false,
      method: 'sms',
      error: error instanceof Error ? error.message : 'Unknown error',
      creditsUsed: 0
    }
  }
}

// Main function to send review reminders
export async function sendReviewReminder(config: ReviewReminderConfig): Promise<ReminderResult[]> {
  const results: ReminderResult[] = []

  if ((config.sendMethod === 'email' || config.sendMethod === 'both') && config.email) {
    const emailResult = await sendEmailReminder(config)
    results.push(emailResult)
  }

  if ((config.sendMethod === 'sms' || config.sendMethod === 'both') && config.phone) {
    const smsResult = await sendSmsReminder(config)
    results.push(smsResult)
  }

  return results
}

// Queue management for scheduled reminders
export interface QueuedReminder {
  id: string
  config: ReviewReminderConfig
  attemptNumber: number
  scheduledFor: Date
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

// Process queued reminders (would be called by a cron job or background worker)
export async function processQueuedReminders() {
  // TODO: Implement queue processing logic
  // 1. Fetch pending reminders from database where scheduledFor <= now
  // 2. For each reminder:
  //    - Send the reminder
  //    - Update status and credits used
  //    - If failed and attempts < maxAttempts, reschedule
  //    - If successful or max attempts reached, mark as completed
  
  console.log('Processing queued reminders...')
}

// Schedule a reminder
export async function scheduleReminder(
  config: ReviewReminderConfig,
  delayMinutes: number = 0
): Promise<string> {
  const reminderId = crypto.randomUUID()
  const scheduledFor = new Date()
  scheduledFor.setMinutes(scheduledFor.getMinutes() + delayMinutes)

  const queuedReminder: QueuedReminder = {
    id: reminderId,
    config,
    attemptNumber: 1,
    scheduledFor,
    status: 'pending'
  }

  // TODO: Save to database
  console.log('Scheduled reminder:', queuedReminder)

  return reminderId
}

// Check credit availability before sending
export async function checkCreditAvailability(
  userId: string,
  config: ReviewReminderConfig
): Promise<{ hasCredits: boolean; requiredCredits: number }> {
  let requiredCredits = 0

  if ((config.sendMethod === 'email' || config.sendMethod === 'both') && config.email) {
    requiredCredits += 1
  }

  if ((config.sendMethod === 'sms' || config.sendMethod === 'both') && config.phone) {
    const message = smsTemplate(config)
    requiredCredits += calculateSmsSegments(message)
  }

  // TODO: Check actual user credits from database
  const userCredits = 1000 // Mock value

  return {
    hasCredits: userCredits >= requiredCredits,
    requiredCredits
  }
}