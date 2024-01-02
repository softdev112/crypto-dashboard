import React, { useEffect, useState } from 'react';
import CryptoCard from './CryptoCard';
import CryptoService from '../services/CryptoService';
import './Dashboard.css';

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cryptocurrencies = await CryptoService.fetchCryptocurrencyData();
      // Fetch market data for each cryptocurrency separately
      const promises = cryptocurrencies.map(async (crypto) => {
        const marketData = await CryptoService.fetchMarketData(crypto.CoinInfo.Internal);
        return {
          ...crypto,
          chartData: marketData, // Assuming the market data structure matches chartData
        };
      });

      const cryptoCardsData = await Promise.all(promises);
      setCryptoData(cryptoCardsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors or display error message in the UI
    }
  };

  return (
    <div className="dashboard">
      <h1>Cryptocurrency Dashboard</h1>
      <div className="crypto-grid">
        {cryptoData.map((crypto, index) => (
          <CryptoCard key={index} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

