'use server';

/**
 * @fileOverview Suggests the most suitable service tier based on project requirements.
 *
 * - suggestServiceTier - A function that suggests the service tier.
 * - SuggestServiceTierInput - The input type for the suggestServiceTier function.
 * - SuggestServiceTierOutput - The return type for the suggestServiceTier function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestServiceTierInputSchema = z.object({
  projectType: z
    .string()
    .describe('The type of project, e.g., website development, mobile app.'),
  requiredFeatures: z
    .string()
    .describe('A comma-separated list of features required for the project.'),
  budget: z.string().describe('The budget for the project (e.g., ₹15-35K).'),
  timeline: z.string().describe('The desired timeline for the project (e.g., 2-4 सप्ताह).'),
});

export type SuggestServiceTierInput = z.infer<typeof SuggestServiceTierInputSchema>;

const SuggestServiceTierOutputSchema = z.object({
  suggestedTier: z
    .string()
    .describe(
      'The suggested service tier (Basic, Standard, Premium, or Enterprise) based on the project requirements, budget, and timeline.'
    ),
  estimatedTimeline: z
    .string()
    .describe('The estimated timeline for the suggested tier.'),
  estimatedBudget: z
    .string()
    .describe('The estimated budget for the suggested tier.'),
  justification: z
    .string()
    .describe('A brief justification for why this tier is most suitable.'),
});

export type SuggestServiceTierOutput = z.infer<typeof SuggestServiceTierOutputSchema>;

export async function suggestServiceTier(
  input: SuggestServiceTierInput
): Promise<SuggestServiceTierOutput> {
  return suggestServiceTierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestServiceTierPrompt',
  input: {schema: SuggestServiceTierInputSchema},
  output: {schema: SuggestServiceTierOutputSchema},
  prompt: `Based on the project requirements, budget, and timeline, suggest the most suitable service tier (Basic, Standard, Premium, or Enterprise).

Project Type: {{{projectType}}}
Required Features: {{{requiredFeatures}}}
Budget: {{{budget}}}
Timeline: {{{timeline}}}

Consider the following service tiers:

Basic: ₹15-35K, 2-4 weeks, 6-8 static pages, basic design, contact form.
Standard: ₹40-80K, 4-8 weeks, 6-8 pages, client portal, project tracking.
Premium: ₹90K-2L+, 8-16 weeks, all pages, full portal, AI tools, automation, real-time collab.
Enterprise: Custom, 12+ weeks, custom solution, dedicated team, 24/7 support.

{{#if requiredFeatures}}
Given that the client requires these features: {{{requiredFeatures}}},
{{/if}}

Explain why the suggested tier is the best fit.

Output should be a JSON object with "suggestedTier", "estimatedTimeline", "estimatedBudget", and "justification" fields.
`,
});

const suggestServiceTierFlow = ai.defineFlow(
  {
    name: 'suggestServiceTierFlow',
    inputSchema: SuggestServiceTierInputSchema,
    outputSchema: SuggestServiceTierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
