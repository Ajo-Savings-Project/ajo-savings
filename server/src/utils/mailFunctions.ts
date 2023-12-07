import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  // email service configuration
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

const htmlData = (data: string) =>
  `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 90%;
                        margin: auto;
                        padding: 20px;
                        border: 1px solid #e0e0e0;
                        border-radius: 10px;
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    }
            
                    h2 {
                        color: #088ab2;
                        text-align: center;
                        font-weight: 800;
                    }
            
                    p {
                        margin-bottom: 30px;
                        color: #777777;
                        text-align: center;
                    }
            
                    .otp {
                        font-size: 10px;
                        letter-spacing: 2px;
                        text-align: center;
                        color: #ff9900;
                        display: block;
                        margin-top: 20px;
                    }

                    .team {
                        color: #088ab2;
                        font-weight: 500
                    }

                    .otp  {
                        border-radius: 15px;
                        padding: 10px 20px;
                        font-size: 20px;
                        display: block;
                        margin: auto;
                        color: #000;
                        cursor: pointer;
                    }
                
            

                    .signature {
                        color: #444444;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to Ajó Savings</h2>
                    <p>Your OTP is: </p>
                    <span class="otp"><h1>${data}</h1></span>
                    <p class="signature">Thank You<br><span class="team">TEAM AJó</span></p>
                </div>
            </body>
            </html>`

export const mailOTP = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'OTP for User Registration',
      html: htmlData(otp),
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:' + info.response)
  } catch (error) {
    console.error(error)
    // Handle email sending failure
  }
}
