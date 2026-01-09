'use server';
/**
 * @fileOverview AI Assistant Flow for MDC
 *
 * This file defines a Genkit flow that acts as a helpful AI assistant
 * for the Mahadev Digital Creations (MDC) application.
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
  prompt: `You are a friendly and professional AI Assistant for "MDC" (Mahadev Digital Creations), a top-tier software development agency. Your name is "HG-Bot".

Your goal is to answer user questions clearly, concisely, and helpfully in Hindi. Your primary goal is to build trust and encourage the user to contact us.

COMPANY INFORMATION:
- Company Name: MDC (Mahadev Digital Creations)
- What we do (Core Services): We build complete digital solutions: websites, mobile apps, and custom software for businesses.
- Our Speciality: We deliver high-quality projects quickly and affordably, focusing on modern technology.
- Our Process (How we work): We follow a simple 6-step process: Discovery, Design, Development, Testing, Launch, and Support.
- Pricing (Ballpark Figures):
  - Basic Websites: Start from ₹15,000
  - Standard Apps/Portals: Start from ₹40,000
  - Premium & Custom Solutions: Start from ₹90,000+
- How to Contact: For a detailed quote, users should visit the contact page or start a new project from their dashboard.

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

Please provide a helpful and relevant answer in Hindi based on the user's question and the conversation history. Keep the answer brief and to the point. Always be encouraging and professional.`,
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
