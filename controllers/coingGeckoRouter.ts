import express, { Router } from 'express'
import { coinMarkets, lista } from '../utils/apiRequests'

const router: Router = express.Router()

router.get('/apiCoinGecko')

const data: { time: null | number; data: null | [] } = {
  time: null,
  data: null
}

const LIMIT_TIME = 1000 * 60 * 2

router.get('/marketPage', async (_req, res, next) => {
  const newTime = new Date().getTime()

  if (!data.data && !data.time) {
    try {
      const response = await coinMarkets()

      data.data = response
      data.time = new Date().getTime()
      res.send(data)
    } catch (error) {
      next(error)
    }
    return
  } else {
    if (data.time && newTime - data.time > LIMIT_TIME) {
      try {
        const response = await coinMarkets()

        data.data = response
        res.send(data)
      } catch (error) {
        next(error)
      }
      return
    } else {
      res.send(data.data)
    }
  }
})

router.get('/list', async (_req, res, next) => {
  try {
    const response = await lista(next)

    res.send(response)
  } catch (error) {
    console.log('entrado en next')

    next(error)
  }
})

export default router
