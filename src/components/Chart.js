import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              label: 'Cryptocurrency Price',
              data: chartData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Months',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Price',
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <h2>Cryptocurrency Price Chart</h2>
      <canvas ref={chartRef} width="400" height="300"></canvas>
    </div>
  );
};

export default ChartComponent;

