import connectMongo from '../../database/conn';
import LitePaper from '../../model/LitePaper';
import BusinessProposal from '../../model/BusinessProposal';
import Users from '../../model/Users';

const history = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { email } = req.body;

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });
      const userId = data._id;

      BusinessProposal.find({user: userId})
      .select("_id projectName")
      .exec(function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        const businessProposal = data;

        LitePaper.find({user: userId})
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

export default history;
