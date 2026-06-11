'use server';
/**
 * @fileOverview A Genkit flow for summarizing technical research papers or assessments into concise advocacy briefs.
 *
 * - researchPaperSummarizer - A function that handles the research paper summarization process.
 * - ResearchPaperSummarizerInput - The input type for the researchPaperSummarizer function.
 * - ResearchPaperSummarizerOutput - The return type for the researchPaperSummarizer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResearchPaperSummarizerInputSchema = z.object({
  paperContent: z
    .string()
    .describe('The full text content of the technical research paper or assessment.'),
});
export type ResearchPaperSummarizerInput = z.infer<
  typeof ResearchPaperSummarizerInputSchema
>;

const ResearchPaperSummarizerOutputSchema = z.object({
  advocacyBrief: z
    .string()
    .describe('A concise advocacy brief summarizing key findings and recommendations.'),
});
export type ResearchPaperSummarizerOutput = z.infer<
  typeof ResearchPaperSummarizerOutputSchema
>;

const summarizePaperPrompt = ai.definePrompt({
  name: 'summarizePaperPrompt',
  input: { schema: ResearchPaperSummarizerInputSchema },
  output: { schema: ResearchPaperSummarizerOutputSchema },
  prompt: `You are an expert in peace research and advocacy for the Centre for Peace Research and Advocacy (CPRA).
Your task is to summarize the provided technical research paper or assessment into a concise advocacy brief.

The advocacy brief should:
- Be clear, persuasive, and stakeholder-friendly.
- Highlight key findings relevant to CPRA's mission (promoting democracy, human rights, social justice, peacebuilding, climate justice, vulnerable groups).
- Extract and present actionable recommendations.
- Be suitable for quick communication with policymakers, donors, and other stakeholders.

Here is the technical research paper or assessment content:

---
{{{paperContent}}}
---

Generate the advocacy brief now.`,
});

const researchPaperSummarizerFlow = ai.defineFlow(
  {
    name: 'researchPaperSummarizerFlow',
    inputSchema: ResearchPaperSummarizerInputSchema,
    outputSchema: ResearchPaperSummarizerOutputSchema,
  },
  async (input) => {
    const { output } = await summarizePaperPrompt(input);
    if (!output) {
      throw new Error('Failed to generate advocacy brief.');
    }
    return output;
  }
);

export async function researchPaperSummarizer(
  input: ResearchPaperSummarizerInput
): Promise<ResearchPaperSummarizerOutput> {
  return researchPaperSummarizerFlow(input);
}
