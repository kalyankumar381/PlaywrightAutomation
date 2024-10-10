import * as nodemailer from 'nodemailer';
import os from 'os';
let userName: string;
// Set up the nodemailer transporter with your email provider's SMTP settings.
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-west-2.amazonaws.com',
  port: 587,
  secure:false,
  // service: 'gmail',
  auth: {
    user: 'AKIAJQHBUE5HNRZ5LXVA', // your Outlook email
    pass: 'AgFBmn+F0C520YlL+W3ptBWMEctvzSAQN5+G4j9dOq5E', // your Outlook email password or app-specific password
  },
  tls: {
    rejectUnauthorized: false,
  },

});
if (process.env.BUILD_TAG !== undefined && os.hostname() !== 'os-worker-windo') {
  userName = 'kalyan.kumar';
}
else {
  userName = process.env.USERNAME;
}

// Define a function to send the email with the Playwright report
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendEmailWithReport(reportPath: string, startTime: string, endTime: string, duration: string, totalTests: number, passCount: number, failCount: number, skipCount: number, passRate:string) {
  const mailOptions = {
    from: process.env.PWG_EMAIL_ID,
    to: process.env.PWG_EMAIL_TO,
    cc: process.env.PWG_EMAIL_CC,
    subject: process.env.PWG_ENV_PROJECT
      + '- Test Execution Completed. Pass-'
      + passCount + ' Fail-'
      + failCount,
    html: `
    <html>
    <head>
      <style>
        table, th, td {
          border: 1px solid black;
        }
      </style>
    </head>
    <body>
      <h2>${process.env.PWG_ENV_SUITE_NAME} Test Execution Summary</h2>
      <p></p>
      <table border='1' style='width:400px'>
        <td colspan=2 bgcolor='#45ba4b' style="text-align:center"><b>Test Execution Status</b></td>
        <tr><td>Suite</td><td>${process.env.PWG_ENV_SUITE_NAME}</td></tr>
        <tr><td>Project</td><td>${process.env.PWG_ENV_PROJECT}</td></tr>
        <tr><td>Execution Host</td><td> ${os.hostname()}</td></tr>
        <tr><td>Executed By</td><td> ${userName}</td></tr>
        <tr><td>StartTime</td><td>${startTime}</td></tr>
        <tr><td>EndTime</td><td>${endTime}</td></tr>
        <tr><td>Total Test Executed</td><td>${totalTests}</td></tr>
        <tr><td>Pass</td><td>${passCount}</td></tr>
        <tr><td>Fail</td><td>${failCount}</td></tr>
        <tr><td>Skip</td><td>${skipCount}</td></tr>
        <tr><td>PassRate</td><td>${passRate}</td></tr>
        <tr><td>TotalTime</td><td>${duration}</td></tr>
        ${process.env.CI? `<tr><td>Build Tag</td><td><a href="${process.env.BUILD_URL}">#${process.env.BUILD_NUMBER}</a></td></tr>` : ''}
        <tr><td>Tool</td><td>Playwright</td></tr>
      </table>
      <p>For more information, please find the attached Playwright report.<p>
      Note- This is an auto-generated email. Do not reply to this email.</p><p>Regards,</p><p>AutomationTeam</p>
    </body>
    </html>`,
    attachments: [
      {
        filename: 'playwright-report.html',
        path: reportPath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email with report sent successfully.');
  } catch (error) {
    console.error('Error sending email with report:', error);
  }
}




