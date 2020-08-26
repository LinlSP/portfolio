/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from "react"
import Head from 'next/head'
import styles from './styles.module.sass'

// interface myData{
//   "bg": {
//     "url": string
//     "author": string
//   },
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

export default function Skills({data: myData}) {
  const {programming} = myData.charts
  const codingChart = {
    "label": programming.indicators.label,
    "levels":programming.indicators.levels.reverse(),
    "technologies": [...programming.excelent, ...programming.really_good, ...programming.good]
  }

  const createMySkillsChart = ( )=> {
//     console.log(                [...Array(programming.excelent.length)].map(()=>3)
// )

    const ctx = document.querySelector('#my_skills').getContext('2d')
    new Chart(ctx, {
      type: 'radar',
      data: {
          labels: codingChart.technologies,
          datasets: [{
              label: codingChart.label,
              backgroundColor: 'rgba(0,0,0,.5)',
              pointBorderColor: 'white',
              data: [
                // Assign value to each technology base on level [from excellent (biggest number) to good (lowest number) --- In the same order as codingChart.technologies]
                ...[...Array(programming.excelent.length)].map(()=>3),
                ...[...Array(programming.really_good.length)].map(()=>2),
                ...[...Array(programming.good.length)].map(()=>1)
              ]
            }
        ]
      },
  
      options: {
        tooltips:{
          enabled: false,
          // callbacks: {
          //   label: function(tooltipItem, data) {
          //       return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          //   }}
        },
        legend: {
          position: 'top',
          labels: {
            fontColor: 'white'

          }
        },
        scale: {
          gridLines:{
            color: 'white'
          },
          pointLabels: {
            // fontSize: 5,
            fontColor: 'white'
          },
          ticks: {
            // pointLabels: {
            //   display: true
            // },
            // fontSize: 10,
            stepSize: 1,
            min: 0,
            max: codingChart.levels.length,
            callback: function(value, index, values){
              return  codingChart.levels[index-1]
            }
        }
        }
      }
  });
  }
  useEffect(()=>{
    createMySkillsChart()
  },[])
  return (
    <>
    <Head>
      <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    </Head>
      <section id="skills" className={styles.bg} style={{backgroundImage: `url(${myData.bg.url})`}}>
        <div className={`${styles.container} container`}>
          <canvas id="my_skills"></canvas>

        </div>
      </section>
    </>
  )
}
