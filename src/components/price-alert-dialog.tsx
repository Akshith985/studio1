
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const priceAlertSchema = z.object({
  price: z.coerce.number().positive('Price must be a positive number'),
});

type PriceAlertFormValues = z.infer<typeof priceAlertSchema>;

interface PriceAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticker: string;
}

export function PriceAlertDialog({
  open,
  onOpenChange,
  ticker,
}: PriceAlertDialogProps) {
  const { toast } = useToast();
  const form = useForm<PriceAlertFormValues>({
    resolver: zodResolver(priceAlertSchema),
    defaultValues: {
      price: 0,
    },
  });

  const onSubmit = (data: PriceAlertFormValues) => {
    toast({
      title: 'Alert Set!',
      description: `You will be notified when ${ticker} reaches $${data.price.toFixed(2)}.`,
    });
    form.reset();
    onOpenChange(false);
  };
  
  React.useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Price Alert for {ticker}</DialogTitle>
          <DialogDescription>
            Get a notification when the stock price hits your target.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 180.50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Set Alert</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
