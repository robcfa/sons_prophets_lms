import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  host: import.meta.env.VITE_SMTP_HOST || 'smtp.gmail.com',
  port: import.meta.env.VITE_SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: import.meta.env.VITE_SMTP_USER,
    pass: import.meta.env.VITE_SMTP_PASS,
  },
};

const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'noreply@sonsprophets.org';
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000';

// Create transporter
const createTransporter = () => {
  try {
    return nodemailer.createTransporter(EMAIL_CONFIG);
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    return null;
  }
};

// Send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: 'Email service not configured' };
    }

    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: 'Verify Your Email - Sons of Prophets',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Welcome to Sons of Prophets!</h2>
          <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
          
          <div style="margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
          
          <p>This verification link will expire in 24 hours.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            If you didn't create an account with us, please ignore this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('Send verification email error:', error);
    return { success: false, error: 'Failed to send verification email' };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: 'Email service not configured' };
    }

    const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password - Sons of Prophets',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Password Reset Request</h2>
          <p>You requested to reset your password for your Sons of Prophets account.</p>
          
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="color: #666; word-break: break-all;">${resetUrl}</p>
          
          <p>This reset link will expire in 24 hours.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            If you didn't request a password reset, please ignore this email. Your password will not be changed.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('Send password reset email error:', error);
    return { success: false, error: 'Failed to send password reset email' };
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, userName) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: 'Email service not configured' };
    }

    const mailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to Sons of Prophets!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Welcome, ${userName}!</h2>
          <p>Your email has been verified and your account is now active.</p>
          
          <p>You can now access all features of the Sons of Prophets platform:</p>
          <ul>
            <li>Browse our course catalog</li>
            <li>Connect with spiritual coaches</li>
            <li>Join community discussions</li>
            <li>Access biblical study tools</li>
          </ul>
          
          <div style="margin: 30px 0;">
            <a href="${FRONTEND_URL}/dashboard" 
               style="background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          
          <p>If you have any questions, feel free to reach out to our support team.</p>
          
          <p>Blessings,<br>The Sons of Prophets Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('Send welcome email error:', error);
    return { success: false, error: 'Failed to send welcome email' };
  }
};

export default {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};