import styles from './styles.module.sass'
import Instagram from 'Icons/footer/instagram'
import Twitter from 'Icons/footer/twitter'
import Telegram from 'Icons/footer/telegram'
export default function Footer(): JSX.Element {
  return (
    <>
      <section id="footer" className={`${styles.bg}`}>
        <div className={`${styles.container} container`}>
          <span>SEND ME A DM:</span>
          <a href="https://www.instagram.com/linlsp02/">
            <Instagram />
          </a>
          <a href="https://t.me/linlsp02">
            <Telegram />
          </a>
          <a href="https://twitter.com/dizce_company">
            <Twitter />
          </a>
        </div>
      </section>
    </>
  )
}
