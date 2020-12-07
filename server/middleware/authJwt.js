const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.authenticateToken = (req, res, next) => {
    let token = req?.headers?.authorization?.replace('Bearer ', '');
    if(!token) {
        return res.status(403).send({message: "No authorization token provided!"});
    }

    try{
        let user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user._id;
        next();
    } catch(err){
        res.status(401).send({ message: "API access unauthorized!" });
    }
}