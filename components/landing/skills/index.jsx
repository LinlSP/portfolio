/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from "react"
import Head from 'next/head'
import styles from './styles.module.sass'
import BgFigure from 'Icons/landing/mainSectionBg'

export default function Skills() {
  const createMySkillsChart = ( )=> {
    const ctx = document.querySelector('#my_skills').getContext('2d')
    new Chart(ctx, {
      type: 'radar',
  
      data: {
          labels: ['React', 'Nodejs', 'Express', 'Lolisimo'],
          datasets: [{
              label: 'Level',
              backgroundColor: 'rgba(0,0,0,.5)',
              pointBorderColor: 'white',
              data: [45.4, 30, 20, 10]
          },{
            label: '2',
            backgroundColor: 'rgba(100,200,123,.5)',
            data: [10, 20, 50, 40]

          }]
      },
  
      options: {
        tooltips:{
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            }}
        },
        legend: {
          position: 'top'
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
            min: 10,
            // fontSize: 10,
            // stepSize: 10,
            max: 50
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
      <section id="skills" className={styles.bg}>
        <BgFigure className={styles.bgFigure} />
        <div className={`${styles.container} container`}>
          <canvas id="my_skills"></canvas>

        </div>
        <BgFigure className={styles.bgFigureLeft} />
      </section>
    </>
  )
}
