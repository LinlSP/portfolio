import styles from './styles.module.sass'
import Arrow from 'Icons/landing/iosArrow'
import BgFigure from 'Icons/landing/mainSectionBg'
import { useState } from 'react'
interface objects {
  name: string
  logo: string
  phrase: string
  description: string
}

export default function Projects({ data }: { data: Array<objects> }): JSX.Element {
  const [position, setPosition] = useState<number>(0)
  const nextProject = () => {
    setPosition(position + 1)
  }

  const previousProject = () => {
    setPosition(position - 1)
  }

  return (
    <>
      <section id="projects" className={styles.bg}>
        <BgFigure className={styles.bgFigure} />
        <div className={`${styles.container} container`}>
          <Arrow
            id="leftArrow"
            className={`${styles.arrow} ${styles.left}`}
            onClick={previousProject}
            style={{ display: `${position === 0 ? 'none' : 'block'}` }}
          />
          <div className={styles.cards_container}>
            <div id="cardsWrapper" className={styles.cards_wrapper} style={{ marginLeft: `${-17 * position}em` }}>
              {data.map((card, index) => (
                <div className={styles.card} key={index}>
                  <div style={{ backgroundImage: `url(${card.logo})` }}></div>
                  <h1>{card.name}</h1>
                  <h2>{card.phrase}</h2>
                  <textarea value={card.description} readOnly />
                </div>
              ))}
            </div>
          </div>
          <Arrow
            id="rightArrow"
            className={`${styles.arrow}`}
            onClick={nextProject}
            style={{ display: `${position === data.length - 1 ? 'none' : 'block'}` }}
          />
        </div>
        <BgFigure className={styles.bgFigureLeft} />
      </section>
    </>
  )
}
