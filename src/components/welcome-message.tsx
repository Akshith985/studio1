
'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function WelcomeMessage() {
  return (
    <Card className="max-w-sm animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>
          Your adventure in the world of investment begins now. Are you ready to start your
          journey?
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
