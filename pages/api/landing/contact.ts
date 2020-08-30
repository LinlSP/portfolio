require('dotenv').config()
const nodemailer = require('nodemailer')

export default async (req, res, next) => {
  const { method } = req

  if (method === 'POST') {
    const { names, email, subject, message, 'g-recaptcha-response': captcha } = req.body
    const params = `secret=${process.env.CAPTCHA_KEY}&response=${captcha}`
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'

    if (!names || !email || !subject || !message) {
      res.status(400).send('field missing')
      return
    }

    let transporter = nodemailer.createTransport({
      pool: true,
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false,
      auth: {
        type: 'login',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    try {
      const captchaResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: params,
      }).then((res) => res.json())

      if (!captchaResponse.success) throw { msg: 'Captcha is invalid' }

      await transporter.sendMail({
        from: email,
        to: process.env.PERSONAL_MAIL,
        subject: subject,
        text: `${names}:  ${message}`,
      })
      res.status(200).end()
      return
    } catch (error) {
      console.log(error)
      if (error.msg) {
        res.status(401).send(error.msg)
        return
      }
      res.status(500).end()
    }
  }
}
