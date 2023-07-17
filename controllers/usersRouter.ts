import express, { Router } from 'express'
const router: Router = express.Router()
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// router.get("/login");

router.post('/signUp', async (req, res, next) => {
  const { email, completName, userAlias, password } = req.body

  if (!req.body) {
    return res.status(400).json({
      error: 'required "content" field is missing'
    })
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      UserNameComplete: completName,
      userAlias: userAlias,
      email: email,
      DateCreate: new Date(),
      password: passwordHash
    })

    const responseNewUser = await newUser.save()
    return res.json(responseNewUser)
  } catch (error) {
    return next(error)
  }
})

router.post('/singIn', async (req, res, next) => {
  const { userAlias, password } = req.body

  try {
    const user = await User.findOne({ userAlias })

    const passworCorrect =
      user === null ? false : await bcrypt.compare(password, user.password)

    if (!(user && passworCorrect)) {
      res.status(401).json({
        error: 'invalid user o password'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.userAlias
    }

    const token = jwt.sign(userForToken, process.env.JWT_WORD, {
      expiresIn: 60 * 60 * 24 * 7
    })

    return res.send({
      email: user.email,
      token
    })
  } catch (error) {
    return next(error)
  }
})

export default router
