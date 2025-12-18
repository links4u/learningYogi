import axios from 'axios';
import fs from 'fs/promises';
import { config } from '../config/env';
import logger from '../utils/logger';
import { Timetable } from '../utils/schema.validator';

/**
 * LLM service for vision-based timetable extraction
 * Uses OpenAI GPT-4o Vision API
 */
export class LLMService {
    private readonly apiKey: string;
    private readonly model: string;
    private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

    constructor() {
        this.apiKey = config.openai.apiKey;
        this.model = config.openai.model;
    }

    /**
     * Sample prompt for timetable extraction
     * This is a few-shot prompt with examples
     */
    private readonly EXTRACTION_PROMPT = `You are an expert at extracting structured timetable data from images and documents.

Your task is to analyze the provided timetable image and extract ALL schedule information into a structured JSON format.

CRITICAL RULES:
1. Extract EVERY time block you can see
2. Convert all times to HH:MM format (24-hour)
3. Identify the subject/class name for each block
4. Assign a confidence score (0.0-1.0) based on how clearly you can read each entry
5. If a day has no classes, include it with an empty blocks array
6. Preserve the exact day names as shown (Monday, Tuesday, etc.)

OUTPUT FORMAT (JSON):
{
  "timetableId": "00000000-0000-0000-0000-000000000000",
  "days": [
    {
      "day": "Monday",
      "blocks": [
        {
          "start": "08:55",
          "end": "10:10",
          "subject": "Mathematics",
          "notes": "",
          "confidence": 0.95
        }
      ]
    }
  ]
}

EXAMPLE INPUT: A timetable showing Monday with Math at 9:00-10:00 and English at 10:15-11:15

EXAMPLE OUTPUT:
{
  "timetableId": "00000000-0000-0000-0000-000000000000",
  "days": [
    {
      "day": "Monday",
      "blocks": [
        {
          "start": "09:00",
          "end": "10:00",
          "subject": "Mathematics",
          "notes": "",
          "confidence": 0.98
        },
        {
          "start": "10:15",
          "end": "11:15",
          "subject": "English",
          "notes": "",
          "confidence": 0.97
        }
      ]
    }
  ]
}

Now analyze the provided timetable image and return ONLY the JSON output, no other text.`;

    /**
     * Extracts timetable data from an image using GPT-4o Vision
     * @param imagePath - Path to the image file
     * @returns Partial timetable data (without timetableId)
     */
    async extractFromImage(imagePath: string): Promise<Partial<Timetable>> {
        try {
            logger.info(`Extracting timetable from image using LLM: ${imagePath}`);

            // Read image and convert to base64
            const imageBuffer = await fs.readFile(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const mimeType = this.getMimeType(imagePath);

            // Call OpenAI API
            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: this.EXTRACTION_PROMPT,
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: `data:${mimeType};base64,${base64Image}`,
                                    },
                                },
                            ],
                        },
                    ],
                    max_tokens: 4096,
                    temperature: 0.1, // Low temperature for consistent extraction
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );

            const content = response.data.choices[0]?.message?.content;
            if (!content) {
                throw new Error('No content in LLM response');
            }

            logger.info('LLM extraction completed successfully');

            // Parse JSON from response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in LLM response');
            }

            const parsedData = JSON.parse(jsonMatch[0]);
            return parsedData;
        } catch (error) {
            logger.error('LLM extraction failed:', error instanceof Error ? error.message : 'Unknown error');
            throw new Error(
                `LLM extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    /**
     * Attempts to repair invalid JSON using LLM
     * @param invalidJson - The invalid JSON string
     * @returns Repaired timetable data
     */
    async repairJson(invalidJson: string): Promise<Partial<Timetable>> {
        try {
            logger.info('Attempting to repair invalid JSON using LLM...');

            const repairPrompt = `The following JSON is invalid or doesn't match the required schema. Please fix it and return a valid timetable JSON:

${invalidJson}

Required schema:
{
  "timetableId": "uuid",
  "days": [
    {
      "day": "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
      "blocks": [
        {
          "start": "HH:MM",
          "end": "HH:MM",
          "subject": "string",
          "notes": "string",
          "confidence": 0.0-1.0
        }
      ]
    }
  ]
}

Return ONLY the corrected JSON, no other text.`;

            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    messages: [
                        {
                            role: 'user',
                            content: repairPrompt,
                        },
                    ],
                    max_tokens: 4096,
                    temperature: 0.1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );

            const content = response.data.choices[0]?.message?.content;
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in repair response');
            }

            return JSON.parse(jsonMatch[0]);
        } catch (error) {
            logger.error('JSON repair failed:', error);
            throw new Error('Could not repair invalid JSON');
        }
    }

    /**
     * Gets MIME type from file path
     * @param filePath - Path to the file
     * @returns MIME type string
     */
    private getMimeType(filePath: string): string {
        const ext = filePath.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            default:
                return 'image/png';
        }
    }
}

export default new LLMService();
