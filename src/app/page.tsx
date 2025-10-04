
'use client';

import * as React from 'react';
import { StockWatchlist } from '@/components/stock-watchlist';
import { initialStocks, initialQuests } from '@/lib/data';
import { Gem, PanelLeft, LineChart, List, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { StockChart } from '@/components/stock-chart';
import { PlayerProfile } from '@/components/player-profile';
import { QuestBoard } from '@/components/quest-board';
import { TechnicalAnalysisControls } from '@/components/technical-analysis-controls';
import type { Stock, Indicator, ScreenerFilter } from '@/lib/types';


type ActiveView = 'chart' | 'watchlist' | 'analysis';

export default function Home() {
  const [activeView, setActiveView] = React.useState<ActiveView>('chart');
  const [activeIndicators, setActiveIndicators] = React.useState<Indicator[]>([]);
  const [activeFilters, setActiveFilters] = React.useState<ScreenerFilter[]>([]);

  const handleUpdateIndicators = (indicators: Indicator[]) => {
    setActiveIndicators(indicators);
    setActiveView('chart');
  };

  const handleUpdateFilters = (filters: ScreenerFilter[]) => {
    setActiveFilters(filters);
    setActiveView('watchlist'); 
  };
  
  const filteredStocks = React.useMemo(() => {
    if (activeFilters.length === 0) {
      return initialStocks;
    }
    
    return initialStocks.filter(stock => {
      return activeFilters.every(filter => {
        if (filter.indicator === 'price') {
            const price = stock.price;
            const filterValue = Number(filter.value);
            switch (filter.condition) {
                case 'gt': return price > filterValue;
                case 'lt': return price < filterValue;
                case 'eq': return price === filterValue;
                default: return true;
            }
        }
        return true;
      });
    });
  }, [activeFilters]);


  const renderContent = () => {
    switch (activeView) {
      case 'chart':
        return <StockChart stocks={filteredStocks} indicators={activeIndicators} />;
      case 'watchlist':
        return <StockWatchlist initialData={filteredStocks} />;
      case 'analysis':
        return <TechnicalAnalysisControls onUpdateIndicators={handleUpdateIndicators} onUpdateFilters={handleUpdateFilters}/>;
      default:
        return <StockChart stocks={filteredStocks} indicators={activeIndicators} />;
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-background/95 px-4 backdrop-blur sm:px-6">
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
                <Gem className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">TradeQuest</span>
              </div>
               <div className="mt-6">
                <QuestBoard initialQuests={initialQuests} />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="relative flex-1">
          <h1 className="font-headline text-lg font-semibold md:text-xl">
            TradeQuest
          </h1>
        </div>
        <div className="relative ml-auto flex-none">
          <PlayerProfile />
        </div>
      </header>
       <main className="flex flex-1">
        <aside className="hidden w-80 flex-col border-r border-white/10 p-4 lg:flex">
           <QuestBoard initialQuests={initialQuests} />
        </aside>
        <div className="flex-1 p-4 sm:p-6">
           <div className="mb-4 flex items-center gap-2">
            <Button variant={activeView === 'chart' ? 'default' : 'outline'} onClick={() => setActiveView('chart')}>
              <LineChart />
              Chart
            </Button>
            <Button variant={activeView === 'watchlist' ? 'default' : 'outline'} onClick={() => setActiveView('watchlist')}>
              <List />
              Watchlist
            </Button>
            <Button variant={activeView === 'analysis' ? 'default' : 'outline'} onClick={() => setActiveView('analysis')}>
              <BarChart2 />
              Analysis
            </Button>
          </div>
          <div className="h-[calc(100%-48px)]">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
