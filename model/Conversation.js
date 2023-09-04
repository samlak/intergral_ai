import { Schema, model, models } from 'mongoose';

const conversationSchema = new Schema({
	client: {
		type: Schema.Types.ObjectId,
		ref: 'client',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
  messages: {
		type: [Array],
		blackbox: true,
	},
}, {
	timestamps: true
});

const Conversations = models.conversation || model('conversation', conversationSchema);

export default Conversations;