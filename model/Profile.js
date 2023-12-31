import { Schema, model, models } from 'mongoose';

const profileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		unique: true
	},
  image: {
		type: String,
	},
  name: {
		type: String,
	},
  username: {
		type: String,
		unique: true,
	},
  title: {
		type: String,
	},
  bio: {
		type: String,
	},
  calender_link: {
		type: String,
	},
  external_links: {
		type: [Object],
		blackbox: true,
	},
  skillsets: {
		type: [String],
		blackbox: true,
	},
  experiences: {
		type: [Object],
		blackbox: true,
	},
  projects: {
		type: [Object],
		blackbox: true,
	},
  trained_data: {
		type: String,
	},
}, {
	timestamps: true
});

const Profiles = models.profile || model('profile', profileSchema);

export default Profiles;