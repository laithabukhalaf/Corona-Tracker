import React, { useEffect, useState } from 'react';
import { fetchDailyData } from '../../api';
import { Bar, Line } from 'react-chartjs-2';

import styles from './Chart.module.css'


const Chart = ({data:{confirmed, deaths, recovered}, country}) => {

    const [dailyData, setDailyData] = useState([]);//=state ={dailyData:{}}//useState=setState

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }


        fetchApi();

    }, []);

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: 'blue',
                        fill: true,

                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5',
                        fill: true,

                    }]
                }}
            />) : null

    );

    const barChart = (
        confirmed ?
            (<Bar data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'people',
                    backgroundColor: ["rgba(0, 0, 255, 0.5)",
                                     " rgba(0, 255, 0, 0.5)",
                                     " rgba(255, 0, 0, 0.5)"
                                    ],
                    data:[confirmed.value, recovered.value, deaths.value]

                }]

            }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `current state in ${country}` },


                }} />) : null
    )
    return (
        <div className={styles.container}>
            {country ? barChart :lineChart}

        </div>
    );
};

export default Chart;