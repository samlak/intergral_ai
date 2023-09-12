import connectMongo from '../../../database/conn';
import Profile from '../../../model/Profile';
import OpenAI from 'openai'

 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const trainBot = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { profileData  } = req.body;

    let summarizedBio = ""
    if (profileData.bio) {
      const prompt = `Help me summarize these sentences into 1 paragraph. Make the text short and concise
      "${profileData.bio}"
      `;

      const messages = [
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages
      })
      
      summarizedBio = response.choices[0].message.content;
    }

    const skillset = profileData.skillsets.join(', ')
    const works = profileData.experiences.map((work) => (
      `${work.job_title} at ${work.company_name} from ${work.start_date.month} ${work.start_date.year} to ${work.end_date.month} ${work.end_date.year}`
    ))
    const worksStringify = works.join('\n')

    const projects = profileData.projects.map((project) => (
      `Worked on ${project.project_title} from ${project.start_date.month} ${project.start_date.year} to ${project.end_date.month} ${project.end_date.year}`
    ))
    const projectsStringify = projects.join('\n')

    const summarizedContent = `
      Name: ${profileData.name}
      Occupation: ${profileData.title}
      Bio: ${summarizedBio}
      Skillsets: ${skillset}
      Calenderly Link: ${profileData.calender_link}
      Work experience: ${worksStringify}
      Previous projects: ${projectsStringify}
    `


    Profile.findByIdAndUpdate(
      profileData._id, 
      { $set: { trained_data: summarizedContent } }, 
      { 
        useFindAndModify: false,
        new: true
      }
    ).exec(function(error, data){
      if(error) {
        return res.status(400).json({ status : false, error: "Error occurred! Please try again." });
      }
      res
        .status(201)
        .json({
          status: true,
          data: data,
        });
    })

  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default trainBot;


// I am an accomplished software developer with a proven track record of over 5 years in the industry. My expertise spans a wide spectrum of programming languages, technologies, and development methodologies, enabling me to create robust and efficient software solutions that meet the most demanding requirements. Throughout my career, I have consistently demonstrated a deep understanding of software architecture, design patterns, and best practices, allowing me to deliver scalable and maintainable codebases. My passion for innovation and problem-solving is evident in my ability to tackle complex challenges head-on and devise elegant solutions. Whether I am collaborating within a team or taking the lead on projects, I thrive on fostering an environment of open communication and knowledge sharing. My adaptability and continuous learning mindset have enabled me to stay at the forefront of technological advancements, ensuring that the software I develop remains cutting-edge and aligned with industry trends. With a keen eye for detail and a commitment to quality, I take pride in my contributions to the software development landscape and look forward to leveraging my skills to drive impactful and transformative projects in the future.