import connectMongo from '../../../database/conn';
import Ask from '../../../model/Ask';
import Users from '../../../model/Users';

const createContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const {  
      email,
      projectName, 
      serviceOffering,
      targetCustomer,
    } = req.body;

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      Ask.create({ 
        user: data._id,
        projectName,
        serviceOffering,
        targetCustomer,
      }, function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        res
          .status(201)
          .json({
            status: true,
            data: data,
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
