import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import express from 'express';
import { User } from '../db/index';


const client = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID
)

const sendUserInfo = (res: express.Response, user) => {
    const {_id, name, email} = user;
    const token = jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '7d'})

    res.json({
        token,
        user: {_id, name, email}
    })
}

export const googleLogin = async (req: express.Request, res: express.Response) => {
    const { tokenId } = req.body;
    let response: any;
    try{
        response = await client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_OAUTH_CLIENT_ID});
    } catch(err){
        console.log(err);
        res.status(400).json({error: "Error verifying ID token"});
        return;
    }
    
    const {name, given_name, family_name, email, picture} = response.payload;

    try{
        const user = await User.findOne({email});
        if(user){
            sendUserInfo(res, user);
        } else{
            let newUser = new User({name, given_name, family_name, email, picture});
            newUser = await newUser.save();
            if(newUser){
                sendUserInfo(res, newUser);
            } else{
                throw new Error('Error saving new user');
            }
        }
    } catch (err){
        console.log(err);
        res.status(400).json({error: "Something went wrong..."});
    }
}