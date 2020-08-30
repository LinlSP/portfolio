/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.sass'
import Head from 'next/head'
import { useState } from 'react'
import useObserver from 'customHooks/intersectionObserver'
interface Data {
  bg: {
    url: string
    author: string
  }
  inputs: {
    names: string
    mail: string
    subject: string
    message: string
    button: string
  }
  apiResponses: {
    success: {
      title: string
      text: string
      confirm: string
    }
    error: {
      title: string
      text: {
        [errorCode: string]: string
      }
      confirm: string
    }
  }
}

export default function Contact({ data }: { data: Data }): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [ref, inSight] = useObserver(0.4)
  const { success: apiSuccess, error: apiError } = data.apiResponses
  const { inputs } = data
  const author = { backgroundAuthor: data.bg.author }

  const onSubmitForm = (e) => {
    e.preventDefault()
    e.persist()
    setLoading(true)
    /////////Define sweetalert2 package
    const Tab = window as any
    const { Swal } = Tab
    ///////
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
      .then(({ status, ok }: { status: number; ok: boolean }) => {
        let swalObject = {
          title: '',
          text: '',
          icon: '',
          confirmButtonText: '',
        }
        if (ok) {
          swalObject = {
            title: apiSuccess.title,
            text: apiSuccess.text,
            icon: 'success',
            confirmButtonText: apiSuccess.confirm,
          }
          ////reset form
          e.target.reset()
        } else {
          swalObject = {
            title: apiError.title,
            text: apiError.text[status.toString(10)],
            icon: 'error',
            confirmButtonText: apiError.confirm,
          }
          setLoading(false)
        }

        return Swal.fire(swalObject)
      })
      .catch((err) => {
        Swal.fire({
          title: apiError.title,
          text: apiError.text['500'],
          icon: 'error',
          confirmButtonText: apiError.confirm,
        })

        console.log(err)
        return setLoading(false)
      })
  }

  if (inSight) {
    document.querySelector('#contact_container').classList.add(styles.slideInLeftAnimation)
  }

  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <section
        id="contact"
        className={styles.bg}
        style={{ backgroundImage: `url(${data.bg.url})` }}
        ref={ref}
        {...author}
      >
        <div id="contact_container" className={`${styles.container} container`}>
          <form className={styles.form} onSubmit={onSubmitForm} style={{ opacity: `${loading ? '.8' : '1'}` }}>
            <input
              required
              disabled={loading}
              className={`form-control ${styles.input}`}
              placeholder={inputs.names}
              type="text"
              name="names"
            />
            <input
              required
              disabled={loading}
              className={`form-control ${styles.input}`}
              placeholder={inputs.mail}
              type="email"
              name="email"
            />
            <input
              required
              disabled={loading}
              className={`form-control ${styles.input}`}
              placeholder={inputs.subject}
              type="text"
              name="subject"
            />
            <textarea
              required
              disabled={loading}
              className={`form-control`}
              placeholder={inputs.message}
              name="message"
            ></textarea>
            <div
              className={`g-recaptcha ${styles.input}`}
              data-sitekey="6LciBMIZAAAAAPMOPW8KaAKpQFmvbSDUsVpwBvUH"
            ></div>
            <input disabled={loading} className={`btn btn-danger`} type="submit" value={inputs.button} />
          </form>
        </div>
      </section>
    </>
  )
}
