import { StockWatchlist } from '@/components/stock-watchlist';
import { initialStocks, initialQuests } from '@/lib/data';
import { Gem, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { StockChart } from '@/components/stock-chart';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { PlayerProfile } from '@/components/player-profile';
import { QuestBoard } from '@/components/quest-board';
import { TechnicalAnalysisControls } from '@/components/technical-analysis-controls';

export default function Home() {
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
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="quests">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="quests">Quests</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="chart">Stock Chart</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="quests">
             <QuestBoard initialQuests={initialQuests} />
          </TabsContent>
          <TabsContent value="watchlist">
             <StockWatchlist initialData={initialStocks} />
          </TabsContent>
          <TabsContent value="chart">
             <StockChart stocks={initialStocks} />
          </TabsContent>
          <TabsContent value="analysis">
             <TechnicalAnalysisControls />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
