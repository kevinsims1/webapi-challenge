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

router.put('/:id', (req,res) => {
    actionDB
    .update(req.params.id, req.body)
    .then(action => {
        if(!action) {
        res.status(404).json({error: "this action doesnt exist "})
        }else {
        res.status(200).json(action)
        }
    })
    .catch(() => {
        res.status(400).json({error: "Couldnt action Action"})
    })
})

router.delete('/:id', (req, res) => {
    actionDB
    .remove(req.params.id)
    .then((action) => {
        if(!action){
            res.status(404).json({error: "this action doesnt exist "}) 
        } else {
        return actionDB.get()
       }
    })
    .then(actions => {   
        console.log(actions)
        res.status(200).json(actions)})
    .catch(error => {
        res.status(500).json({message: "COULDNT Delete action"})
    })
    
});


module.exports = router;