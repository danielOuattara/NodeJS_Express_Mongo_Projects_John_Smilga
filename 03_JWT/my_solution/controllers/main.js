
// const jwt = require('jsonwebtoken');
// const { CustomAPIError, ServerError } = require('./../errors');

// //---------------------------------------------------------------------------
// const login = async (req, res) => {
//     const { username, password } = req.body;
//     /* validations : - mongoose - Joi - controller check */
//     if(!username || !password) {
//         throw new CustomAPIError('Please, provide username AND password', 400)
//     }

//     const id = new Date().getDate(); // development only !
//     const token = jwt.sign(
//         { id, username}, 
//         process.env.JWT_SECRET, 
//         {expiresIn: "1h"} 
//         ); 
//     return res.status(200).json({ msg:'User successfully logged in', token });
// }

// // -----------------------------------------------------------------------------------
// const dashboard = async (req, res) => {
//     try {
//         const luckyNumber = Math.floor(Math.random()* 100);
//         res.status(200).json({ msg: req.user.username, secret: luckyNumber });
//     } catch (error) {
//         throw new ServerError('Server Error, try again later !');
//     }
// }
// module.exports = { login, dashboard }

//========================================================================================

// Using specific class error ! 

const jwt = require('jsonwebtoken');
const { BadRequestError, ServerError } = require('./../errors');

//----------------------------------------------------------------------------
const login = async (req, res) => {
    const { username, password } = req.body;
    /* validations : - mongoose - Joi - controller check */
    if(!username || !password) {
        throw new BadRequestError('Please, provide username AND password');
    }

    const id = new Date().getDate(); // development only !
    const token = jwt.sign(
        { id, username}, 
        process.env.JWT_SECRET, 
        {expiresIn: "1h"} 
        ); 
    return res.status(200).json({ msg:'User successfully logged in', token });
}

// ---------------------------------------------------------------------------

const dashboard = async (req, res) => {
    try {
        const luckyNumber = Math.floor(Math.random()* 100);
        res.status(200).json({ msg: req.user.username, secret: luckyNumber });
    } catch (error) {
        throw new ServerError('Server Error, try again later !');
    }
}

module.exports = { login, dashboard }