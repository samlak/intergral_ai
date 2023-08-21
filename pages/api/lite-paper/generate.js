import { openaiStream } from "../../../lib/openai-stream";

const generateContent = async (req, res) => {
  try {
    const { 
      headingIndex,
      projectName, 
      serviceOffering,
      targetCustomer,
      founderName,
      founderResponsibility,
      contact,     
    } = req.body;

    const prompt = [
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the introduction section of the litepaper.
        Follow the following outline for the introduction part.
        I. Introduction
        A. Overview of the Startup
        B. Vision and Mission
        C. Problem Statement and Market Opportunity
        D. Value Proposition
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the market analysis and target audience section of the litepaper.
        Follow the following outline for the market analysis and target audience section.
        II. Market Analysis and Target Audience
        A. Industry Overview
        B. Market Size and Potential
        C. Competitive Landscape
        D. Target Audience and User Persona
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the solution section of the litepaper.
        Follow the following outline for the solution section.
        III. Solution
        A. Description of the Product/Service
        B. Unique Selling Proposition
        C. Key Features and Benefits
        D. Technology Stack
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the Business Model and Revenue Generation section of the litepaper.
        Follow the following outline for the Business Model and Revenue Generation section.
        IV. Business Model and Revenue Generation
        A. Revenue Streams
        B. Pricing Strategy
        C. Financial Plan
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the Marketing and Growth Strategy section of the litepaper.
        Follow the following outline for the Marketing and Growth Strategy section.
        V. Marketing and Growth Strategy
        A. Marketing Plan and Channels
        B. Customer Acquisition Strategy
        C. User Retention and Engagement
        D. Partnerships and Collaborations
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        The founders are expert at "${founderResponsibility}" respectively.
        You're to write the Team and Advisors section of the litepaper.
        Follow the following outline for the Team and Advisors section.
        VI. Team and Advisors
        A. Founders and Key Team Members
        B. Relevant Expertise and Experience
        C. Advisory Board
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the Roadmap and Milestones section of the litepaper.
        Follow the following outline for the Roadmap and Milestones section.
        VII. Roadmap and Milestones
        A. Key Milestones Achieved
        B. Future Development and Expansion Plans
        C. Projected Timeline     
      `,
      `
        The name of the company is "${projectName}" and it was founded by "${founderName}". They offer "${serviceOffering}" for "${targetCustomer}". 
        You're to write the conclusion section of the litepaper. Our contact is "${contact}"
        Follow the following outline for the conclusion section.
        VIII. Conclusion
        A. Recap of the Startup's Value Proposition
        B. Call to Action
        C. Contact Information      
      `,
    ];

    const systemMessage = "You're an expert lite paper writer for startups."
    
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
