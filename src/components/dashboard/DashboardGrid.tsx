import { useState, useCallback } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { CryptoCard } from './CryptoCard';
import { WeatherCard } from './WeatherCard';
import { NewsCard } from './NewsCard';
import { BTCDominanceCard } from './BTCDominanceCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Settings, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Removendo imports de CSS problemáticos - estilos serão adicionados no index.css

const ResponsiveGridLayout = WidthProvider(Responsive);

// Layout inicial do grid
const initialLayouts: { [key: string]: Layout[] } = {
  lg: [
    { i: 'crypto', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 8 },
    { i: 'btc-dominance', x: 8, y: 0, w: 4, h: 10, minW: 4, minH: 8 },
    { i: 'news', x: 0, y: 10, w: 12, h: 8, minW: 8, minH: 6 },
    { i: 'weather', x: 0, y: 18, w: 6, h: 8, minW: 4, minH: 6 },
    { i: 'analytics', x: 6, y: 18, w: 6, h: 8, minW: 4, minH: 6 }
  ],
  md: [
    { i: 'crypto', x: 0, y: 0, w: 8, h: 10, minW: 6, minH: 8 },
    { i: 'btc-dominance', x: 8, y: 0, w: 4, h: 10, minW: 4, minH: 8 },
    { i: 'news', x: 0, y: 10, w: 12, h: 8, minW: 8, minH: 6 },
    { i: 'weather', x: 0, y: 18, w: 6, h: 8, minW: 4, minH: 6 },
    { i: 'analytics', x: 6, y: 18, w: 6, h: 8, minW: 4, minH: 6 }
  ],
  sm: [
    { i: 'crypto', x: 0, y: 0, w: 12, h: 10, minW: 6, minH: 8 },
    { i: 'btc-dominance', x: 0, y: 10, w: 12, h: 8, minW: 4, minH: 8 },
    { i: 'news', x: 0, y: 18, w: 12, h: 8, minW: 8, minH: 6 },
    { i: 'weather', x: 0, y: 26, w: 12, h: 8, minW: 4, minH: 6 },
    { i: 'analytics', x: 0, y: 34, w: 12, h: 8, minW: 4, minH: 6 }
  ]
};

// Componente de Analytics simulado
const AnalyticsCard = () => {
  return (
    <Card className="h-full border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Settings className="h-5 w-5 text-white" />
          </div>
          Analytics
          <Badge variant="secondary" className="ml-auto">
            Demo
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-primary">1.2K</p>
            <p className="text-sm text-muted-foreground">Visualizações</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-success">+15%</p>
            <p className="text-sm text-muted-foreground">Crescimento</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-warning">24h</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardGrid = () => {
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>(initialLayouts);
  const [isEditMode, setIsEditMode] = useState(false);

  const onLayoutChange = useCallback((layout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
  }, []);

  const resetLayouts = () => {
    setLayouts(initialLayouts);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const forceRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header do Dashboard */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            CryptoVision Pro
          </h1>
          <p className="text-muted-foreground">
            Seu centro de comando financeiro - Crypto em tempo real, Clima global e Notícias confiáveis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isEditMode ? "default" : "secondary"}>
            {isEditMode ? "Modo Edição" : "Modo Visualização"}
          </Badge>
          <Button
            variant={isEditMode ? "default" : "outline"}
            size="sm"
            onClick={toggleEditMode}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditMode ? "Finalizar" : "Editar Layout"}
          </Button>
          <Button variant="outline" size="sm" onClick={resetLayouts}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Resetar
          </Button>
          <Button variant="outline" size="sm" onClick={forceRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Grid Layout Responsivo */}
      <ResponsiveGridLayout
        className={`layout ${isEditMode ? 'edit-mode' : ''}`}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 12 }}
        rowHeight={30}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
      >
        <div key="crypto">
          <CryptoCard />
        </div>
        <div key="btc-dominance">
          <BTCDominanceCard />
        </div>
        <div key="news">
          <NewsCard />
        </div>
        <div key="weather">
          <WeatherCard />
        </div>
        <div key="analytics">
          <AnalyticsCard />
        </div>
      </ResponsiveGridLayout>

      {/* Instruções quando em modo de edição */}
      {isEditMode && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-primary">
              <Settings className="h-5 w-5" />
              <span className="font-medium">Modo de Edição Ativo</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Arraste os cards para reorganizar o layout. Redimensione usando os cantos dos cards.
              Clique em "Finalizar" quando terminar.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Rodapé com informações */}
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Dashboard criado com React, TailwindCSS e react-grid-layout. 
          Dados atualizados automaticamente.
        </p>
      </footer>
    </div>
  );
};