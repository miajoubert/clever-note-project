const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook, Note } = require('../../db/models')

const router = express.Router();

router.get('/',
  asyncHandler(async function (req, res) {
    const userId = Number.parseInt(req.headers.data);

    const notebooks = await Notebook.findAll({
      where: { userId },
      order: [['updatedAt', 'DESC']]
    });

    return res.json(notebooks)
  })
);

router.get('/:notebookId',
  asyncHandler(async function (req, res) {
    const { notebookId } = req.params;

    const notebook = await Notebook.findByPk(notebookId, {
      include: [
        { model: Note }
      ],
    });

    return res.json(notebook)
  })
);

router.post('/',
  asyncHandler(async function (req, res) {
    const {
      userId,
      title
    } = req.body;

    const notebook = await Notebook.create({
      title,
      userId
    });

    return res.json(notebook)
  })
);

router.put('/:id',
  asyncHandler(async function (req, res) {
    const { id } = req.params;

    const {
      title
    } = req.body;

    const notebook = await Notebook.findByPk(id)

    const altNotebook = await notebook.update({
      title
    });

    return res.json(altNotebook)
  })
);

router.delete("/:notebookId",
  asyncHandler(async function (req, res) {
    const { notebookId } = req.params;

    await Note.destroy({
      where: { id: notebookId }
    })

    return res.json({ notebookId });
  })
);

module.exports = router;
