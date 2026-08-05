import nodemailer from 'nodemailer';
import { promises as fs } from 'fs'; 
import path from 'path';

export default async function handler(req, res) {
  // 1. Handle CORS (Allow your GitHub Pages site to access this API)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://chivesclub.github.io'); // Replace with your GitHub Pages URL
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, fileName } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!fileName) fileName = "test.html";
  const filePath = path.join(process.cwd(), 'templates', fileName);
  
  // 1. Read the HTML file
  const htmlContent = await fs.readFile(filePath, 'utf-8');

  // 2. Extract text between <title> and </title> using a Regular Expression
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  const emailSubject = titleMatch ? titleMatch[1] : "Chives Club Email";

  // 3. Configure Nodemailer Transporter (Using Gmail as an example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Environment variable
      pass: process.env.EMAIL_PASS, // Environment variable (App Password)
    },
  });

  // 4. Set up email details
  const mailOptions = {
    from: `"Chives Club" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: emailSubject,
    html: htmlContent,
  };

  // 5. Send the email
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Confirmation email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
