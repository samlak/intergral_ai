import connectMongo from '../../../../database/conn';
import BusinessProposal from '../../../../model/BusinessProposal'
import Users from "../../../../model/Users";

const getContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { user } = req.body;

    Users.findOne({ email: user }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      BusinessProposal.findOne({ _id: req.query.id, user: data._id })
      .select("-__v -_id -createdAt -updatedAt")
      .exec(function(error, data){
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

export default getContent;
