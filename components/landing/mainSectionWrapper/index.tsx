import { useEffect, useState } from 'react'
import styles from './styles.module.sass'
import SectionIndicator from 'Icons/landing/sectionIndicator'

export default function sideIndicatorWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  const [childrenProps, setChildrenProps] = useState<{ name: string; width: string }[]>([])

  useEffect(() => {
    //////////Initiate progress bar
    const body = document.body,
      html = document.documentElement,
      intro = document.querySelector('#intro'),
      footer = document.querySelector('#footer'),
      mainSectionWrapper = document.querySelector('#mainSection'),
      progressBar: HTMLElement = document.querySelector('#progressBar'),
      height = mainSectionWrapper.clientHeight

    const setProgress = (): void => {
      const externalSections = intro.clientHeight + footer.clientHeight
      const wrapperScrollTop = (html.scrollTop || body.scrollTop) + html.clientHeight - externalSections
      const progress = (wrapperScrollTop / height) * 100
      if (progress >= 0) {
        progressBar.style.width = progress + '%'
      }
    }

    window.addEventListener('scroll', setProgress)
    setProgress()
    ////////
    ///////////find children names(aka id's), calculate width percentage and re-render
    const wrapperChildrenLength = mainSectionWrapper.children.length
    const childrenNamesArray = []
    for (let i = 1; i < wrapperChildrenLength; i++) {
      const child = mainSectionWrapper.children[i]
      const sectionWidth = (child.clientHeight / height) * 100
      const property = {
        name: child.id,
        width: sectionWidth + '%',
      }
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
          <div className="d-flex">
            {childrenProps.map(({ name, width }, index) => (
              <div key={index} className={`${styles.svg_container}`} style={{ width: `${width}` }}>
                <SectionIndicator color="white" />
                {name}
              </div>
            ))}
          </div>
        </div>
        {/* every landing_component must be contained in a section tag with its name as id, in order to let this wrapper be reusable */}
        {children}
      </div>
    </>
  )
}
