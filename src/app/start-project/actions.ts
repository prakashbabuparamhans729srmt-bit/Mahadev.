'use server';

import { z } from 'zod';
import { suggestServiceTier, type SuggestServiceTierOutput } from '@/ai/flows/suggest-service-tier';

const FormSchema = z.object({
  projectType: z.string().min(1, 'Project type is required.'),
  requiredFeatures: z.string().min(1, 'Please list at least one feature.'),
  budget: z.string().min(1, 'Budget is required.'),
  timeline: z.string().min(1, 'Timeline is required.'),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  suggestion?: SuggestServiceTierOutput;
  isSuccess: boolean;
};

export async function handleSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    projectType: formData.get('projectType'),
    requiredFeatures: formData.get('requiredFeatures'),
    budget: formData.get('budget'),
    timeline: formData.get('timeline'),
  });
  
  if (!validatedFields.success) {
    return {
      isSuccess: false,
      message: 'Please fill out all fields correctly.',
      fields: Object.fromEntries(formData.entries()) as Record<string, string>,
    };
  }

  try {
    const result = await suggestServiceTier(validatedFields.data);
    return {
      isSuccess: true,
      message: 'Here is your suggested service tier.',
      suggestion: result,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: 'An error occurred while generating the suggestion. Please try again.',
      fields: validatedFields.data,
    };
  }
}
