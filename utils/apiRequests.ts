import { NextFunction } from 'express'

export async function coinMarkets() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
    )
    console.log('fet coinmarkets')

    if (!response.ok) {
      console.log('error apiRequest')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.log('error apiRequest insde catch')
  }
}

export async function lista(next: NextFunction) {
  console.log('listafetch')

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`)

    if (!response.ok) {
      const error = new Error('Error fetching data')
      error.name = 'DefaultError'
      error.message = 'Error fetching list data'
      throw error
    }

    return await response.json()
  } catch (error) {
    console.log('error apirequest ', error)

    next(error)
  }
}
