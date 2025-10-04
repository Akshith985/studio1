
'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Shield } from 'lucide-react';

export function PlayerHeader() {
  const [level, setLevel] = React.useState(1);
  const [xp, setXp] = React.useState(25);
  const xpToNextLevel = 100;
  const netWorth = 12345.67;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-white/10 bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/50">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Shield />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-headline text-sm font-semibold tracking-wider">
            Investor_One | LVL {level}
          </h2>
          <div className="flex items-center gap-2">
            <Progress
              value={(xp / xpToNextLevel) * 100}
              className="h-2 w-32"
            />
            <span className="text-xs font-mono text-muted-foreground">
              {xp}/{xpToNextLevel} XP
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 text-center">
        <div className="font-headline text-2xl font-bold tracking-tighter text-foreground">
          ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-muted-foreground">Net Worth</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder for settings/quests icons */}
      </div>
    </header>
  );
}
