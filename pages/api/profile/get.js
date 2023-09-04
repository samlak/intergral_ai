import connectMongo from '../../../database/conn';
import Profile from '../../../model/Profile';
import Users from '../../../model/Users';

const getProfile = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { search } = req.body;

    function searchProfile ( searchParams ) {
      Profile.findOne({ ...searchParams })
      .select("-__v -createdAt -updatedAt")
      .exec(function(error, data){
        if(error) return res.status(400).json({ status : false, data: null });
        res
          .status(201)
          .json({
            status: true,
            data: data,
          });
      });
    }

    if (search.email) {
      Users.findOne({ ...search }, function(error, data){
        if(error || !data ) return res.status(400).json({ status : false, data: null });
        searchProfile({ user: data._id });
      });
    } else {
      searchProfile({ ...search });
    }

  } catch (error) {
    res
      .status(500)
      .json({ status: false, data: null });
  }
};

export default getProfile;
