
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lock } from 'lucide-react';

export function WorldMap() {
    return (
        <div className="p-4 sm:p-6">
            <Card className="border-primary/20 bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline tracking-wider">Progression Map</CardTitle>
                    <CardDescription>Your journey through the world of investment.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative flex flex-col items-center justify-center space-y-8 py-10">
                        {/* Dotted lines connecting nodes */}
                        <div className="absolute top-0 h-full w-0.5 border-l-2 border-dashed border-muted-foreground/30"></div>

                        {/* Node 1: Starting Town (Unlocked) */}
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/20 shadow-lg shadow-primary/20">
                                <span className="font-bold text-primary-foreground">Start</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Beginner Zone</h3>
                                <p className="text-sm text-muted-foreground">Basic ETFs & Market Concepts</p>
                            </div>
                        </div>

                        {/* Node 2: Individual Stocks (Unlocked) */}
                        <div className="relative z-10 flex items-center gap-4">
                             <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full border-2 border-accent bg-accent/20 shadow-lg shadow-accent/30">
                                <span className="font-bold text-accent-foreground">Here</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Individual Stocks</h3>
                                <p className="text-sm text-muted-foreground">You are here!</p>
                            </div>
                        </div>

                        {/* Node 3: Advanced Analysis (Locked) */}
                         <div className="relative z-10 flex items-center gap-4 opacity-50">
                             <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-muted-foreground/50 bg-muted/20">
                                <Lock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Advanced Analysis</h3>
                                <p className="text-sm text-muted-foreground">Level 5 Required</p>
                            </div>
                        </div>
                        
                         {/* Node 4: Options (Locked) */}
                         <div className="relative z-10 flex items-center gap-4 opacity-50">
                             <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-muted-foreground/50 bg-muted/20">
                                <Lock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Options Trading</h3>
                                <p className="text-sm text-muted-foreground">Level 10 Required</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
