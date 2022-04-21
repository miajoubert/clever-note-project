const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Reminder } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

const validateReminderForm = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a reminder title.')
    .isLength({ max: 30 })
    .withMessage('Please keep title under 30 characters.'),
  handleValidationErrors
];

router.get('/',
  asyncHandler(async function (req, res) {
    const userId = Number.parseInt(req.headers.data);

    const reminders = await Reminder.findAll({
      where: { userId },
      order: [['updatedAt', 'DESC']]
    });

    return res.json(reminders)
  })
);

router.get('/:reminderId',
  asyncHandler(async function (req, res) {
    const { reminderId } = req.params;

    const reminder = await Reminder.findByPk(reminderId, {
      include: [
        { model: Note }
      ],
    });

    return res.json(reminder)
  })
);

router.post('/',
  validateReminderForm,
  asyncHandler(async function (req, res) {
    const {
      userId,
      title
    } = req.body;

    const reminder = await Reminder.create({
      title,
      userId
    });

    return res.json(reminder)
  })
);

router.put('/:id',
  validateReminderForm,
  asyncHandler(async function (req, res) {
    const { id } = req.params;

    const {
      title
    } = req.body;

    const reminder = await Reminder.findByPk(id)

    const altReminder = await reminder.update({
      title
    });

    return res.json(altReminder)
  })
);

router.delete("/:reminderId",
  asyncHandler(async function (req, res) {
    const { reminderId } = req.params;

    await Reminder.destroy({
      where: { id: reminderId }
    })

    return res.json({ reminderId });
  })
);

module.exports = router;
