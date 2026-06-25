// Backend API for the portfolio contact form.
// Receives POST /api/contact submissions and forwards them via SMTP (Nodemailer).
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware -----------------------------------------------------------
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['POST', 'GET'],
}));
app.use(express.json());

// Basic spam protection: limit each IP to 5 requests per 10 minutes.
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests, please try again later.' },
});

// --- Nodemailer transport (SMTP) ------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false otherwise
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify the SMTP connection on startup so misconfigurations fail fast.
transporter.verify()
  .then(() => console.log('✅ SMTP server is ready to send mail'))
  .catch((err) => console.error('❌ SMTP connection error:', err.message));

// --- Validation helpers ---------------------------------------------------
const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitize = (str = '') =>
  String(str).replace(/[<>]/g, '').trim().slice(0, 5000);

// --- Routes ---------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-contact-backend' });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const name = sanitize(req.body?.name);
    const email = sanitize(req.body?.email);
    const message = sanitize(req.body?.message);

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const recipient = process.env.MAIL_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    return res.json({ ok: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Contact API listening on http://localhost:${PORT}`);
});
