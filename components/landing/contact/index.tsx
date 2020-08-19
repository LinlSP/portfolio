import styles from './styles.module.sass'
import BgFigure from 'Icons/landing/mainSectionBg'

export default function Contact(): JSX.Element {
  return (
    <>
      <section id="contact" className={styles.bg}>
        <BgFigure className={styles.bgFigure} />
        <div className={`${styles.container} container`}>contact</div>
        <BgFigure className={styles.bgFigureLeft} />
      </section>
    </>
  )
}
