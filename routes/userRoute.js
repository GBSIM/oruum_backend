const {Router} = require('express');
const userRouter = Router();
const {User} = require('../models/User');

userRouter.get('/', async (req,res) => {
    try {
        const users = await User.find();
        return (res.send({users}));
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

userRouter.get('/:userId', async(req,res) => {
    const {userId} = req.params;
    try {
        const user = await User.findOne({id: userId});
        return res.send({user});
    } catch(err) {
        console.log(err);
        return res.send(500).send({err: err.message});
    }
})

userRouter.delete('/:userId', async(req,res) => {
    const {userId} = req.params;
    try {
        const user = await User.findOneAndDelete({id: userId});
        return res.send({user});
    } catch(err) {
        console.log(err);
        return res.send(500).send({err: err.message});
    }
})

userRouter.put('/:userId', async(req,res) => {
    try {
        const {userId} = req.params;
        const {age, nickname} = req.body;
        if (!age && !nickname) return res.status(400).send({err:"age or nickname is required"})
        const user = await User.findOneAndUpdate({id: userId},{ $set: {age, nickname}}, {new: true});
        return res.send({user})
    } catch(err) {
        console.log(err);
        return res.send(500).send({err: err.message});
    }
})

userRouter.post('/', async (req,res) => {
    try {
        let {nickname,id} = req.body;
        if (!nickname || !id) return res.status(400).send({err: "nickname and id are required"})
        const user = new User(req.body);
        await user.save();
        return res.send({user})
    } catch(err) {
        console.log(err);
        return res.status(500).send({err: err.message})
    }
})

module.exports = {
    userRouter
}