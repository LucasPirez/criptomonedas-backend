import { Response } from 'express'

interface ErrorHandlers {
  [key: string]: (response: Response, error?: any) => void
}

export const error_handlers: ErrorHandlers = {
  CastError: (response) =>
    response.status(400).send({
      error: 'malformed'
    }),
  JsonWebTokenError: (response) =>
    response.status(401).json({ error: 'token missing or invalid' }),
  ValidationError: (response, error) =>
    response.status(409).json({
      error: error.message
    }),
  defaultError: (response) =>
    response.status(500).json({ error: 'default Error' })
}
