import connectMongo from '../../../database/conn';
import Client from '../../../model/Client';

const createClient = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { data } = req.body;

    Client.findOneAndUpdate(
      { email: data.email },
      { ...data }, 
      { new: true, upsert: true }, 
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

  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default createClient;