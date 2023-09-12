import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
 
export const runtime = 'experimental-edge'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
 
export default async function handler(req, res) {
  const { messages, trainedData, profession } = await req.json();
  
  const prompt = `${trainedData}
    Use the information provided above to answer the below. The answer must be based on the information above.
  `;

  const systemMessage =`
    You are to strictly act like a ${profession} with years of experience. If you are asked question outside the scope of your profession kindly decline.
    ${prompt}
  `;

  const prefixMessages = [
    { role: "system", content: systemMessage },
  ];

  const finalMessages = [
    ...messages,
    ...prefixMessages
  ]

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: finalMessages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}