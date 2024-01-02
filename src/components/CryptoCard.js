import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './CryptoCard.css';

const CryptoCard = ({ crypto }) => {
  const { CoinInfo, chartData } = crypto;
  const chartRef = useRef(null);

  useEffect(() => {
    const renderChart = () => {
      const ctx = chartRef.current.getContext('2d');
      const labels = chartData.map(function(i) {
        return i.time;
      });
      const values = chartData.map(function(i) {
        return i.open;
      });
      return new Chart(ctx, {
        // Replace this with your Chart.js configuration using chartData
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: ``,
              data: values,
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: true,
          pointStyle: false,
          drawActiveElementsOnTop: false,
          stepped: false,
          scales: {
            x: {
              display: false,
              stacked: 'single',

            },
            y: {
              display: false,
            },
          },
        },
      });
    };

    if (chartRef.current && chartData) {
      const chart = renderChart();
      return () => chart.destroy(); // Cleanup: destroy chart instance when unmounting
    }
  }, [CoinInfo.Internal, chartData]);

  return (
    <div className="crypto-card">
      <div className="top-row">
        <div className="left">
          <h3>{CoinInfo.Name}/USD</h3>
        </div>
        <div className="right">
          <p>{crypto.DISPLAY && crypto.DISPLAY.USD && crypto.DISPLAY.USD.CHANGEPCT24HOUR}% · {crypto.DISPLAY && crypto.DISPLAY.USD && crypto.DISPLAY.USD.CHANGE24HOUR}</p>
        </div>
      </div>
      <div className="middle-row">
        <div className="left">
          <p className="price">
            {crypto.DISPLAY && crypto.DISPLAY.USD && crypto.DISPLAY.USD.PRICE}
          </p>
        </div>
        <div className="right">
          <p className="priceHL">H {crypto.DISPLAY && crypto.DISPLAY.USD && crypto.DISPLAY.USD.HIGH24HOUR}</p>
          <p className="priceHL">L {crypto.DISPLAY && crypto.DISPLAY.USD && crypto.DISPLAY.USD.LOW24HOUR}</p>
        </div>
      </div>
      <canvas className="canvas" ref={chartRef}></canvas>
    </div>
  );
};

export default CryptoCard;

