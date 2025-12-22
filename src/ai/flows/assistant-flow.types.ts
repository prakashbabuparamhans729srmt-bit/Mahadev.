import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

// Define the input schema for the assistant flow.
export const AssistantInputSchema = z.object({
  query: z.string().describe('The user\'s current question or message.'),
  history: z
    .array(MessageSchema)
    .describe('The previous conversation history.')
    .optional(),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

// Define the output schema for the assistant flow.
export const AssistantOutputSchema = z.object({
  answer: z
    .string()
    .describe('The AI assistant\'s response to the user\'s query.'),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;
