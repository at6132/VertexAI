import { useEffect, useState } from 'react';
import { getTradingHistory } from '@/api/trading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function History() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTradingHistory();
      setTrades(response.trades);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Exit</TableHead>
              <TableHead>Leverage</TableHead>
              <TableHead className="text-right">PnL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>
                  {new Date(trade.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell>{trade.symbol}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {trade.type === 'long' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    {trade.type}
                  </div>
                </TableCell>
                <TableCell>${trade.entry.toLocaleString()}</TableCell>
                <TableCell>${trade.exit.toLocaleString()}</TableCell>
                <TableCell>{trade.leverage}x</TableCell>
                <TableCell className={`text-right ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${trade.pnl.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}