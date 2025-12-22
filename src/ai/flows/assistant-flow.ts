'use server';
/**
 * @fileOverview AI Assistant Flow for HG Hub
 *
 * This file defines a Genkit flow that acts as a helpful AI assistant
 * for the Hajaro Grahako (HG Hub) application.
 */

import { ai } from '@/ai/genkit';
import {
  AssistantInputSchema,
  AssistantOutputSchema,
  type AssistantInput,
  type AssistantOutput,
} from './assistant-flow.types';

// Define the Genkit prompt with structured input and output.
const assistantPrompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AssistantInputSchema },
  output: { schema: AssistantOutputSchema },
  prompt: `You are a friendly and professional AI Assistant for "HG Hub" by Hajaro Grahako, a top-tier software development agency. Your name is "HG-Bot".

Your goal is to answer user questions clearly and concisely in Hindi.

COMPANY INFORMATION:
- What we do: We build complete digital solutions: websites, mobile apps, and custom software.
- Services & Pricing Tiers:
  - Basic (₹15-35K, 2-4 weeks): 6-8 page websites with basic design.
  - Standard (₹40-80K, 4-8 weeks): Adds a client portal and project tracking.
  - Premium (₹90K-2L+, 8-16 weeks): Full portal, AI tools, automation, real-time collaboration.
  - Enterprise (Custom Price, 12+ weeks): Custom solutions with a dedicated team and 24/7 support.
- Process: 6 steps - Discovery, Design, Development, Testing, Launch, Support.
- Contact: Users can go to the contact page or call +91-XXXXXXXXXX.

PREVIOUS CONVERSATION:
{{#if history}}
{{#each history}}
- {{role}}: {{content}}
{{/each}}
{{else}}
This is the beginning of the conversation.
{{/if}}

USER'S CURRENT QUESTION:
"{{query}}"

Please provide a helpful and relevant answer in Hindi based on the user's question and the conversation history. Keep the answer brief and to the point.`,
});

// Define the main Genkit flow.
const assistantFlowCore = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    const { output } = await assistantPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return { answer: output.answer };
  }
);

/**
 * Server Action wrapper for the assistantFlow.
 * This function is called from the client-side UI.
 * @param input The user's query and conversation history.
 * @returns The AI's answer.
 */
export async function assistantFlow(
  input: AssistantInput
): Promise<AssistantOutput> {
  return await assistantFlowCore(input);
}
