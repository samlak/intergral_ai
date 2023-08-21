import { Schema, model, models } from 'mongoose';

const askSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
    projectName: {
		type: String,
		required: true,
		trim: true
	},
    serviceOffering : {
		type: String,
	},
    targetCustomer : {
		type: String,
	},
}, {
	timestamps: true
});

const Asks = models.ask || model('ask', askSchema);

export default Asks;