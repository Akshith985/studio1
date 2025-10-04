
'use client';

import * as React from 'react';
import { initialStocks, initialQuests } from '@/lib/data';
import { PlayerHeader } from '@/components/player-header';
import { WorldMap } from '@/components/world-map';
import { BottomNavBar } from '@/components/bottom-nav-bar';
import { QuestBoard } from '@/components/quest-board';
import { StockWatchlist } from '@/components/stock-watchlist';
import { StockChart } from '@/components/stock-chart';

type ActiveView = 'home' | 'quests' | 'market';

export default function Home() {
  const [activeView, setActiveView] = React.useState<ActiveView>('home');

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <WorldMap />;
      case 'quests':
        return (
          <div className="p-4">
            <QuestBoard initialQuests={initialQuests} />
          </div>
        );
      case 'market':
        return (
          <div className="p-4 space-y-4">
            <StockChart stocks={initialStocks} indicators={[]} />
            <StockWatchlist initialData={initialStocks} />
          </div>
        );
      default:
        return <WorldMap />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <PlayerHeader />
      <main className="flex-1 overflow-y-auto pb-20">{renderContent()}</main>
      <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
