const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Notebook, Note } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

const validateNotebookForm = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a notebook title.')
    .isLength({ max: 30 })
    .withMessage('Please keep title under 30 characters.'),
  handleValidationErrors
];

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
  validateNotebookForm,
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
  validateNotebookForm,
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

    await Notebook.destroy({
      where: { id: notebookId }
    })

    return res.json({ notebookId });
  })
);

module.exports = router;
