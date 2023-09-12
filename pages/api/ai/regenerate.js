import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
 
export const runtime = 'experimental-edge'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
 
export default async function handler(req, res) {
  const { messages } = await req.json();
  const { role, content } = messages[0];

  const rephrasePrompt = 'Help me rewrite these sentences to make them more professional.'
  const expandPrompt = 'Help me rewrite and expand these sentences into a minimum of 150 words and make them more professional.'
  
  const prompt = `${role === "rephrase" ? rephrasePrompt : expandPrompt }

  "${content}"
  `;

  const systemMessage = 'You are a CV writer that helps others to correct their CV';

  const comboMessages = [
    { role: "system", content: systemMessage },
    { role: "user", content: prompt },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: comboMessages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}