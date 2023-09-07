import connectMongo from '../../../database/conn';
import Conversation from '../../../model/Conversation';
import Users from "../../../model/Users";

const getConversation = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { email } = req.body;
    
    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      Conversation.find({ user: data._id })
      .select("-__v -_id -user")
      .exec(function(error, response){
        if(error) return res.status(400).json({ status : false, error });
        res
          .status(201)
          .json({
            status: true,
            data: response,
          });
      });
    });

  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default getConversation;
