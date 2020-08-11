import style from './styles.module.sass'

interface Text {
  data: {
    title: string[]
  }
}

function Intro({ data }: Text): JSX.Element {
  return (
    <>
      <div className={`${style.container} container`}>{data.title[0]}</div>
    </>
  )
}

export default Intro
