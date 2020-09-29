const express = require("express");
const router = express.Router()
const models = require("../models");

//Get all comments
router.get('/', async (req, res) => {
    try {      
        let newReplies = []
        let threads = []
        const allThreads = await models.Message.findAll();
        for(const message of allThreads) {
            
            const replies = await models.Reply.findAll({
                where: { message_id: message.id }
            });
            replies.forEach(reply => { 
                newReplies.push(reply.dataValues) 
            });

            message.dataValues["replies"] = newReplies
            threads.push(message)
        }
        res.json(threads)
    } catch (err) {
        console.error(err.message)
    }
})

//Add a comment
router.post('/create', async (req, res) => {
    try {
        const { message, first_name, last_name, email, photo } = req.body
        const newThread = await models.Message.create({message, first_name, last_name, email, photo})
        await newThread.save()
        res.json({message: "New Thread has been created", Message: newThread})
    } catch (err) {
        console.error(err.message)
    }
})

//Add a comment
router.post('/reply', async (req, res) => {
    try {
        const { id } = req.headers
        const { message, first_name, last_name, email, photo } = req.body
        const newReply = await models.Reply.create({message_id: id, message, first_name, last_name, email, photo})
        await newReply.save()
        res.json({message: "New Thread has been created", Message: newReply})
    } catch (err) {
        console.error(err.message)
    }
})

// //IGNORE FROM THIS POINT DOWN

// //Get a single User
// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const aUser = await models.User.findOne({ where: {id: id}})
//         res.json(aUser)
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// //Update a User
// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const { provider_full_name, specialty } = req.body
//         const user = await models.user.findOne({where: {id: id}})
//         user.provider_full_name = provider_full_name
//         user.specialty = specialty
//         await user.save()
//         res.json({message: "User was updated", user})
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// //Delete a User
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const user = await models.User.findOne({where: {id: id}})
//         await user.destroy()
//         res.json({message: "User was deleted!", user})
//     } catch (err) {
//         console.error(err.message)
//     }
// })

module.exports = router