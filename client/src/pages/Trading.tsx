import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getCandlestickData,
  getTradingData,
  getOrderBook,
  getAIAnalysis,
  getAccountSummary,
  getActiveTrades,
  getTechnicalIndicators
} from '@/api/trading';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUp,
  ArrowDown,
  Brain,
  Activity,
  BarChart3,
  ChevronUp,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';

export function Trading() {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');
  const [tradingData, setTradingData] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [accountSummary, setAccountSummary] = useState(null);
  const [activeTrades, setActiveTrades] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);
  const [indicators, setIndicators] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [
        tradingResponse,
        orderBookResponse,
        analysisResponse,
        accountResponse,
        tradesResponse,
        candlesResponse,
        indicatorsResponse
      ] = await Promise.all([
        getTradingData(),
        getOrderBook(),
        getAIAnalysis(),
        getAccountSummary(),
        getActiveTrades(),
        getCandlestickData(selectedSymbol),
        getTechnicalIndicators(selectedSymbol)
      ]);

      setTradingData(tradingResponse.data);
      setOrderBook(orderBookResponse);
      setAiAnalysis(analysisResponse.analysis);
      setAccountSummary(accountResponse.summary);
      setActiveTrades(tradesResponse.trades);
      setCandlestickData(candlesResponse.candles);
      setIndicators(indicatorsResponse.indicators);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [selectedSymbol]);

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      {accountSummary && (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Balance</div>
              <div className="text-2xl font-bold text-yellow-500">
                ${accountSummary.balance.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Equity</div>
              <div className="text-2xl font-bold text-blue-400">
                ${accountSummary.equity.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Margin Available</div>
              <div className="text-2xl font-bold">
                ${accountSummary.marginAvailable.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Unrealized PnL</div>
              <div className={`text-2xl font-bold ${accountSummary.unrealizedPnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${accountSummary.unrealizedPnl.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">Risk Status</div>
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${
                  accountSummary.riskStatus === 'low' ? 'text-green-500' :
                  accountSummary.riskStatus === 'medium' ? 'text-yellow-500' :
                  'text-red-500'
                }`} />
                <span className="text-lg font-bold capitalize">{accountSummary.riskStatus}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground">AI Status</div>
              <div className="flex items-center gap-2">
                <Activity className={`h-5 w-5 ${accountSummary.aiStatus === 'active' ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-lg font-bold capitalize">{accountSummary.aiStatus}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trading Pairs */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {tradingData.map((coin) => (
          <Card
            key={coin.id}
            className={`glassmorphism min-w-[200px] cursor-pointer transition-all hover:neon-border ${
              selectedSymbol === coin.symbol ? 'neon-border' : ''
            }`}
            onClick={() => setSelectedSymbol(coin.symbol)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {coin.symbol}
              </CardTitle>
              <Badge variant={coin.change24h >= 0 ? "default" : "destructive"}>
                {coin.change24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {coin.change24h.toFixed(2)}%
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${coin.price.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Volume: ${coin.volume.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart and Analysis Section */}
        <Card className="glassmorphism lg:col-span-2">
          <CardHeader>
            <CardTitle>Market Analysis - {selectedSymbol}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="candlestick">
              <TabsList className="mb-4">
                <TabsTrigger value="candlestick">Candlestick</TabsTrigger>
                <TabsTrigger value="depth">Market Depth</TabsTrigger>
                <TabsTrigger value="indicators">Indicators</TabsTrigger>
              </TabsList>
              
              <TabsContent value="candlestick">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={candlestickData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                        formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                      />
                      <Bar
                        dataKey="volume"
                        fill="hsl(var(--primary))"
                        opacity={0.3}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="depth">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[...orderBook.bids, ...orderBook.asks].map(([price, volume]) => ({
                        price,
                        volume
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="price" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="indicators">
                {indicators && (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">RSI</div>
                      <div className="h-[100px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[{ value: indicators.rsi }]}>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="hsl(var(--primary))"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">MACD</div>
                      <div className="h-[100px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[indicators.macd]}>
                            <Bar
                              dataKey="histogram"
                              fill={indicators.macd.histogram >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Analysis Panel */}
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aiAnalysis && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-2">Confidence Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${aiAnalysis.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {(aiAnalysis.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Strategy</div>
                  <div className="text-lg font-bold">{aiAnalysis.strategy}</div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Risk Level</div>
                  <Badge variant={
                    aiAnalysis.riskLevel === 'low' ? 'default' :
                    aiAnalysis.riskLevel === 'medium' ? 'secondary' : 'destructive'
                  }>
                    {aiAnalysis.riskLevel.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Analysis</div>
                  <p className="text-sm text-muted-foreground">{aiAnalysis.reasoning}</p>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Target Price</div>
                  <div className="text-2xl font-bold neon-text">
                    ${aiAnalysis.targetPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Trades */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Active Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTrades.map((trade) => (
              <Card key={trade.id} className="glassmorphism">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{trade.symbol}</span>
                        <Badge variant={trade.type === 'long' ? 'default' : 'destructive'}>
                          {trade.type === 'long' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          {trade.leverage}x
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Size: {trade.size} {trade.symbol}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${trade.pnl.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Entry: ${trade.entry.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Take Profit</div>
                      <div className="text-sm font-medium text-green-500">
                        ${trade.takeProfit.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Stop Loss</div>
                      <div className="text-sm font-medium text-red-500">
                        ${trade.stopLoss.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Liquidation</div>
                      <div className="text-sm font-medium text-destructive">
                        ${trade.liquidationPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}