
'use client';

import { cn } from "@/lib/utils";
import { Home, ShieldCheck, LandPlot, BookOpen } from "lucide-react";

interface BottomNavBarProps {
    activeView: 'home' | 'quests' | 'market' | 'academy';
    setActiveView: (view: 'home' | 'quests' | 'market' | 'academy') => void;
}

export function BottomNavBar({ activeView, setActiveView }: BottomNavBarProps) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'quests', icon: ShieldCheck, label: 'Quests' },
        { id: 'market', icon: LandPlot, label: 'Market' },
        { id: 'academy', icon: BookOpen, label: 'Academy' },
    ] as const;

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t border-white/10 bg-background/95 backdrop-blur">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveView(item.id)}
                        className={cn(
                            "inline-flex flex-col items-center justify-center px-5 hover:bg-primary/10 group",
                            activeView === item.id ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5 mb-1")} />
                        <span className={cn("text-xs")}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
