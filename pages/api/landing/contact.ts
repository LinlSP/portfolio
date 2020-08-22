require('dotenv').config()

export default async (req, res) => {
  const { method } = req
  if (method === 'GET') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ hola: 'wd' }))
  }
  if (method === 'POST') {
    const { names, email, subject, message, 'g-recaptcha-response': captcha } = req.body
    const params = `secret=${process.env.CAPTCHA_KEY}&response=${captcha}`
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
    const captchaResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: params,
    }).then((res) => res.json())
    // console.log(req.connection.remoteAddress, captchaResponse)
    res.send(captchaResponse.success)
  }
}
