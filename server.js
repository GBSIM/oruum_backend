const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./models/User');
const {userRouter} = require('./routes/userRoute');

const MONGO_URI = 'mongodb+srv://oruum:banana1004@oruum.bsopcnz.mongodb.net/oruum?retryWrites=true&w=majority'

const server = async() => {
    try {
        await mongoose.connect(MONGO_URI);
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

