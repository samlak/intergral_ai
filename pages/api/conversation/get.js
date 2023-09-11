import connectMongo from '../../../database/conn';
import Conversation from '../../../model/Conversation';
import Profile from '../../../model/Profile';
import Users from "../../../model/Users";

const getConversation = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { email } = req.body;
    
    Users.findOne({ email }, async function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      const profileData = await Profile.findOne({ user: data._id }, 'username -_id').exec();

      Conversation.find({ user: data._id })
      .select("-__v -_id -user")
      .populate('user')
      .exec(function(error, conversationData){
        if(error) return res.status(400).json({ status : false, error });
        const dataCombo = { 
          username: profileData ? profileData.username : null,
          conversation: conversationData, 
        }

        res
          .status(201)
          .json({
            status: true,
            data: dataCombo,
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
