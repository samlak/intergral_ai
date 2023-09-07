import connectMongo from '../../../database/conn';
import Conversation from '../../../model/Conversation';

const saveConversation = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { data } = req.body;

    if(!data.conversation_id) {
      Conversation.create({ ...data }, function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        // Send Email to profile owner
        res
          .status(201)
          .json({
            status: true,
            data: data._id,
          });
      });
    } else {
      Conversation.findByIdAndUpdate( 
        data.conversation_id ,
        { $set: { ...data } }, 
        { new: true, useFindAndModify: false }, 
        function(error, data) {
          if(error) return res.status(400).json({ status : false, error });
          res
            .status(201)
            .json({
              status: true,
              data: data._id,
            });
        }
      );
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default saveConversation;