const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Note, Notebook } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateNoteForm = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a note title.'),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide note content.'),
  handleValidationErrors
];

router.get('/',
  asyncHandler(async function (req, res) {
    const userId = Number.parseInt(req.headers.data);

    const notes = await Note.findAll({
      where: {
        userId
      },
      order: [['title', 'DESC']],
      include: [{ model: Notebook }],
    });

    return res.json(notes)
  })
);

router.get('/:noteId',
  validateNoteForm,
  asyncHandler(async function (req, res) {
    const { noteId } = req.params;

    const note = await Note.findByPk(noteId, {
      include: [
        { model: Notebook }]
    });

    return res.json(note)
  })
);

router.post('/',
  validateNoteForm,
  asyncHandler(async function (req, res) {
    const {
      userId,
      title,
      notebookId,
      content
    } = req.body;

    const note = await Note.create({
      title,
      userId,
      notebookId,
      content
    },
      {
        include: [
          { model: Notebook }]
      }
    );

    return res.json(note)
  })
);

router.put('/:id',
  validateNoteForm,
  asyncHandler(async function (req, res) {
    const { id } = req.params;

    const {
      title,
      notebookId,
      content
    } = req.body;

    const note = await Note.findByPk(id)

    const altNote = await note.update({
      title,
      notebookId,
      content
    });

    return res.json(altNote)
  })
);

router.delete("/:noteId",
  asyncHandler(async function (req, res) {
    const { noteId } = req.params;

    await Note.destroy({
      where: { id: noteId }
    })

    return res.json({ noteId });
  })
);

module.exports = router;
