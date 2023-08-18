import { NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'


export const userExtractor = (req:Request , res:Response, next:NextFunction)  => {
  const authorization = req.get('authorization')

  
  let token = ''
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  
  const decodedToken = jwt.verify(token, process.env.JWT_WORD ?? '') as jwt.JwtPayload

    if (!token || !decodedToken?.id) {
      return res.status(401).json({ error: 'token is missing or invalid, errorHandle' })
    }
    
    const { id:userId } = decodedToken
    req.body.userId = userId 


  next()
  return
}
