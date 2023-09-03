import connectMongo from '../../../database/conn';
import Profile from '../../../model/Profile';

const updateProfile = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { profileId, data  } = req.body;

    Profile.findByIdAndUpdate(
      profileId, 
      { $set: { ...data } }, 
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

export default updateProfile;
