'use server';

import fs from 'fs';
import path from 'path';

function getEnvVariable(key: string): string | undefined {
  // First check if there is an env file in the root
  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const cleanLine = line.trim();
        if (cleanLine.startsWith('#')) continue;
        const parts = cleanLine.split('=');
        if (parts.length >= 2 && parts[0].trim() === key) {
          let val = parts.slice(1).join('=').trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          return val;
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env.local:', err);
  }

  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const cleanLine = line.trim();
        if (cleanLine.startsWith('#')) continue;
        const parts = cleanLine.split('=');
        if (parts.length >= 2 && parts[0].trim() === key) {
          let val = parts.slice(1).join('=').trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          return val;
        }
      }
    }
  } catch (err) {
    console.error('Error reading .env:', err);
  }

  return process.env[key];
}

export async function generateAIResponse(prompt: string, systemPrompt?: string) {
  const apiKey = getEnvVariable('OPENROUTER_API_KEY')?.trim();
  const envModel = getEnvVariable('NEXT_PUBLIC_OPENROUTER_MODEL');
  let model = envModel || 'openai/gpt-oss-120b:free';

  console.log('CRITICAL DEBUG: apiKey length =', apiKey?.length, 'prefix =', apiKey?.slice(0, 10), 'suffix =', apiKey?.slice(-5));
  console.log('CRITICAL DEBUG: model =', model);

  if (!apiKey) {
    throw new Error('API Key is not set in environment variables.');
  }

  // Detect which provider to use based on the key prefix
  const isNvidia = apiKey.startsWith('nvapi-');
  const isBedrock = apiKey.startsWith('ABSK');

  if (isNvidia) {
    // Default to Llama 3.3 70b if model is not configured specifically for NVIDIA
    if (!envModel || !envModel.includes('/')) {
      model = 'meta/llama-3.3-70b-instruct';
    }

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    try {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('NVIDIA API Error:', response.status, errorText);
        throw new Error(`NVIDIA request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Failed to generate NVIDIA AI response:', error);
      throw new Error('Failed to connect to the NVIDIA Inference Network.');
    }
  } else if (isBedrock) {
    // Default to Claude Opus 4.5 for Bedrock if not configured otherwise
    if (!envModel || envModel.includes('free')) {
      model = 'us.anthropic.claude-opus-4-5-20251101-v1:0';
    }

    try {
      const response = await fetch(`https://bedrock-runtime.us-east-1.amazonaws.com/model/${model}/invoke`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt,
                },
              ],
            },
          ],
          ...(systemPrompt ? { system: systemPrompt } : {}),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Amazon Bedrock API Error:', response.status, errorText);
        throw new Error(`Bedrock request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Failed to generate Bedrock AI response:', error);
      throw new Error('Failed to connect to Amazon Bedrock Runtime.');
    }
  } else {
    // OpenRouter flow
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://khansfitness.vercel.app',
          'X-Title': 'Khan\'s Fitness AI',
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('CRITICAL: OpenRouter API Error Response:', response.status, errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('CRITICAL: Failed to generate OpenRouter AI response:', error);
      throw error;
    }
  }
}
