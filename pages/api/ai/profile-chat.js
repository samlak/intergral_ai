import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
 
export const runtime = 'experimental-edge'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
 
export default async function handler(req, res) {
  const { messages } = await req.json();
  
  const prompt = `The following are the information about a Software Developer:

Name: Salami Haruna
Occupation: Software Developer
Bio: I am an accomplished software developer with a proven track record of over 5 years in the industry. My expertise spans a wide spectrum of programming languages, technologies, and development methodologies, enabling me to create robust and efficient software solutions that meet the most demanding requirements
Service offering: I offer a comprehensive range of software development services tailored to meet your specific needs. With expertise in JavaScript, Python, Java, C#, C++, Ruby, PHP, Swift, SQL, HTML/CSS, React, and Node.js, I can design and deliver cutting-edge applications and solutions that drive innovation and efficiency. Whether you require robust web and mobile app development, efficient database management, or seamless front-end and back-end integration, my skillset enables me to craft solutions that not only meet your technical requirements but also enhance user experiences and contribute to your business success.
Previous projects: In my previous project, I played a pivotal role in the development of a vibrant social networking platform aimed at fostering seamless connections among users. Within the timeframe of March 2017 to August 2018, I led the design and implementation efforts that resulted in an engaging user experience. Notably, I crafted interactive user profiles, integrated real-time chat functionalities, and seamlessly integrated content sharing capabilities. As a result of these endeavors, the platform garnered significant popularity, emerging as a central hub where users could effortlessly connect, collaborate, and engage. It was truly fulfilling to witness the platform flourish and contribute positively to user interactions and relationships.
Calender Link: https://calendly.com/samlak

Use the information provided above to answer the below. The answer must be based on the content above.
  `;


  const systemMessage =`
    You are to strictly act like a software developer with years of experience . If you are asked question outside the scope of your profession kindly decline.
    ${prompt}
    `;

  const prefixMessages = [
    { role: "system", content: systemMessage },
    // { role: "user", content: prompt },
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