const { Note } = require('./models');

async function notesByUserId(userId) {
  return await Note.findAll({
    where: {
      userId
    }
  })
};

async function one(id) {
  return await Note.scope("detailed".findByPk(id))
};

async function addNote(details, userId) {
  const note = await Note.create({
    ...details,
    userId
  });
  return await Note.findByPk(note.id)
};

async function updateNote(details) {
  const id = details.id;
  delete details.id;

  await Note.update(
    details,
    {
      where: { id },
      returning: true,
      plain: true
    }
  );
  return await Note.findByPk(id);
};

async function deleteNote(noteId) {
  const note = await Note.findByPk(noteId);
  if (!note) throw new Error('Cannot find note.');

  await Note.destroy({
    where: {
      id: note.id
    }
  })
  return note.id
};


module.exports = {
  notesByUserId,
  addNote,
  updateNote,
  deleteNote
}
