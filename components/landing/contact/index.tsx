import styles from './styles.module.sass'
import Head from 'next/head'
import useObserver from 'customHooks/intersectionObserver'

// import { useState } from 'react'

interface Data {
  bg: {
    url: string
    author: string
  }
}

export default function Contact({ data }: { data: Data }): JSX.Element {
  const [ref, inSight] = useObserver(0.4)
  // const [validation, setValidation] = useState<{ captcha: boolean; message: string }>({ captcha: true, message: '' })
  // const { captcha, message } = validation

  const onSubmitForm = (e) => {
    e.preventDefault()
    const object = {}
    const form = new FormData(e.target)
    form.forEach((value, key) => {
      object[key] = value
    })
    const formData = JSON.stringify(object)
    fetch('/api/landing/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: formData,
    })
    // .then((response) => response)
    // .then((result) => {
    //   console.log(result)
    // })
    // .catch((err) => console.log(err))
    // console.log(document.querySelector('#g-recaptcha-response'))
  }

  if (inSight) {
    document.querySelector('#contact_container').classList.add(styles.slideInLeftAnimation)
  }

  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <section id="contact" className={styles.bg} style={{ backgroundImage: `url(${data.bg.url})` }} ref={ref}>
        <div id="contact_container" className={`${styles.container} container`}>
          <form className={styles.form} onSubmit={onSubmitForm}>
            <input className={`form-control ${styles.input}`} placeholder="Names" type="text" name="names" />
            <input className={`form-control ${styles.input}`} placeholder="E-Mail" type="email" name="email" />
            <input className={`form-control ${styles.input}`} placeholder="Subject" type="text" name="subject" />
            <textarea className={`form-control`} placeholder="Message" name="message"></textarea>
            <div
              className={`g-recaptcha ${styles.input}`}
              data-sitekey="6LciBMIZAAAAAPMOPW8KaAKpQFmvbSDUsVpwBvUH"
            ></div>
            <input className={`btn btn-danger`} type="submit" value="Send" />
            {/* <span>{message}</span> */}
          </form>
        </div>
      </section>
    </>
  )
}
