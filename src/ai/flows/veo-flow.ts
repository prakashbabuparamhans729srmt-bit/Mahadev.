
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MediaPart } from 'genkit/cohere';

const VideoOutputSchema = z.object({
  videoUrl: z.string().optional(),
});

export async function generateVideo(imageUrl: string): Promise<{ videoUrl: string | null }> {
  console.log(`Starting video generation with image: ${imageUrl}`);
  
  let { operation } = await ai.generate({
    model: 'googleai/veo-2.0-generate-001',
    prompt: [
      {
        text: 'make the car in the image drive down the road, creating a cinematic shot. the headlights should be on.',
      },
      {
        media: {
          contentType: 'image/jpeg',
          url: imageUrl,
        },
      },
    ],
    config: {
      durationSeconds: 5,
      aspectRatio: '16:9',
    },
  });

  if (!operation) {
    throw new Error('Expected the model to return an operation');
  }

  console.log('Video generation operation started. Polling for completion...');
  
  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    operation = await ai.checkOperation(operation);
    console.log(`Polling... Operation done: ${operation.done}`);
  }

  if (operation.error) {
    console.error('Video generation failed:', operation.error.message);
    throw new Error('Failed to generate video: ' + operation.error.message);
  }

  const videoPart = operation.output?.message?.content.find((p) => !!p.media);
  if (!videoPart || !videoPart.media) {
    console.error('Failed to find generated video in operation output.');
    throw new Error('Failed to find the generated video');
  }

  console.log('Video generated successfully. Fetching video content...');

  const fetch = (await import('node-fetch')).default;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }
  
  const videoDownloadUrl = `${videoPart.media.url}&key=${apiKey}`;
  
  const videoDownloadResponse = await fetch(videoDownloadUrl);
  
  if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
    console.error(`Failed to fetch video. Status: ${videoDownloadResponse.status}`);
    throw new Error('Failed to fetch video');
  }
  
  const buffer = await videoDownloadResponse.arrayBuffer();
  const base64Video = Buffer.from(buffer).toString('base64');
  const videoDataUri = `data:${videoPart.media.contentType || 'video/mp4'};base64,${base64Video}`;
  
  console.log('Video content fetched and converted to data URI.');
  return { videoUrl: videoDataUri };
}
