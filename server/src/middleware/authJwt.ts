import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

export const authenticateToken = (req: any, res: express.Response, next: express.NextFunction) => {
    const token = req?.headers?.authorization?.replace('Bearer ', '');
    if(!token) {
        return res.status(403).send({message: "No authorization token provided!"});
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user._id;
        next();
    } catch(err){
        res.status(401).send({ message: "API access unauthorized!" });
    }
}