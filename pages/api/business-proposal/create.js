import connectMongo from '../../../database/conn';
import BusinessProposal from '../../../model/BusinessProposal';
import Users from '../../../model/Users';

const createContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const {  
      projectName, 
      serviceOffering,
      location,
      targetCustomer,
      monthlyRevenue,
      revenueProjection,
      brandIdentity,
      founderName,
      founderResponsibility,
      email 
    } = req.body;

    const outline = [
      "Executive Summary",
      "Company Description",
      "Market Analysis",
      "Products and Services",
      "Marketing and Sales Strategies",
      "Operations Plan",
      "Financial Plan",
    ]

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      BusinessProposal.create({ 
        user: data._id,
        projectName,
        serviceOffering,
        location,
        targetCustomer,
        monthlyRevenue,
        revenueProjection,
        brandIdentity,
        founderName,
        founderResponsibility,
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
