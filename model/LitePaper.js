import { Schema, model, models } from 'mongoose';

const litePaperSchema = new Schema({
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
    founderName : {
		type: String,
	},
    founderResponsibility : {
		type: String,
	},
    contact : {
		type: String,
	},
	outline: {
		type: [String],
	},
	content: {
		type: [Object],
		blackbox: true,
	},
}, {
	timestamps: true
});

const LitePapers = models.litePaper || model('litePaper', litePaperSchema);

export default LitePapers;