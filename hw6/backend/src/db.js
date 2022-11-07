import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

export default {
    connect: () => {
         /* code to connect Mongoose DB */ 
         dotenv.config({path:__dirname+'/.env'})
         mongoose
            .connect("mongodb+srv://rakechen0307:92chen0307R@wp1111-hw6.k6z7ocx.mongodb.net/?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((res) => console.log("mongo db connection created"));
    }
};