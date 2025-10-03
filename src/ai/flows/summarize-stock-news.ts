'use server';
/**
 * @fileOverview An AI agent that summarizes recent news articles related to a given stock.
 *
 * - summarizeStockNews - A function that summarizes news articles for a given stock.
 * - SummarizeStockNewsInput - The input type for the summarizeStockNews function.
 * - SummarizeStockNewsOutput - The return type for the summarizeStockNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStockNewsInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to summarize news for.'),
});
export type SummarizeStockNewsInput = z.infer<typeof SummarizeStockNewsInputSchema>;

const SummarizeStockNewsOutputSchema = z.object({
  summary: z.string().describe('A summary of recent news articles related to the stock.'),
});
export type SummarizeStockNewsOutput = z.infer<typeof SummarizeStockNewsOutputSchema>;

export async function summarizeStockNews(input: SummarizeStockNewsInput): Promise<SummarizeStockNewsOutput> {
  return summarizeStockNewsFlow(input);
}

const summarizeStockNewsPrompt = ai.definePrompt({
  name: 'summarizeStockNewsPrompt',
  input: {schema: SummarizeStockNewsInputSchema},
  output: {schema: SummarizeStockNewsOutputSchema},
  prompt: `Summarize recent news articles related to {{ticker}}. Focus on information that is likely to be financially relevant to investors.`,
});

const summarizeStockNewsFlow = ai.defineFlow(
  {
    name: 'summarizeStockNewsFlow',
    inputSchema: SummarizeStockNewsInputSchema,
    outputSchema: SummarizeStockNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeStockNewsPrompt(input);
    return output!;
  }
);
