import connectMongo from '../../../database/conn';
import LitePaper from '../../../model/LitePaper';
import Users from '../../../model/Users';

const createContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const {  
      projectName, 
      serviceOffering,
      targetCustomer,
      founderName,
      founderResponsibility,
      contact,      
      email 
    } = req.body;

    const outline = [
        "Introduction",
        "Market Analysis and Target Audience",
        "Solution",
        "Business Model and Revenue Generation",
        "Marketing and Growth Strategy",
        "Team and Advisors",
        "Roadmap and Milestones",
        "Conclusion",
    ]

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      LitePaper.create({ 
        user: data._id,
        projectName,
        serviceOffering,
        targetCustomer,
        founderName,
        founderResponsibility,
        contact,        
        outline,
        body: []
      }, function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        res
          .status(201)
          .json({
            status: true,
            data: data._id,
          });
      });
    });


  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default createContent;
