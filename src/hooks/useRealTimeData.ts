import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Tipos para os dados
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

export interface NewsData {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

// Hook para dados de criptomoedas
export const useCryptoData = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = useCallback(async () => {
    try {
      setLoading(true);
      // CoinGecko API pública - mais criptomoedas para scroll
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&ids=bitcoin,ethereum,binancecoin,ripple,cardano,solana,chainlink,polkadot,dogecoin,avalanche-2,shiba-inu,polygon,uniswap,litecoin,cosmos'
      );
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados de criptomoedas');
      console.error('Crypto API error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCryptoData();
    // Atualiza a cada 15 segundos para dados mais em tempo real
    const interval = setInterval(fetchCryptoData, 15000);
    return () => clearInterval(interval);
  }, [fetchCryptoData]);

  return { data, loading, error, refetch: fetchCryptoData };
};

// Hook para dados do clima com geolocalização
export const useWeatherData = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string>('São Paulo');

  // Função para obter localização do usuário
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
        },
        () => {
          // Fallback para São Paulo se não conseguir obter localização
          setUserLocation('São Paulo');
        }
      );
    }
  }, []);

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      // Mock data com localização dinâmica
      setData({
        location: {
          name: userLocation.includes(',') ? 'Sua Localização' : userLocation,
          country: 'Brasil'
        },
        current: {
          temp_c: Math.floor(Math.random() * 15) + 20, // 20-35°C
          condition: {
            text: 'Parcialmente nublado',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
          },
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          wind_kph: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
        }
      });
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do clima');
    } finally {
      setLoading(false);
    }
  }, [userLocation]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    fetchWeatherData();
    // Atualiza a cada 10 minutos
    const interval = setInterval(fetchWeatherData, 600000);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  return { data, loading, error, refetch: fetchWeatherData };
};

// Hook para dominância do Bitcoin
export const useBTCDominance = () => {
  const [dominance, setDominance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ time: string; value: number }>>([]);

  const fetchBTCDominance = useCallback(async () => {
    try {
      setLoading(true);
      // Mock data para BTC dominância - em produção usar API real
      const mockDominance = 45 + Math.random() * 10; // 45-55%
      setDominance(mockDominance);
      
      // Simular histórico para gráfico
      const now = new Date();
      const mockHistory = Array.from({ length: 24 }, (_, i) => {
        const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
        return {
          time: time.toISOString(),
          value: 45 + Math.random() * 10
        };
      });
      setHistory(mockHistory);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dominância do Bitcoin');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBTCDominance();
    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchBTCDominance, 300000);
    return () => clearInterval(interval);
  }, [fetchBTCDominance]);

  return { dominance, history, loading, error, refetch: fetchBTCDominance };
};

// Hook para dados de notícias
export const useNewsData = () => {
  const [data, setData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsData = useCallback(async () => {
    try {
      setLoading(true);
      // Para demonstração, usando dados mock
      // Em produção, usar NewsAPI com chave real
      const mockNews: NewsData[] = [
        {
          title: 'Bitcoin ETFs see $2.4B inflow in single day',
          description: 'Institutional adoption accelerates as major investment firms pour billions into Bitcoin ETFs following regulatory clarity.',
          url: 'https://www.coindesk.com/',
          urlToImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop',
          publishedAt: new Date().toISOString(),
          source: { name: '@WatcherGuru' }
        },
        {
          title: 'Ethereum staking rewards hit 5.2% as network upgrades boost efficiency',
          description: 'Latest protocol improvements drive validator returns to multi-year highs, attracting institutional stakers.',
          url: 'https://www.bloomberg.com/crypto',
          urlToImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop',
          publishedAt: new Date(Date.now() - 1800000).toISOString(),
          source: { name: 'Bloomberg Crypto' }
        },
        {
          title: 'XRP price surges 15% following Ripple partnership with major banks',
          description: 'Cross-border payment adoption accelerates as three major European banks integrate RippleNet infrastructure.',
          url: 'https://www.coindesk.com/',
          urlToImage: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=400&h=200&fit=crop',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: { name: 'CoinDesk' }
        },
        {
          title: 'Solana DeFi TVL breaks $4B milestone amid ecosystem growth',
          description: 'New DeFi protocols and institutional adoption drive Solana Total Value Locked to all-time highs.',
          url: 'https://www.bloomberg.com/crypto',
          urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
          publishedAt: new Date(Date.now() - 5400000).toISOString(),
          source: { name: '@WatcherGuru' }
        },
        {
          title: 'Chainlink CCIP enables $500M in cross-chain transactions',
          description: 'Cross-Chain Interoperability Protocol processes record volume as major DeFi platforms integrate Chainlink infrastructure.',
          url: 'https://www.coindesk.com/',
          urlToImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: { name: 'CoinDesk' }
        }
      ];
      setData(mockNews);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar notícias');
      console.error('News API error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsData();
    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchNewsData, 300000);
    return () => clearInterval(interval);
  }, [fetchNewsData]);

  return { data, loading, error, refetch: fetchNewsData };
};