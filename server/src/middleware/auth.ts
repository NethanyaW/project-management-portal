import { verify } from "jsonwebtoken";
import httpStatus from "http-status";


export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    if(!token) return res.status(httpStatus.UNAUTHORIZED).send();

    try {
        const decodedUser = verify(token, "thisIsSecret");
        req.user = decodedUser;

    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send();
    }

    return next();
}