import connectMongo from '../../database/conn';
import Client from '../../model/Client';
import Conversation from '../../model/Conversation';
import Users from '../../model/Users';

const dashboard = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { email } = req.body;

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });
      const userId = data._id;

      Client.find({user: userId})
      .select("_id projectName")
      .exec(function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        const businessProposal = data;

        Conversation.find({user: userId})
        .select("_id projectName")
        .exec(function(error, data){
          if(error) return res.status(400).json({ status : false, error });
          const litePaper = data;

          res
            .status(201)
            .json({
              status: true,
              data: {
                businessProposal, 
                litePaper
              },
            });
        });
      });
    });

  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default dashboard;
