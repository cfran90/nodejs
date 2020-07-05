import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import authConfig from "../../config/authConfig";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error: 'Token not porovided'});
    }
    const [, token] = authHeader.split(' ');
    console.log(token)
    console.log(authConfig.secret)
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        // guarda id do usuário na req
        req.userId = decoded.id;
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: 'Token invalid'});
    }

    // return next();
};