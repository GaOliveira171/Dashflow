import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Droplets, Wind, MapPin, TrendingUp, Bitcoin } from "lucide-react";
import { useWeatherData, useBTCDominance } from "@/hooks/useRealTimeData";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const WeatherCard = () => {
  const { data, loading, error } = useWeatherData();

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Clima
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-8 w-24 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Cloud className="h-5 w-5" />
            Erro ao carregar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="h-full border-weather-blue/20 bg-gradient-to-br from-card to-weather-blue/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-weather-blue to-weather-blue/80">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          Clima
          <Badge variant="secondary" className="ml-auto">
            Atual
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {data.location.name}, {data.location.country}
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <img 
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
              className="h-16 w-16"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/64/3B82F6/FFFFFF?text=☀️';
              }}
            />
            <div>
              <p className="text-4xl font-bold">{data.current.temp_c}°C</p>
              <p className="text-muted-foreground">{data.current.condition.text}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Droplets className="h-4 w-4 text-weather-blue" />
              <span className="text-sm text-muted-foreground">Umidade</span>
            </div>
            <p className="text-2xl font-bold">{data.current.humidity}%</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wind className="h-4 w-4 text-weather-blue" />
              <span className="text-sm text-muted-foreground">Vento</span>
            </div>
            <p className="text-2xl font-bold">{data.current.wind_kph} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};