import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatboxSchema = new Schema({
    name: {type: String, required: [true, "Name field is required."]},
    messages: [{ sender: { type: String }, body: { type: String }}]
});
const ChatboxModel = mongoose.model("Chatbox", ChatboxSchema);

export { ChatboxModel };