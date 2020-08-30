import Landing from 'components/landing'
import Footer from 'components/footer'
import Header from 'next/head'
import myData from 'languages/spanish/landing.json'

export default function Home(): JSX.Element {
  return (
    <>
      <Header>
        <title>Líncol Sáenz | Portafolio </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Header>
      <Landing myData={myData} />
      <Footer />
    </>
  )
}
