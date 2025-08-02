import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Coins } from "lucide-react";
import { useCryptoData } from "@/hooks/useRealTimeData";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CryptoCard = () => {
  const { data, loading, error } = useCryptoData();

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Criptomoedas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Coins className="h-5 w-5" />
            Erro ao carregar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // Organizar dados por preço (maior para menor)
  const sortedData = data.sort((a, b) => b.current_price - a.current_price);

  return (
    <Card className="h-full border-crypto-green/20 bg-gradient-to-br from-card to-crypto-green/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-crypto-green to-crypto-green/80">
            <Coins className="h-5 w-5 text-white" />
          </div>
          Criptomoedas
          <Badge variant="secondary" className="ml-auto">
            Tempo Real
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-6 py-4">
          <div className="space-y-3">
            {sortedData.map((crypto) => (
              <div key={crypto.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <div className="flex items-center gap-3">
                  <img 
                    src={crypto.image} 
                    alt={crypto.name}
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/32/8B5CF6/FFFFFF?text=${crypto.symbol[0]}`;
                    }}
                  />
                  <div>
                    <p className="font-medium">{crypto.symbol.toUpperCase()}</p>
                    <p className="text-sm text-muted-foreground">{crypto.name}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">${crypto.current_price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Cap: ${(crypto.market_cap / 1e9).toFixed(1)}B
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    {crypto.price_change_percentage_24h > 0 ? (
                      <TrendingUp className="h-3 w-3 text-crypto-green" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-crypto-red" />
                    )}
                    <span className={`text-sm ${crypto.price_change_percentage_24h > 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};