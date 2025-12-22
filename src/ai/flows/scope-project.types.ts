import { z } from 'zod';

// Define the input schema for the project scoping flow.
export const ProjectScopeInputSchema = z.object({
  description: z
    .string()
    .min(10, 'Please provide a more detailed project description.')
    .describe('A natural language description of the project requirements.'),
});
export type ProjectScopeInput = z.infer<typeof ProjectScopeInputSchema>;

// Define the output schema for the project scoping flow.
export const ProjectScopeOutputSchema = z.object({
  recommendedFeatures: z
    .array(z.string())
    .describe('A list of key features recommended for the project.'),
  estimatedBudget: z
    .string()
    .describe('An estimated budget range for the project (e.g., "₹1,50,000 - ₹3,00,000").'),
  estimatedTimeline: z
    .string()
    .describe('An estimated timeline for project completion (e.g., "8-12 सप्ताह").'),
  techStack: z.object({
    frontend: z.string().describe('Recommended frontend technology.'),
    backend: z.string().describe('Recommended backend technology.'),
    database: z.string().describe('Recommended database technology.'),
    hosting: z.string().describe('Recommended hosting solution.'),
  }).describe('The recommended technology stack for the project.'),
});
export type ProjectScopeOutput = z.infer<typeof ProjectScopeOutputSchema>;
