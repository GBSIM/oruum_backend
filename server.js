const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {userRouter} = require('./routes/userRoute');
const key = require('./config/key');

const server = async() => {
    try {
        await mongoose.connect(key.MONGO_URI);
        console.log('MongoDB connected!');
        app.use(express.json());
        
        app.use('/user',userRouter); 

        app.listen(3000, function() {
            console.log('server listening on port 3000');
        })
    } catch(err) {
        console.log(err)
    }   
}

server();

