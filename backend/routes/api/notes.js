const express = require('express');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models')

const router = express.Router();

router.get('/',
  asyncHandler(async function (req, res) {
    const userId = Number.parseInt(req.headers.data);

    const notes = await Note.findAll({
      where: { userId }
    });

    return res.json(notes)
  })
);

router.get('/:noteId',
  asyncHandler(async function (req, res) {
    const { noteId } = req.params

    const note = await Note.findByPk(noteId);

    return res.json(note)
  })
);

router.post('/add',
  asyncHandler(async function (req, res) {
    const { userId } = req.body;
    const {
      title,
      notebookId,
      content
    } = req.body;

    const note = await Note.create({
      title,
      userId,
      notebookId,
      content
    });

    return res.json(note)
  })
);

router.put('/:id',
  asyncHandler(async function (req, res) {
    const { userId, id } = req.params;
    const {
      title,
      notebookId,
      content
    } = req.body;

    const note = await Note.findByPk(id)

    const altNote = await note.save({
      title,
      notebookId,
      content
    });

    return res.json(altNote)
  })
);

router.delete("/:id",
  asyncHandler(async function (req, res) {
    const { userId, id } = req.params;

    await Note.destroy({
      where: { id }
    })

    return id;
  })
)

module.exports = router;
