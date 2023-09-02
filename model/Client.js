import { Schema, model, models } from 'mongoose';

const clientSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
  name: {
		type: String,
		required: true,
		trim: true
	},
  email : {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	}
}, {
	timestamps: true
});

const Clients = models.client || model('client', clientSchema);

export default Clients;