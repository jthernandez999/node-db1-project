const dbConfig = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if (!name || !budget) {
    res.status(400).json({
      message: 'name and budget are required'
    })
  }
  else if (typeof name !== 'string') {
    res.json({
      message: 'name of account must be a string'
    })
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    res.json({
      message: 'name of account must be between 3 and 100'
    })
  }
  else if (typeof budget !== 'number' || isNaN(budget)) {
    res.json({
      message: 'budget of account must be a number'
    })
  }
  else if (budget < 0 || budget > 1000000) {
    res.json({
      message: 'budget of account is too large or too small'
    })
  }
  else {
    next()
  }
}


exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const takenName = await db('accounts')
    .where('name', req.body.name.trim())
    .first()
    if(takenName) {
      next({ status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

// exports.checkAccountNameUnique = (req, res, next) => {
// const account = Account.getById(req.params.id) 
//   .then((newAccount) => {
//     if(newAccount.name == account.name) {
//       res.status(400).json({
//         message: 'that name is taken'
//       })
//     }
//   })
//   .catch(next)
// }


exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
      if(!account) {
        next({ status: 404, message: 'account not found'})
      } else {
        req.account = account 
        next()
      }
  } catch(err) {
    next(err)
  }
}



// exports.checkAccountId = (req, res, next) => {
// Account.getById(req.params.id)
//   .then(account => {
//     if (account) {
//       req.account = account
//       next()
//     } else {
//       next({ status: 404, message: 'account not found'})
//     }
//   })
//   .catch(next)
// }
