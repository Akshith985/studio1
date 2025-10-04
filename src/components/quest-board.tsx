'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Quest } from '@/lib/types';

interface QuestBoardProps {
  initialQuests: Quest[];
}

export function QuestBoard({ initialQuests }: QuestBoardProps) {
  const [quests, setQuests] = React.useState(initialQuests);

  const handleCompleteQuest = (id: number) => {
    // In a real app, this would also grant XP and check for level-ups
    setQuests(prevQuests =>
      prevQuests.map(q => (q.id === id ? { ...q, status: 'completed' } : q))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quest Board</CardTitle>
        <CardDescription>
          Complete quests to gain XP, level up, and unlock new features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {quests.map(quest => (
            <AccordionItem value={`item-${quest.id}`} key={quest.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  {quest.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span
                    className={
                      quest.status === 'completed' ? 'line-through text-muted-foreground' : ''
                    }
                  >
                    {quest.title}
                  </span>
                  <Badge variant="outline">+{quest.xp} XP</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col items-start gap-4 pl-11">
                  <p className="text-sm text-muted-foreground">
                    {quest.description}
                  </p>
                  {quest.status === 'available' && (
                    <Button
                      size="sm"
                      onClick={() => handleCompleteQuest(quest.id)}
                    >
                      Complete Quest
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
