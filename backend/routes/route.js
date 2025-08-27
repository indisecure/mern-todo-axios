require('dotenv').config()
const express = require('express')
const router = express.Router()
const { client } = require('../database/dbConnection')
const { ObjectId } = require('mongodb')
const getCollection = () => {
    const collection = client.db('axios').collection('axios')
    return collection
}
//Trigger-Reminder

//const triggerReminder = require('../utils/trigger_reminder');
//router.get('/todo/trigger', triggerReminder);


//GET    
router.get('/todo', async (req, res) => {
    try {
        const collection = getCollection()
        const todos = await collection.find().toArray()
        res.json(todos)
    } catch (error) {
        console.error(error.message);
        res.json({ error: 'Internal Server Error' });
    }
})
//POST 
router.post('/todo', async (req, res) => {
    try {      
        const collection = getCollection();
        const{task}=req.body
        await collection.insertOne(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal Server Error' });
    }
});

//GET  By Id
router.get('/todo/:id', async (req, res) => {
  try {
    const collection = getCollection();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' }
      );
     }
    const _id = new ObjectId(req.params.id);   
    const todo = await collection.findOne({ _id });
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal Server Error' });
  }
});

//PUT 
router.put('/todo/:id', async (req, res) => {
    try {       
        const collection = getCollection();     
        const _id = new ObjectId(req.params.id)
        const updated = req.body
        const updatedOne = await collection.updateOne({ _id }, { $set: updated })
        res.json(updatedOne)
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal Server Error' });
    }
})
router.patch('/todo/:id', async (req, res) => {
    try {      
        const collection = getCollection();        
        const _id = new ObjectId(req.params.id)
        const updated = req.body
        const updatedOne = await collection.updateOne({ _id }, { $set: updated })
        res.json(updatedOne)
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal Server Error' });
    }
})
//DELETE 
router.delete('/todo/:id', async (req, res) => {
    try {
        const collection = getCollection();
        const _id = new ObjectId(req.params.id)
        const deletedOne = await collection.deleteOne({ _id })
        res.json(deletedOne)
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal Server Error' });
    }
})
module.exports = router