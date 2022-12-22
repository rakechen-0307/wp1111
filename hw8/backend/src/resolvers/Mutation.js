import { ChatboxModel } from "../models/chatbox"

const makeName = (name, to) => { return [name, to].sort().join('_') }

const checkoutChatbox = async(name1, name2)=>{
  const name = makeName(name1, name2)
  let box = await ChatboxModel.findOne({name});
  if(!box){
    box = await new ChatboxModel({name}).save();
  }
  return box;
}

const Mutation = {
  createChatbox: async(parent, {name1, name2})=>{
    return checkoutChatbox(name1, name2);
  },
  createMessage: async(parent, {sender, to, body}, {pubsub}) => {
    const chatbox = await checkoutChatbox(sender, to);
    const newMessage = {sender, to, body};
    chatbox.messages.push(newMessage);
    await chatbox.save();
    const chatboxName = [sender, to].sort().join('_');
    pubsub.publish(`chatbox ${chatboxName}`, {message: newMessage});
    return newMessage;
  }
};

export default Mutation