
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function PlayerProfile() {
  const [level, setLevel] = React.useState(1);
  const [xp, setXp] = React.useState(25);
  const xpToNextLevel = 100;

  return (
    <Card className="w-64 border-0 shadow-none bg-transparent">
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
            <div className='w-full'>
                <div className='flex items-center justify-between mb-1'>
                    <p className="text-sm font-medium">Level {level}</p>
                    <p className="text-xs text-muted-foreground">{xp} / {xpToNextLevel} XP</p>
                </div>
                <Progress value={(xp / xpToNextLevel) * 100} className="h-2" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
