import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTradingData, getActiveTrades, getAIAnalysis } from '@/api/trading';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Brain } from 'lucide-react';

export function Dashboard() {
  const [tradingData, setTradingData] = useState([]);
  const [activeTrades, setActiveTrades] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [tradingResponse, tradesResponse, analysisResponse] = await Promise.all([
        getTradingData(),
        getActiveTrades(),
        getAIAnalysis()
      ]);
      setTradingData(tradingResponse.data);
      setActiveTrades(tradesResponse.trades);
      setAiAnalysis(analysisResponse.analysis);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tradingData.map((coin) => (
          <Card key={coin.id}>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{trade.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      Entry: ${trade.entry.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${trade.pnl.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {trade.leverage}x
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aiAnalysis && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Confidence</div>
                  <div className="text-sm">{(aiAnalysis.confidence * 100).toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Recommendation</div>
                  <div className="text-lg font-bold">{aiAnalysis.recommendation}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Reasoning</div>
                  <div className="text-sm text-muted-foreground">{aiAnalysis.reasoning}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}