import { ChatBoxModel } from '../models/chatbox'

const makeName = (name, to) => { return [name, to].sort().join('_') }

const checkOutChatBox = async (name1, name2) => {
    const name = makeName(name1, name2)
    console.log(name)
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      box = await new ChatBoxModel({ name }).save();
    return box;
}

const Mutation = {
    createChatBox: (parent, { name1, name2 } ) => {
        return checkOutChatBox(name1, name2);
    },
    createMessage: async (parent, { name, to, body }, { pubsub } ) => {
        const chatBox = await checkOutChatBox(name, to);
        console.log(chatBox)
        const newMsg = { sender: name, to, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();
        const chatBoxName = makeName(name, to);
        pubsub.publish(`chatBox ${chatBoxName}`, {
            message: newMsg,
        });
        return newMsg;
    },
}

export default Mutation