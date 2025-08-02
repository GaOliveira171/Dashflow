import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink, Clock } from "lucide-react";
import { useNewsData } from "@/hooks/useRealTimeData";
import { Skeleton } from "@/components/ui/skeleton";

export const NewsCard = () => {
  const { data, loading, error } = useNewsData();

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedAt = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    return `${Math.floor(diffInHours / 24)}d atrás`;
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Notícias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
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
            <Newspaper className="h-5 w-5" />
            Erro ao carregar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-news-orange/20 bg-gradient-to-br from-card to-news-orange/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-news-orange to-news-orange/80">
            <Newspaper className="h-5 w-5 text-white" />
          </div>
          Notícias
          <Badge variant="secondary" className="ml-auto">
            Atualizadas
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {data.map((article, index) => (
          <div 
            key={index} 
            className="group p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
            onClick={() => window.open(article.url, '_blank')}
          >
            <div className="flex gap-3">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/80/F97316/FFFFFF?text=📰';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{article.source.name}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(article.publishedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};