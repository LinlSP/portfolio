import Intro from './intro'
import myData from 'languages/english/landing.json'

export default function Landing(): JSX.Element {
  return (
    <>
      <Intro data={myData.intro} />
    </>
  )
}
