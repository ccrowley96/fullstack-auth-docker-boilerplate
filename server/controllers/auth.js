const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { User } = require('../db/index');

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
)

const sendUserInfo = (res, user) => {
    const {_id, name, email} = user;
    const token = jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '7d'})

    res.json({
        token,
        user: {_id, name, email}
    })
}

exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;

    let response = await client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID});
    let {name, given_name, family_name, email, picture} = response.payload;

    try{
        let user = await User.findOne({email});
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