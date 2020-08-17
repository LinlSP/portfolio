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
        <Projects />
        <Skills />
        <Contact />
        <section id="hello" style={{ height: '1000px' }}></section>
      </MainSectionWrapper>
    </>
  )
}
