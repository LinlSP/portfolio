/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from 'react'
import Head from 'next/head'
import styles from './styles.module.sass'
import useObserver from 'customHooks/intersectionObserver'
import Arrow from 'Icons/landing/iosArrow'

// interface myData{
//   "bg": {
//     "url": string
//     "author": string
//   }
// "languages":[
//   {
//     "language": string
//     "level":string
//   }
// ]
//   "charts": {
//     "programming": {
//       "indicators":{
//         "label": string
//         "levels": string[]
//       },
//       "excelent": string[]
//       "really_good": string[]
//       "good":string[]
//     }
//   }
// }

export default function Skills({ data: myData }) {
  const [ref, inSight] = useObserver(0.2)

  const { programming } = myData.charts
  const codingChart = {
    label: programming.indicators.label,
    levels: programming.indicators.levels,
    technologies: [...programming.advanced, ...programming.intermediate, ...programming.beginner],
  }

  const createMySkillsChart = () => {
    const ctx = document.querySelector('#my_skills').getContext('2d')
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: codingChart.technologies,
        datasets: [
          {
            label: codingChart.label,
            backgroundColor: 'rgba(255,255,255,.5)',
            pointBorderColor: 'white',
            data: [
              // Assign value to each technology base on level [from advanced (biggest number) to beginner (lowest number) --- In the same order as codingChart.technologies]
              ...[...Array(programming.advanced.length)].map(() => 3),
              ...[...Array(programming.intermediate.length)].map(() => 2),
              ...[...Array(programming.beginner.length)].map(() => 1),
            ],
          },
        ],
      },

      options: {
        aspectRatio: 1,
        tooltips: {
          enabled: false,
          // callbacks: {
          //   label: function(tooltipItem, data) {
          //       return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          //   }}
        },
        legend: {
          fontSize: 14,
          position: 'top',
          labels: {
            fontColor: 'white',
          },
        },
        scale: {
          gridLines: {
            color: 'white',
          },
          pointLabels: {
            fontColor: 'white',
            fontSize: 13,
          },
          ticks: {
            backdropColor: 'white',
            fontColor: 'black',
            fontSize: 12,
            stepSize: 1,
            min: 0,
            max: codingChart.levels.length,
            callback: function (value, index, values) {
              return codingChart.levels[index - 1]
            },
          },
        },
      },
    })
  }
  useEffect(() => {
    createMySkillsChart()
  }, [])

  if (inSight) {
    document.querySelector('#skills_container').classList.add(styles.grow_animation)
  }

  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
      </Head>
      <section id="skills" className={styles.bg} style={{ backgroundImage: `url(${myData.bg.url})` }}>
        <div id="skills_container" className={`${styles.container} container`} ref={ref}>
          <div className={`${styles.content}`}>
              <div className={`${styles.languages}`}>
                {
                  myData.languages.map(({language, level}, index)=>(
                    <span key={index} className={`${styles.row}`}>
                      <h1>{language}</h1>
                      <Arrow/>
                      <h1>{level}</h1>
                    </span>
                  ))
                }
              </div>
              <canvas id="my_skills" className={`${styles.chart}`}></canvas>
          </div>
        </div>
      </section>
    </>
  )
}
