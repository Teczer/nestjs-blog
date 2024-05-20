import { Response, NextFunction } from 'express';

export function localData(req: any, res: Response, next: NextFunction) {
  console.log('req.session', req.session);
  res.locals.connected = req.session.connected;
  res.locals.user = req.session.user;

  next();
}
