import useObserver from 'customHooks/intersectionObserver'
import styles from './styles.module.sass'
import LanguageIcon from 'Icons/landing/worldIcon'
import DownArrow from 'Icons/landing/doubleArrow'

const me = 'https://res.cloudinary.com/d1zc3/image/upload/s--488_HI4D--/v1597371013/portfolio/landing/ich.jpg'
const countryFlag =
  'https://res.cloudinary.com/d1zc3/image/upload/s--2K1NMQS5--/v1597089233/portfolio/landing/peru_flag.jpg'
interface Text {
  data: {
    language: string
    title: string[]
    description: string[]
  }
}

function Intro({ data }: Text): JSX.Element {
  const [ref, inSight] = useObserver()

  if (inSight) {
    document.querySelector('#changeLang').className = 'visible'
    document.querySelector('#mainH2').classList.add(styles.fadeInUpAnimation)
    document.querySelector('#mainH1').classList.add(styles.fadeInUpAnimation)
    document.querySelector('#profilePic').classList.add(styles.fadeInUpAnimation)
    document.querySelector('#description').classList.add(styles.fadeInUpAnimation)
    document.querySelector('#signal').classList.add(styles.fadeInUpAnimation)
  }

  return (
    <>
      <div className={styles.bg}>
        <div className="container justify-content-center" ref={ref}>
          <div className={`${styles.container}`}>
            <div className={`${styles.changeLanguage}`}>
              <button id="changeLang" className="invisibleSass">
                <LanguageIcon color="white" />
                <span>{data.language}</span>
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
      </div>
    </>
  )
}

export default Intro
