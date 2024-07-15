const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	carMakerId: {
		type: Schema.Types.ObjectId,
		ref: 'Car',
	},
});

mongoose.model('users', userSchema);

module.exports = mongoose.model('Users', userSchema);
