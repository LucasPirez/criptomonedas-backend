import express, { Router } from 'express'
import Alert from '../models/alertsModel'
import {userExtractor} from '../middleware/userExtractor'

const router: Router = express.Router()
router.get('/alerts')

router.get('/', (_req,res) => {
  Alert.find({})
    .then((data: Object) => {
      res.json(data)
    })
    .catch((e: unknown) => {
      console.log(e)
    })
})

router.post('/create', userExtractor, async (req, res, next) => {
  const { crypto, min, max, time, userId } = req.body
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
   return res.send('Unexpected error occurred');
})

router.put('/edit', userExtractor, async (req, res, next) => {
  const { crypto, min ,max,time, userId } = req.body

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
   return res.send('Unexpected error occurred');
  
})

router.delete('/delete', userExtractor, async (req, res, next) => {
  const { crypto, userId } = req.body


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
   return res.send('Unexpected error occurred');

})

router.get('/', (_req, res, next) => {
  Alert.find({})
    .then((data:Object) => {
      res.json(data)
    })
    .catch((error:Error) => {
      next(error)
    })
})

export default router
