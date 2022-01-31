
const jwt = require('jsonwebtoken');
const { BadRequestAPIError, ServerError} = require('./../errors');


//---------------------------------------------------------------------------
const login = async (req, res) => {
    const { username, password } = req.body;
    /* validations : - mongoose - Joi - controller check */
    if(!username || !password) {
        throw new BadRequestAPIError('Please, provide username AND password')
    }

    const id = new Date().getDate(); // development only !
    const token = jwt.sign(
        { id, username}, 
        process.env.JWT_SECRET, 
        {expiresIn: "6y"} 
        ); 
        res.status(200).json({ msg:'User successfully logged in', token });
}

//---------------------------------------------------------------------------
const dashboard = async (req, res) => {
    try {
        const luckyNumber = Math.floor(Math.random()* 100);
        res.status(200).json({ msg: req.user.username, secret: luckyNumber });
    } catch (error) {
        throw new ServerError('Server Error, try again later !');
    }
}

module.exports = { login, dashboard }