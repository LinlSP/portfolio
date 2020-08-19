import Intro from './intro'
import Projects from './projects'
import Skills from './skills'
import Contact from './contact'
import MainSectionWrapper from './mainSection'

import myData from 'languages/english/landing.json'

export default function Landing(): JSX.Element {
  return (
    <>
      <Intro data={myData.intro} />
      <MainSectionWrapper>
        <Projects data={myData.projects} />
        <Skills />
        <Contact />
      </MainSectionWrapper>
    </>
  )
}
