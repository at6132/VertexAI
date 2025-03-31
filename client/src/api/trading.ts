import api from './api';

// Description: Get trading data for all cryptocurrencies
// Endpoint: GET /api/trading/data
// Request: {}
// Response: { data: Array<{ id: string, symbol: string, price: number, volume: number, change24h: number }> }
export const getTradingData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: '1', symbol: 'BTC', price: 43250.23, volume: 28345123, change24h: 2.5 },
          { id: '2', symbol: 'ETH', price: 2250.45, volume: 15234123, change24h: -1.2 },
          { id: '3', symbol: 'XRP', price: 0.5123, volume: 8234567, change24h: 0.8 },
          { id: '4', symbol: 'ADA', price: 0.4521, volume: 5234567, change24h: -0.5 },
          { id: '5', symbol: 'SHIB', price: 0.00001234, volume: 4234567, change24h: 5.2 },
          { id: '6', symbol: 'DOGE', price: 0.0721, volume: 3234567, change24h: 1.3 },
          { id: '7', symbol: 'TON', price: 2.12, volume: 2234567, change24h: -2.1 }
        ]
      });
    }, 500);
  });
};

// Description: Get portfolio performance data
// Endpoint: GET /api/trading/performance
// Request: {}
// Response: { data: Array<{ timestamp: string, balance: number, pnl: number }> }
export const getPerformanceData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({ length: 30 }, (_, i) => ({
          timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
          balance: 10000 + Math.random() * 5000,
          pnl: Math.random() * 200 - 100
        }))
      });
    }, 500);
  });
};

// Description: Get active trades
// Endpoint: GET /api/trading/active-trades
// Request: {}
// Response: { trades: Array<{ id: string, symbol: string, type: 'long' | 'short', entry: number, current: number, pnl: number, leverage: number, liquidationPrice: number, stopLoss: number, takeProfit: number, size: number }> }
export const getActiveTrades = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trades: [
          {
            id: '1',
            symbol: 'BTC',
            type: 'long',
            entry: 42100,
            current: 43250.23,
            pnl: 234.56,
            leverage: 15,
            liquidationPrice: 38750,
            stopLoss: 41800,
            takeProfit: 43200,
            size: 0.5
          },
          {
            id: '2',
            symbol: 'ETH',
            type: 'short',
            entry: 2300,
            current: 2250.45,
            pnl: 89.12,
            leverage: 10,
            liquidationPrice: 2850,
            stopLoss: 2980,
            takeProfit: 3200,
            size: 2
          }
        ]
      });
    }, 500);
  });
};

// Description: Get trading history
// Endpoint: GET /api/trading/history
// Request: {}
// Response: { trades: Array<{ id: string, symbol: string, type: 'long' | 'short', entry: number, exit: number, pnl: number, leverage: number, timestamp: string }> }
export const getTradingHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trades: [
          { id: '1', symbol: 'BTC', type: 'long', entry: 41000, exit: 43000, pnl: 487.23, leverage: 10, timestamp: '2024-01-20T10:30:00Z' },
          { id: '2', symbol: 'ETH', type: 'short', entry: 2400, exit: 2300, pnl: 123.45, leverage: 15, timestamp: '2024-01-19T15:45:00Z' },
          { id: '3', symbol: 'XRP', type: 'long', entry: 0.45, exit: 0.48, pnl: 67.89, leverage: 20, timestamp: '2024-01-18T09:15:00Z' }
        ]
      });
    }, 500);
  });
};

// Description: Get AI analysis
// Endpoint: GET /api/trading/ai-analysis
// Request: {}
// Response: { analysis: { confidence: number, recommendation: string, reasoning: string, riskLevel: 'low' | 'medium' | 'high', strategy: string, targetPrice: number } }
export const getAIAnalysis = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analysis: {
          confidence: 0.89,
          recommendation: "Opening long position on BTC",
          reasoning: "Detected high-volume breakout at BTC $42,500 with strong momentum indicators. RSI showing bullish divergence with increased buying pressure.",
          riskLevel: "low",
          strategy: "Breakout scalping with trend following",
          targetPrice: 43200
        }
      });
    }, 500);
  });
};

// Description: Get account summary
// Endpoint: GET /api/trading/account
// Request: {}
// Response: { summary: { balance: number, equity: number, marginAvailable: number, unrealizedPnl: number, riskStatus: 'low' | 'medium' | 'high', aiStatus: 'active' | 'paused' } }
export const getAccountSummary = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: {
          balance: 100000,
          equity: 105234.56,
          marginAvailable: 75000,
          unrealizedPnl: 5234.56,
          riskStatus: 'low',
          aiStatus: 'active'
        }
      });
    }, 500);
  });
};

// Description: Get order book data
// Endpoint: GET /api/trading/orderbook
// Request: {}
// Response: { bids: Array<[number, number]>, asks: Array<[number, number]> }
export const getOrderBook = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bids: Array.from({ length: 10 }, (_, i) => [42000 - i * 10, Math.random() * 10]),
        asks: Array.from({ length: 10 }, (_, i) => [42100 + i * 10, Math.random() * 10])
      });
    }, 500);
  });
};

// Description: Get candlestick data
// Endpoint: GET /api/trading/candles
// Request: { symbol: string, interval: string }
// Response: { candles: Array<{ timestamp: number, open: number, high: number, low: number, close: number, volume: number }> }
export const getCandlestickData = (symbol: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        candles: Array.from({ length: 100 }, (_, i) => {
          const basePrice = symbol === 'BTC' ? 42000 : 2200;
          const timestamp = Date.now() - (99 - i) * 60 * 1000;
          const randomChange = (Math.random() - 0.5) * 100;
          const open = basePrice + randomChange;
          const close = open + (Math.random() - 0.5) * 50;
          const high = Math.max(open, close) + Math.random() * 25;
          const low = Math.min(open, close) - Math.random() * 25;
          return {
            timestamp,
            open,
            high,
            low,
            close,
            volume: Math.random() * 100
          };
        })
      });
    }, 500);
  });
};

// Description: Get technical indicators
// Endpoint: GET /api/trading/indicators
// Request: { symbol: string }
// Response: { indicators: { rsi: number, macd: { value: number, signal: number, histogram: number }, bb: { upper: number, middle: number, lower: number } } }
export const getTechnicalIndicators = (symbol: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        indicators: {
          rsi: 45 + Math.random() * 10,
          macd: {
            value: Math.random() * 2 - 1,
            signal: Math.random() * 2 - 1,
            histogram: Math.random() * 0.5 - 0.25
          },
          bb: {
            upper: 43000 + Math.random() * 200,
            middle: 42500 + Math.random() * 100,
            lower: 42000 + Math.random() * 200
          }
        }
      });
    }, 500);
  });
};