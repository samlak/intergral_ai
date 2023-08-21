import { openai } from "../../../config/openai";

const generateContent = async (req, res) => {
  try {
    const { 
      projectName, 
      serviceOffering,
      targetCustomer,
      question   
    } = req.body;


    const prompt = `
      The name of the company is ${projectName}. Their service offering is ${serviceOffering}. Their target user is ${targetCustomer}.
      Use the information of the startup above to answer the question below. Your response should be inline with the information of the startup provided.
      ${question}
      Note: Your response should be detailed and well explained.
    `

    const systemMessage = "You're an expert lite paper writer for startups."
    
    const messages = [
      {"role": "system", "content": systemMessage },
      {"role": "user", "content": prompt },
    ]

    const chat = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
      max_tokens: 800,
    });

    const chatOutput = chat.data.choices.pop();
    const outputMessage = chatOutput.message.content;
    res
      .status(201)
      .json({
        status: true,
        data: outputMessage
    });
  } catch (error) {
    if(error.response){
      return res
        .status(error.response.status)
        .json({ status: false, error: error.response.data.error.message });
    }
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default generateContent;
