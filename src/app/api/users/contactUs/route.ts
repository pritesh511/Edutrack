import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, name, message } = reqBody;
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USERID,
        pass: process.env.MAIL_TRAP_PASS,
      },
    });

    const info = await transport.sendMail({
      from: email,
      to: "patelpritesh313@gmail.com",
      subject: "Contact Us",
      html: `<html>
      <body>
        <h3>${name}</> Try to contact to you regarding edutrack.
        <p>${message}</p>
      </body>
        </html>`,
    });

    const sendMsg = await transport.sendMail(info);
    return sendMsg;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
