const Alert = require('../models/alertsModel')
const router = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
router.get('/alerts')

router.post('/create', userExtractor, async (req, res, next) => {
  const { crypto, min, max, time } = req.body
  const { userId } = req

  try {
    const userAlert = await Alert.findOne({ userId })

    if (userAlert) {
      const isExist = await Alert.findOne({
        userId,
        'alerts.crypto': crypto
      })

      if (isExist) return res.send('ya existe una alerta para esa crypto')

      const responseAdd = await Alert.findOneAndUpdate(
        { userId },
        { $push: { alerts: { crypto, min, max, time } } },
        { new: true }
      )

      return res.send(responseAdd)
    } else {
      const newAlert = new Alert({
        userId,
        alerts: [{ crypto, min, max, time }]
      })
      const responseNewAlert = await newAlert.save()
      return res.send(responseNewAlert)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/edit', userExtractor, async (req, res, next) => {
  const { crypto } = req.body
  const { userId } = req

  try {
    const isExist = await Alert.findOne({ userId, 'alerts.crypto': crypto })

    if (isExist) {
      const responseEdit = await Alert.findOneAndUpdate(
        { userId, 'alerts.crypto': crypto },
        { $set: { 'alerts.$': { crypto, min, max, time } } },
        { new: true }
      )

      return res.send(responseEdit)
    } else {
      return res.send('no se encontro la alerta a modificar')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/delete', userExtractor, async (req, res, next) => {
  const { crypto } = req.body
  const { userId } = req

  try {
    const isExist = await Alert.findOne({ userId, 'alerts.crypto': crypto })

    if (!isExist) return res.send('No se encontro la crypto a eliminar')

    console.log(isExist)
    const responseDelete = await Alert.findOneAndUpdate(
      { userId, 'alerts.crypto': crypto },
      { $pull: { alerts: { crypto } } },
      { new: true }
    )

    res.send(responseDelete)
  } catch (error) {
    next(error)
  }
})

router.get('/', userExtractor, async (req, res, next) => {
  const { userId } = req

  try {
    const userAlerts = await Alert.findOne({ userId })
    if (userAlerts) {
      return res.json(userAlerts)
    } else {
      return res.send('Ninguna alerta encontrada')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
