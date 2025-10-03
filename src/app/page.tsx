import { StockWatchlist } from '@/components/stock-watchlist';
import { initialStocks } from '@/lib/data';
import { Activity, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { StockChart } from '@/components/stock-chart';
import { NewsFeed } from '@/components/news-feed';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Activity className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">StockWatch</span>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="relative ml-auto flex-1 md:grow-0">
          <h1 className="text-lg font-semibold md:text-2xl">StockWatch</h1>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="watchlist">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="chart">Stock Chart</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="watchlist">
             <StockWatchlist initialData={initialStocks} />
          </TabsContent>
          <TabsContent value="chart">
             <StockChart ticker="AAPL" initialPrice={172.45} />
          </TabsContent>
          <TabsContent value="news">
             <NewsFeed />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
