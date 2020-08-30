import useObserver from 'customHooks/intersectionObserver'
import styles from './styles.module.sass'
import LanguageIcon from 'Icons/landing/worldIcon'
import DownArrow from 'Icons/landing/doubleArrow'
import { useState } from 'react'
import Link from 'next/link'

const me = 'https://res.cloudinary.com/d1zc3/image/upload/s--488_HI4D--/v1598559813/portfolio/landing/ich.jpg'
const countryFlag =
  'https://res.cloudinary.com/d1zc3/image/upload/s--2K1NMQS5--/v1597089233/portfolio/landing/peru_flag.jpg'
interface Text {
  bg: {
    url: string
    author: string
  }
  languages: {
    title: string
    list: { language: string; route: string }[]
  }
  title: string[]
  description: string[]
}

function Intro({ data }: { data: Text }): JSX.Element {
  const [languagesHidden, setLanguagesHidden] = useState<boolean>(false)
  const [ref, inSight] = useObserver(0.2)

  if (inSight) {
    ////Run Animations
    document.querySelector('#changeLang').className = 'visible'
    const animatedElementsId = ['#mainH2', '#mainH1', '#profilePic', '#description', '#signal']
    animatedElementsId.forEach((id) => {
      document.querySelector(id).classList.add(styles.fadeInUpAnimation)
    })
  }

  return (
    <>
      <div
        id="language_menu"
        className={`${styles.language_menu}`}
        style={{ transform: `translateY(${!languagesHidden ? '-100%' : '0'})` }}
      >
        <div className="container">
          {data.languages.list.map(({ language, route }, index) => (
            <Link href={route} key={index}>
              <a>{language}</a>
            </Link>
          ))}
        </div>
      </div>
      <section id="intro" className={styles.bg} style={{ backgroundImage: `url(${data.bg.url})` }}>
        <div className="container justify-content-center" ref={ref}>
          <div className={`${styles.container}`}>
            <div className={`${styles.changeLanguage}`}>
              <button id="changeLang" className="invisibleSass" onClick={() => setLanguagesHidden(!languagesHidden)}>
                <LanguageIcon color="white" />
                <span>{data.languages.title}</span>
              </button>
            </div>
            <div className={`${styles.main}`}>
              {(() => {
                const { title, description } = data
                return (
                  <>
                    <h2 id="mainH2" className={`${styles.h2} invisibleSass`}>
                      {title[0]}
                    </h2>
                    <h1 id="mainH1" className={`${styles.h1} invisibleSass`}>
                      {title[1]}
                    </h1>
                    <img id="profilePic" className={`${styles.profilePic} invisibleSass`} src={me} alt="" />
                    <section id="description" className="invisibleSass">
                      <p>{description[0]}</p>
                      <p>
                        {description[1]}
                        <img className={`${styles.flag}`} src={countryFlag} alt="" />
                      </p>
                      <p className={styles.skills}>{description[2]}</p>
                    </section>
                  </>
                )
              })()}
              <div id="signal" className={`${styles.signal} invisibleSass`}>
                <DownArrow />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Intro
