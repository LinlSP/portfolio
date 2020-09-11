import styles from './styles.module.sass'
import Arrow from 'Icons/landing/iosArrow'
import { useState } from 'react'
import useObserver from 'customHooks/intersectionObserver'
interface objects {
  name: string
  logo: string
  phrase: string
  description: string
  href: string
}

export default function Projects({
  data,
}: {
  data: {
    bg: {
      url: string
      author: string
    }
    list: Array<objects>
  }
}): JSX.Element {
  const [position, setPosition] = useState<number>(1)
  const [ref, inSight] = useObserver(0.3)

  const nextProject = () => {
    setPosition(position + 1)
  }

  const previousProject = () => {
    setPosition(position - 1)
  }

  const onCard = (cardPosition: number, link: string) => {
    if (position === cardPosition) {
      const win = window.open(link, '_blank')
      win.focus()
      return
    }
    setPosition(cardPosition)
  }

  if (inSight) {
    document.querySelector('#project_container').classList.add(styles.slideInRightAnimation)
  }

  return (
    <>
      <section
        id="projects"
        className={styles.bg}
        style={{ backgroundImage: `url(${data.bg.url})` }}
        ref={ref}
        {...{ backgroundauthor: data.bg.author }}
      >
        <div id="project_container" className={`${styles.container} container`}>
          <Arrow
            id="leftArrow"
            className={`${styles.arrow} ${styles.left}`}
            onClick={previousProject}
            style={{ display: `${position === 1 ? 'none' : 'block'}` }}
          />
          <div className={styles.cards_container}>
            {/* ////// 15em is the card width. -look styles file- */}
            <div id="cardsWrapper" className={styles.cards_wrapper} style={{ marginLeft: `${-15 * (position - 1)}em` }}>
              {data.list.map((card, index) => (
                <div
                  className={styles.card}
                  key={index}
                  style={{ transform: `${index + 1 === position ? 'scale(1)' : 'scale(.6)'}` }}
                  onClick={() => onCard(index + 1, card.href)}
                >
                  <h1>{card.name}</h1>
                  <div className={`${styles.card_content}`}>
                    <div style={{ backgroundImage: `url(${card.logo})` }}></div>
                    <h2>{card.phrase}</h2>
                    <textarea value={card.description} readOnly />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span className={styles.counter}>{position + '/' + data.list.length}</span>
          <Arrow
            id="rightArrow"
            className={`${styles.arrow}`}
            onClick={nextProject}
            style={{ display: `${position === data.list.length ? 'none' : 'block'}` }}
          />
        </div>
      </section>
    </>
  )
}
