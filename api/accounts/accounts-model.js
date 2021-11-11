const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
return db('accounts').where({ id: Number(id) }).first()
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts')
  .insert(account)
  .then(ids => ({ id: ids[0] }))
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where('id', Number(id))
    .update(account)
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where('id', Number(id))
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

// db('foo-table') // returns a promise that resolves to an **array** with all records in the table
// db('foo-table').where({ role: 'Student', active: true }) // resolves to an **array** of all records that satisfy the where
// db('foo-table').where('name', 'Mary') // is an alternative for when there is just one where condition
// db('foo-table').where('id', 7).first() // will resolve to the **record** we want (if the id is unique for a table) or undefined
// db('foo-table').insert({ bar: 'baz' }) // resolves to an **array** containing the **ids of the records** inserted into the table
// db('foo-table').where('id', id).update({ bar: 'new bar' }) // resolves to the **number of records** affected by the update
// db('foo-table').where('id', id).delete() // resolves to the **number of records** affected by the delete
