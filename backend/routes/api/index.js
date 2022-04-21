const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notesRouter = require('./notes')
const notebooksRouter = require('./notebooks')
const remindersRouter = require('./reminders')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter)
router.use('/notebooks', notebooksRouter)
router.use('/reminders', remindersRouter)

module.exports = router;
