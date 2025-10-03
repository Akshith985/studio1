
'use server';

import { summarizeStockNews } from '@/ai/flows/summarize-stock-news';
import { z } from 'zod';

const TickerSchema = z.string().min(1).max(10);

export async function getNewsSummary(ticker: string) {
  try {
    const validatedTicker = TickerSchema.parse(ticker);
    const result = await summarizeStockNews({ ticker: validatedTicker });
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error('Error getting news summary:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid ticker provided.' };
    }
    return { success: false, error: 'Failed to generate news summary. Please try again later.' };
  }
}
