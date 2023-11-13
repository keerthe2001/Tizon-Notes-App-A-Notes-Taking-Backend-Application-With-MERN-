const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser')

// ROUTE1 -  Fetch all the notes using GET Request
router.get('/fetchallnotes', fetchuser ,async(req, res) => {
   try {
    const notes = await Notes.find({user:req.user.id})
    res.send(notes)
   }
   catch(error){
    console.error(error.message)
    res.status(500).send("Some error occured")
  }
    
})



// ROUTE2 -  Add the notes using Post Request
router.post('/addnotes', fetchuser , [
    body('title','Enter a title with length Min 3').isLength({min:5}),
    body('description','Enter a description with min of 5 letters').isLength({min:5}),
] ,async(req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
        
   
    const {title, description, tag } =  req.body;

    const note = new Notes(
        {
            title,
            description,
            tag,
            user: req.user.id
        }
    )
    const savedNote = note.save();
    res.send(note);

    }catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured")
      }
})



// ROUTE3 -  Update  the notes using put  Request
router.put('/updatenote/:id', fetchuser , [
    body('title','Enter a title with length Min 3').isLength({min:5}),
    body('description','Enter a description with min of 5 letters').isLength({min:5}),
] ,async(req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const {title,description,tag} = req.body

    let newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    let note = await Notes.findById(req.params.id)
    
    if(!note)
    {
        return res.status(400).send("Not Found")
    }

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }

    let UpdatedNote = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});

    res.json(UpdatedNote)
})

// ROUTE4 -  Delete the note using the delete request
router.delete('/deletenote/:id', fetchuser ,async(req, res) => {

    let note = await Notes.findById(req.params.id)
    
    if(!note)
    {
        return res.status(400).send("Not Found")
    }

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }

    let DeletedNote = await Notes.findByIdAndDelete(req.params.id);

    res.send({"success":"Success the Notes has been deleted",DeletedNote:DeletedNote})
})

module.exports = router