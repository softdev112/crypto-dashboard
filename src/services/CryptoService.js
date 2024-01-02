import axios from 'axios';

const BASE_URL = 'https://min-api.cryptocompare.com';
const API_KEY = '239c74a82543c2d8d87d9cc7afbbab894160b409bb8e74199af71ebe88cd17d0';

const CryptoService = {
  fetchCryptocurrencyData: async () => {
    let response = null;
    try {
      response = await axios.get(
        `${BASE_URL}/data/top/mktcapfull?limit=50&tsym=USD&api_key=${API_KEY}`
        , {
        headers: {
          'Accept': 'application/json'
        },
      });
    } catch(error) {
      console.error('Error fetching cryptocurrency data:', error);
      throw error; // Handle error in the calling component if needed
    }
    if (response) {
      console.log(response.data.Data);
      return response.data.Data; // Assuming the response contains an array of cryptocurrency data
    }
  },

  fetchMarketData: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/v2/histominute?fsym=${id}&tsym=USD&limit=100&api_key=${API_KEY}`, {
          headers: {
            'Accept': 'application/json'
          },
        });
        console.log(response.data.Data.Data);
      return response.data.Data.Data; // Modify based on the structure of market data from the API
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error; // Handle error in the calling component if needed
    }
  },
};

export default CryptoService;

