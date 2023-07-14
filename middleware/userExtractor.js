const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')

  let token = ''
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_WORD)

  if (!token || !decodedToken.id) {
    return res.status(404).json({ error: 'token is missing or invalid' })
  }

  const { id: userId } = decodedToken
  req.userId = userId

  next()
}
