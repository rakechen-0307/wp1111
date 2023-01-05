import { json, Router } from 'express';
import { UserModel, WorkModel } from '../models/Model';
import express from 'express';

const router = Router();
router.use(express.json());
var existing;

// save data
const SaveSong = async (id, name, composer, data) => {
    existing = await WorkModel.findOne({ id });
    if (existing) {
        await WorkModel.deleteOne({ id });
    }
    try { 
        const newSong = new WorkModel({ id, name, composer, data });
        return newSong.save();
    } catch (e) { throw new Error("Song creation error: " + e); }
}

const SaveToUser = async (id, name, composer, user, works) => {
    const existing = await UserModel.findOne({ name:user });
    if(existing) {
        await UserModel.deleteOne({ name:user });
    }
    try {
        const updatedUser = new UserModel({ name:user, password:existing.password, works});
        return updatedUser.save();
    }
    catch (e) { throw new Error("Song save error: " + e); }

}


router.post("/song", async (req , res) => {

    const id = req.body.id
    const name = req.body.name
    const composer = req.body.composer
    const data = req.body.data;

    const user = req.body.user
    const works = req.body.works

    await SaveSong(id, name, composer, data)

    await SaveToUser(id, name, composer, user, works)

    const returnMsg = {id: id, name: name, composer: composer, data: data}
    res.json({message: returnMsg});
});

// find song
router.get("/songs", async (req , res) => {
    const id = req.query.id

    const matchData = await WorkModel.find({ id:id })
    res.json({message : (matchData.length !== 0) ? 
        {id: matchData[0].id, name: matchData[0].name, composer: matchData[0].composer, data: matchData[0].data} :
        `Not Found Song`
    });
});

// create user

router.post("/user", async (req, res) => {
    const name = req.body.params.name
    const password = req.body.params.password

    existing = await UserModel.find({ name: name })

    res.json({message : (existing.length !== 0) ? 
        'existed' :
        'not existed'
    });

    if(existing.length === 0) {
        const newUser = new UserModel({ name, password, works: [] });
        return newUser.save();
    }
})

// find user
router.get("/users", async (req, res) => {
    const name = req.query.name

    const matchData = await UserModel.find({ name: name })

    res.json({message : (matchData.length !== 0) ? 
        matchData[0] :
        `not existed`
    });
})

//delete song 
router.get("/deleteSong",async (req,res) => {
    const {name,id} = req.query;
    const existingUser = await UserModel.findOne({name});
    const existingSong = await WorkModel.findOne({id});
    try {
    if(existingUser) await UserModel.deleteOne({name});
    if(existingSong) await WorkModel.deleteOne({id});
    const newWorks = existingUser.works.filter(obj => obj.id !== id);
    const newUser = new UserModel({name:name,password:existingUser.password,works:newWorks});
    newUser.save();
    } 
    catch (e) {throw new Error("Song delete error: " + e);}
    res.json({message:"delete success"}) 
})

export default router;