import { useEffect, useState } from 'react'
import styles from './styles.module.sass'

export default function sideIndicatorWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  const [childrenProps, setChildrenProps] = useState<{ name: string; position: string }[]>([])

  useEffect(() => {
    //////////Initiate progress bar
    const body = document.body,
      html = document.documentElement,
      intro = document.querySelector('#intro'),
      mainSectionWrapper = document.querySelector('#mainSection'),
      progressBar: HTMLElement = document.querySelector('#progressBar'),
      height = mainSectionWrapper.clientHeight

    const setProgress = (): void => {
      const wrapperScrollTop = (html.scrollTop || body.scrollTop) - intro.clientHeight + html.clientHeight
      if (wrapperScrollTop >= 0) {
        const progress = (wrapperScrollTop / height) * 100 + '%'
        progressBar.style.width = progress
      }
    }

    window.addEventListener('scroll', setProgress)
    setProgress()
    ////////
    ///////////find children names(aka id's), calculate position and re-render
    const wrapperChildrenLength = mainSectionWrapper.children.length
    const childrenNamesArray = []
    let prevPosition = 0
    for (let i = 1; i < wrapperChildrenLength; i++) {
      const child = mainSectionWrapper.children[i]
      const positionPercentage = (child.clientHeight / height) * 75
      const property = {
        name: child.id,
        position: positionPercentage + prevPosition + '%',
      }
      prevPosition += positionPercentage
      childrenNamesArray.push(property)
    }
    setChildrenProps(childrenNamesArray)
    ////////
    return () => window.removeEventListener('scroll', setProgress)
  }, [])

  return (
    <>
      <div id="mainSection" className={`${styles.position_relative}`}>
        <div id="progressbar_container" className={`${styles.progressbar_container}`}>
          <hr id="progressBar" />
          {childrenProps.map(({ name, position }, index) => (
            <div className={styles.section_name} style={{ marginLeft: position }} key={index}>
              {name}
            </div>
          ))}
        </div>
        {/* every landing_component must be contained in a section tag with its name as id, in order to make this wrapper reusable */}
        {children}
      </div>
    </>
  )
}
