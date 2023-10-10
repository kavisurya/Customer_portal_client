import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './Charts.module.css'; // Import the CSS module

const Stacked = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: data[0].x,
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: ['#008FFB', '#00E396', '#FEB019'],
  };

  return (
    <div className={styles['apex-chart-container']}>
      <ReactApexChart
        options={options}
        series={data}
        type="bar"
        height="100%" // Set the height to 100% for responsiveness
      />
    </div>
  );
};

export default Stacked;
