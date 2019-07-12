const express = require('express');
const actionDB = require('../data/helpers/actionModel')

const router = express.Router();

router.get('/', (req,res) => {
    actionDB
    .get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({error: "COULDNT GET ACTIONS"})
    })
})

router.post('/:id', (req,res) => {
    actionDB
    .insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(() => {
        res.status(500).json({error: "Could not create Action"})
    })
})

router.put('/', (req,res) => {
    actionDB
    .update(req.params.id, req.body)
    .then(update => {
        res.status(200).json(update)
    })
    .catch(() => {
        res.status(400).json({error: "Couldnt Update Action"})
    })
})

router.delete('/:id', (req, res) => {
    actionDB
    .remove(req.params.id)
    .then(() => actionDB.get())
    .then(actions => {
        console.log(actions)
        res.status(200).json(actions)})
    .catch(error => {
        res.status(400).json({message: "COULDNT Delete action"})
    })
    
});


module.exports = router;