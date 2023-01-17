import { NextFunction, Request, Response } from "express";
import session from "express-session";


const SessionController = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: 'SomeSecret',
        resave: false,
        saveUninitialized: true
    })(req, res, next)
};

export default SessionController