import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './Charts.module.css'; // Import the CSS module

const SparkLine = ({ data, color }) => {
  // Extract x and y values from data
  const xValues = data.map((item) => item.date);
  const yValues = data.map((item) => item.budget);

  // Create a function to filter and show every 5th date label
  const filterLabels = (value, index) => {
    // Show the label if it's the first label or every 5th label
    return index === 0 || (index % 5 === 0 && index < xValues.length - 1) ? value : '';
  };

  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    xaxis: {
      type: 'numeric',
      labels: {
        show: true,
        formatter: filterLabels, // Use the custom filterLabels function
      },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: (value) => {
          return value;
        },
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: [color],
      type: 'solid',
      opacity: 0.5,
    },
    stroke: {
      show: true,
      curve: 'smooth',
      colors: [color],
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="responsive-sparkline">
      <ReactApexChart
        options={options}
        series={[
          {
            name: 'budget',
            data: yValues,
          },
        ]}
        type="area"
      />
    </div>
  );
};

export default SparkLine;
