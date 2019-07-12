const express = require('express');
const projectDB = require('../data/helpers/projectModel')
const actionDB = require('../data/helpers/actionModel')

const router = express.Router();

router.get('/', (req,res) => {
    projectDB
    .get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({error: "Error Retrieving The Project"})
    })
})

router.get('/:id', (req,res) => {
    projectDB
    .get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({error: "Error Retrieving The Project"})
    })
})

router.post('/', (req,res) => {
    projectDB
    .insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({error: "Cant Create Post"})
    })
})

router.post('/:id/action',validateProjectId, (req,res) => {
    actionDB
    .insert({...req.body, project_id: req.params.id})
    .then(action => {     
        res.status(200).json(action)
    })
    .catch(() => {
        res.status(500).json({error: "Could not create Action"})
    })
})

router.put('/:id', (req,res) => {
    projectDB
    .update(req.params.id, req.body)
    .then(changes => {
        res.status(201).json(changes)
    })
    .catch(() => {
        res.status(401).json({error: "Couldnt make changes"})
    })
})

router.delete('/:id', (req, res) => {
    projectDB
    .remove(req.params.id)
    .then(() => projectDB.get())
    .then(projects => {
        res.status(200).json(projects)})
    .catch(() => {
        res.status(400).json({message: "COULDNT REMOVE PROJECT"})
    })
    
});

function validateProjectId(req, res, Next) {
    const id = req.params.id
    projectDB
    .get(id)
    .then(project => {
        if(project) {
            Next()
            }else {
            res.status(404).json({error: "project_id Does not exist"})
            }
    })
    .catch(() => {
        res.status(500).json({error: "Error Retrieving The Project"})
    })
}


module.exports = router;