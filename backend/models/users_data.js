import { ObjectId } from 'bson';
import { ObjectID } from 'bson';
import mongoose, { Schema } from 'mongoose';

const userDataSchema = new mongoose.Schema({
	user: ObjectId,
	content: Array,
});
module.exports = mongoose.model('UserData', userDataSchema);
