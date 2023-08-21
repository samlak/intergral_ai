import { Schema, model, models } from 'mongoose';

const businessProposalSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
    projectName : {
		type: String,
	},
    serviceOffering : {
		type: String,
	},
    location : {
		type: String,
	},
    targetCustomer : {
		type: String,
	},
    monthlyRevenue : {
		type: String,
	},
    revenueProjection : {
		type: String,
	},
    brandIdentity : {
		type: String,
	},
    founderName : {
		type: String,
	},
    founderResponsibility : {
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

const BusinessProposals = models.businessProposal || model('businessProposal', businessProposalSchema);

export default BusinessProposals;