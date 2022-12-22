import { ChatboxModel } from "../models/chatbox"

const makeName = (name, to) => { return [name, to].sort().join('_') }

const Query = {
  chatbox: async(parent, {name1, name2},)=>{
    const name = makeName(name1, name2)
    let box = await ChatboxModel.findOne({name});
    if(!box){
      box = await new ChatboxModel({name}).save();
    }
    return box;
  }
};

export default Query
 