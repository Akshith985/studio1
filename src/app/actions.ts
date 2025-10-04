
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

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'M6Y34XNJC64B7KYP';

export async function getStockQuote(ticker: string) {
  try {
    const validatedTicker = TickerSchema.parse(ticker);
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${validatedTicker}&apikey=${API_KEY}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'request',
      },
      // Revalidate every 60 seconds
      next: { revalidate: 60 } 
    });
    
    if (!response.ok) {
      return { success: false, error: `API request failed with status: ${response.status}` };
    }

    const data = await response.json();

    if (data['Error Message']) {
      return { success: false, error: `API Error: ${data['Error Message']}` };
    }
    
    const quote = data['Global Quote'];
    if (!quote || Object.keys(quote).length === 0) {
      return { success: false, error: 'No data found for this ticker. The API may have rate limits.' };
    }

    const price = parseFloat(quote['05. price']);
    const change = parseFloat(quote['09. change']);
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));

    return {
      success: true,
      data: {
        ticker: quote['01. symbol'],
        price,
        change,
        changePercent,
      },
    };

  } catch (error) {
    console.error('Error fetching stock quote:', error);
     if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid ticker provided.' };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
