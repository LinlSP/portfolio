/* eslint-disable @typescript-eslint/no-explicit-any */
import Intro from './intro'
import Projects from './projects'
import Skills from './skills'
import Contact from './contact'
import MainSectionWrapper from './mainSectionWrapper'

interface myData {
  intro: any
  siteIndicator: any
  projects: any
  skills: any
  contact: any
}

export default function Landing({ myData }: { myData: myData }): JSX.Element {
  return (
    <>
      <Intro data={myData.intro} />
      <MainSectionWrapper data={myData.siteIndicator}>
        <Projects data={myData.projects} />
        <Skills data={myData.skills} />
        <Contact data={myData.contact} />
      </MainSectionWrapper>
    </>
  )
}
