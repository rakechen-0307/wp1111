import { Router } from "express";
import { UserModel } from "../models/Model";
import express from "express";
import bcrypt from "bcryptjs";

const router = Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.send("test");
});

router.post("/register", async (req, res) => {
  const { name: name, pass: password } = req.body;
  const salt_rounds = 10;
  const pass_hashed = bcrypt.hashSync(password, salt_rounds);
  const newUser = new UserModel({ name: name, password: pass_hashed, works:[]});
  const existing = await UserModel.find({ name });
  if(existing.length!==0) {
    res.json({message:'existed'})
  }
  else{
    newUser.save().then(() => console.log("The user has been added."));
    res.json({message:'not existed'})
  }
  
});

router.post("/login", async (req, res) => {
  const { name: name, pass: password } = req.body;
  const existing = await UserModel.findOne({ name:name });
  if (!existing)
    res.json({
      message: "User name does not exist or the password is not correct",
      name: "",
      songID: [],
    });
  else {
    const result = bcrypt.compareSync(password, existing.password);
    if (!result)
      res.json({
        message: "User name does not exist or the password is not correct",
        name: "",
        songID: [],
      });
    else {
      const message = "login success";
      const songID = existing.works;
      const data = { message: message, name: name, songID: songID };
      res.json(data);
    }
  }
});

export default router;