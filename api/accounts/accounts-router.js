const router = require('express').Router()
const Account = require('./accounts-model')

const { 
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload 
} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
Account.getAll()
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(next)
})

router.get('/:id', checkAccountId,(req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.body)
});

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message, 
    customMessage: 'something went terribly wrong!'
  })
})



module.exports = router;
