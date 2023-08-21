import connectMongo from '../../../database/conn';
import LitePaper from '../../../model/LitePaper';

const saveGeneratedContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { contentId, content  } = req.body;

    LitePaper.findByIdAndUpdate(
      contentId, 
      { $set: { content } }, 
      { 
        useFindAndModify: false,
        new: true
      }
    ) .exec(function(error, data){
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

export default saveGeneratedContent;
