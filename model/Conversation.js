import { Schema, model, models } from 'mongoose';

const conversationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	client_name: {
		type: String,
		required: true,
	},
	client_email: {
		type: String,
		required: true,
		lowercase: true,
	},
  messages: {
		type: [Object],
		blackbox: true,
	}
}, {
	timestamps: true
});

const Conversations = models.conversation || model('conversation', conversationSchema);

export default Conversations;