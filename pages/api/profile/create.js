import connectMongo from '../../../database/conn';
import Profile from '../../../model/Profile';
import Users from '../../../model/Users';

const createProfile = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { data: initialData, email } = req.body;

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      Profile.create({ 
        ...initialData,
        user: data._id
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

export default createProfile;
