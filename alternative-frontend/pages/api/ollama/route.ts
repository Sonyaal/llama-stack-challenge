import type { NextApiRequest, NextApiResponse } from 'next';
import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const runtime = 'nodejs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtain text from request header
    const { text } = req.body;

    // Define LLM prompt
    const prompt = `
    You are an expert compliance and language reviewer for California construction permits.

    Your task is to analyze the provided text and return a JSON object structured as follows:

    {
      "complianceScore": <score out of 100>,
      "grammarIssues": [
        {
          "quote": "<exact text from the input>",
          "explanation": "<what's wrong and how to fix it>"
        }
      ],
      "ambiguityIssues": [
        {
          "quote": "<exact ambiguous phrase>",
          "explanation": "<why it is unclear or vague>"
        }
      ],
      "complianceIssues": [
        {
          "quote": "<text that violates regulations or lacks compliance>",
          "explanation": "<what regulation it violates and how to fix it>"
        }
      ]
    }

    ONLY return valid JSON. Do not wrap in markdown or triple backticks. Do not include anything else outside of the JSON.
    Only return a JSON that includes all listed components. Do not leave any fields missing.

    Text to review:
    """${text}"""
    `;

    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // store your key in .env.local
          'Content-Type': 'application/json',
        },
      }
    );
    
    const result = response.data;
    console.log("Full Response: ", result);
    const modelOutput = result.choices?.[0]?.message?.content ?? '';
    console.log("Model Output: ", modelOutput);

    

    res.status(200).json({ success: true, raw: modelOutput });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
