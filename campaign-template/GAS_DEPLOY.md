# Google Apps Script: Receive form POST and send email

Create a new Google Apps Script project and paste the following code into Code.gs. Then deploy as a Web App (Execute as: Me, Who has access: Anyone, even anonymous) and copy the web app URL into the form action in index.html.

// Code.gs
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = data.name || 'No name';
    const email = data.email || 'No email';
    const interest = data.interest || 'No interest';

    const subject = `Volunteer signup: ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nSubmitted via website.`;

    // send email to akomon10@gmail.com
    MailApp.sendEmail('akomon10@gmail.com', subject, body);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

Steps:
1. In Google Drive, create New → More → Google Apps Script.
2. Replace the default code with the Code.gs above.
3. Deploy → New deployment → Select "Web app".
   - Execute as: Me
   - Who has access: Anyone
4. Copy the Web App URL and paste it into index.html form action (replace your-script-id URL).
5. Test the form; submissions will send an email to akomon10@gmail.com.

# Sending form submissions without sending from your Google account

If you don't want emails to be sent from your Google account (MailApp sends as the script owner), use a transactional email provider (SendGrid, Mailgun, Postmark) so messages come from a neutral sender (for example no-reply@yourdomain) and are delivered reliably.

Below are two practical options:

Option A — Apps Script + SendGrid (recommended, keeps everything serverless)
1. Sign up for SendGrid and verify a sender identity (the "from" address you want to use).
2. Get a SendGrid API key.
3. Create a new Google Apps Script project and paste the code below into Code.gs.
4. Replace SENDGRID_API_KEY and FROM_EMAIL with your values. Deploy the script as a Web App and paste the web app URL into the form action in index.html.

// Code.gs (SendGrid example)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = data.name || 'No name';
    const email = data.email || 'No email';
    const interest = data.interest || 'No interest';

    const SENDGRID_API_KEY = 'REPLACE_WITH_YOUR_SENDGRID_KEY'; // set securely
    const FROM_EMAIL = 'no-reply@yourdomain.com'; // must be verified in SendGrid
    const TO_EMAIL = 'akomon10@gmail.com';

    const payload = {
      personalizations: [{ to: [{ email: TO_EMAIL }] }],
      from: { email: FROM_EMAIL },
      subject: `Volunteer signup: ${name}`,
      content: [{ type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n` }]
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + SENDGRID_API_KEY },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const res = UrlFetchApp.fetch('https://api.sendgrid.com/v3/mail/send', options);
    if (res.getResponseCode() >= 200 && res.getResponseCode() < 300) {
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ success: false, status: res.getResponseCode(), body: res.getContentText() })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

Notes for SendGrid approach:
- You must verify the FROM_EMAIL in SendGrid.
- Store the API key securely (use Script Properties instead of hardcoding in production).
- This sends email via SendGrid; the email's From will be the verified sender (not your Google account).

Option B — Small server (Node.js) + nodemailer (good if you control a host)
- Create a tiny Express endpoint (/send) that accepts POST requests and uses nodemailer with SMTP or a provider transport (SendGrid, Mailgun) to send mail from a neutral sender.
- Host on any VPS or use a platform like Render/Heroku.

Example Node snippet (conceptual):
// server.js (concept)
// const express = require('express');
// const nodemailer = require('nodemailer');
// app.post('/send', async (req,res) => { /* create transporter with SMTP or SendGrid, send mail to akomon10@gmail.com */ });

Which option do you want me to add to your project? I can:
- Add the Apps Script code file and step-by-step deployment instructions (copy into GAS_DEPLOY.md) — you then deploy on your Google account.
- Or scaffold a tiny Node/Express endpoint with nodemailer and an example .env and readme for deployment.

Replace the placeholder values (API keys, verified sender) before deploying. If you want, I can update the project files to integrate one of these and provide exact next steps.
