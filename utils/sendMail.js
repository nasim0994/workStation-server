const nodemailer = require("nodemailer");

exports.sendMailByNodeMailer = async (mailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: mailData.email,
        subject: mailData.subject,
        html: mailData.html,
      };

      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(error)
    }
};

