import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react";
import { useBTCDominance } from "@/hooks/useRealTimeData";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const BTCDominanceCard = () => {
  const { dominance, history, loading, error } = useBTCDominance();

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bitcoin className="h-5 w-5" />
            BTC Dominância
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-12 w-24 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Bitcoin className="h-5 w-5" />
            Erro ao carregar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const isPositive = dominance > 50;

  return (
    <Card className="h-full border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
            <Bitcoin className="h-5 w-5 text-white" />
          </div>
          BTC Dominância
          <Badge variant="secondary" className="ml-auto">
            24h
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-crypto-green" />
            ) : (
              <TrendingDown className="h-5 w-5 text-crypto-red" />
            )}
            <span className="text-3xl font-bold">
              {dominance.toFixed(2)}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {isPositive ? 'Mercado dominado pelo Bitcoin' : 'Altcoins ganhando força'}
          </p>
        </div>

        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis 
                dataKey="time" 
                hide
              />
              <YAxis 
                domain={['dataMin - 2', 'dataMax + 2']}
                hide
              />
              <Tooltip 
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  });
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Dominância']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Força Bitcoin</p>
            <p className="text-lg font-bold text-orange-500">
              {dominance > 50 ? 'Alta' : dominance > 45 ? 'Média' : 'Baixa'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Tendência</p>
            <p className="text-lg font-bold">
              {isPositive ? (
                <span className="text-crypto-green">↗ Subindo</span>
              ) : (
                <span className="text-crypto-red">↘ Descendo</span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};