import { openaiStream } from "../../../lib/openai-stream";

const generateContent = async (req, res) => {
  try {
    const { 
      headingIndex, 
      projectName,  
      serviceOffering,
      location,
      targetCustomer,
      monthlyRevenue,
      revenueProjection,
      brandIdentity,
      founderName,
      founderResponsibility,
    } = req.body;

    const prompt = [
      `
        Act as an expert business plan writer and write the executive summary section of a business plan. 
        The name of the business is "${projectName}"; it is located in "${location}", providing "${serviceOffering}" to "${targetCustomer}". 
        The current revenue of my business is "${monthlyRevenue}"; We're projecting it to make "${revenueProjection}".
        Ensure to touch upon all the necessary part needed in a company description section of a business plan.       
      `,
      `
        Act as an expert business plan writer and write the company description section of a business plan. 
        The name of the business is "${projectName}" offering "${serviceOffering}" to "${targetCustomer}". 
        It was founded by "${founderName}", who is in charge of "${founderResponsibility}" respectively. 
        The company is located "${location}".
        Ensure to touch upon the impact of the team, how they are structured to run the company and how their location will positively impact their work.
      `,
      `
        Act as an expert business plan writer and write the market analysis section of a business plan. 
        The name of the business is "${projectName}"; it provides "${serviceOffering}" to it's users. The target audience are "${targetCustomer}". 
        Conduct market research and provide information about the "${serviceOffering}" industry, market size, growth potential, competition, and competitive analysis. 
        Mention a few market trends and how the business will cope with it. Ensure it covers all the information required in a market analysis section.
        Ensure to touch upon all the necessary part needed in a market research section of a business plan. 
      `,
      `
        Act as an expert business plan writer and write the product and services section of the business plan. 
        The company name is "${projectName}" and it offers "${serviceOffering}" for "${targetCustomer}". 
        I would like to include all relevant details, such as services offered, our quality assurance methods, and why potential clients should choose our services.
        Ensure it covers all the information required in a product and services section.
      `,
      `
        Develop a marketing and sales strategies section of the business plan. 
        The business is in the "${serviceOffering}" industry and caters to "${targetCustomer}". 
        Our brand identity is "${brandIdentity}". The company name is "${projectName}"
        You must describe advertising and promotional strategies and measure the success of my sales and marketing efforts. 
        Make it informative on the marketing and sales and ensure you properly detail the product offering.
      `,
      `
        Develop an operation plan section of a  business plan. "${projectName}" offers "${serviceOffering}" and caters to "${targetCustomer}". 
        They operate "${location}". Include details such as technology used, company location"${location}" , equipment and technology, production and delivery, quality control, human resources, supply chain management, etc., depending on business operations. 
        Ensure you show how the operations efficiently and effectively deliver our products/services to the customers.
      `,
      `
        Develop the financial plan section for a business plan. "${projectName}" offers "${serviceOffering}" and caters to "${targetCustomer}". 
        They operate "${location}". Outline the projected revenue "${revenueProjection}", operational cost. 
        Be specific about your short-term and long-term financing requirements and other financial projections to support your business’s success. 
        Remember to be realistic with your financial projections.
      `,
    ];

    const systemMessage = "You're an expert business plan writer tasked with writing a business plan for a startup company."
    
    const messages = [
      {"role": "system", "content": systemMessage },
      {"role": "user", "content": prompt[headingIndex] },
    ]

    await openaiStream(res, messages, 1, 1000);
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
