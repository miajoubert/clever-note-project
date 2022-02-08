const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notes } = require('../db/models/');

const NotesRepository = require('../db/notes-repository');

const router = express.Router();

router.get('/',
  asyncHandler(async function (req, res) {
    console.log("YOU SHOULD SEE YOUR NOTES")
    const notes = await NotesRepository.notesByUserId(req.body.user.id);
    return res.json(notes)
  })
)

router.post('/',
  asyncHandler(async function (req, res) {
    const id = await NotesRepository.addNote(req.body);
    return res.redirect(`${req.baseUrl}/${id}`)
  })
)

router.put('/:id',
  asyncHandler(async function (req, res) {
    const id = await NotesRepository.updateNote(req.body);
    const note = await NotesRepository.one(id)
  })
)

router.delete("/:id",
  asyncHandler(async function (req, res) {
    const id = await NotesRepository.deleteNote(req.params.id);
    return res.json({ id })
  })
)

module.exports = router;
