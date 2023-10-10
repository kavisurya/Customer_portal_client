// Updated Pie component
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Pie = ({ budget, expense }) => {
  const chartData = [budget, expense];

  const options = {
    labels: ['Budget', 'Expense'],
    colors: ['#00C292', '#E46A76'], // Customize the colors here
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        dataLabels: {
          // Position the values inside the pie chart's center
          position: 'bottom',
        },
      },
    },
    responsive: [
      {
        breakpoint: 300,
        options: {
          chart: {
            width: '100%', // Set the chart width to 100% to match its container
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="pie-chart-container"> 
      <ReactApexChart
        options={options}
        series={chartData}
        type="donut"
        height="250"
        width="100%"  
      />
    </div>
  );
};

export default Pie;
