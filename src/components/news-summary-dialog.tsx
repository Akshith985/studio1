
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getNewsSummary } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface NewsSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticker: string;
}

export function NewsSummaryDialog({
  open,
  onOpenChange,
  ticker,
}: NewsSummaryDialogProps) {
  const [summary, setSummary] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (open && ticker) {
      setIsLoading(true);
      setSummary('');
      setError('');
      getNewsSummary(ticker)
        .then(result => {
          if (result.success) {
            setSummary(result.summary);
          } else {
            setError(result.error || 'An unknown error occurred.');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, ticker]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI News Summary for {ticker}</DialogTitle>
          <DialogDescription>
            A summary of recent, financially relevant news, powered by AI.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {summary && (
            <div className="text-sm text-muted-foreground prose dark:prose-invert">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
