
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeMessageProps {
  onDismiss: () => void;
}

export function WelcomeMessage({ onDismiss }: WelcomeMessageProps) {
  return (
    <Card className="max-w-sm animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>
          Your adventure in the world of investment begins now. Are you ready to start your
          journey?
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={onDismiss} className="w-full">
          Let's Go!
        </Button>
      </CardFooter>
    </Card>
  );
}
