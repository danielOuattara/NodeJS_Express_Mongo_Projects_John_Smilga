
const CustomAPIError = require('./../errors/custom-error');


const login = async (req, res) => {
    const { username, password } = req.body;
/* validations 
--------------
- mongoose
- Joi
- controller
    
*/
    if(!username || !password) {
        throw new CustomAPIError('Please, provide username AND password', 400)
    }


    res.json({
        info: 'Fake Login register/ sign up', 
        username,
        password
    });
}


const dashboard = async(req, res) => {
    const luckyNumber = Math.floor(Math.random()* 100);
    res.status(200).json({message: `Hello, John`, secret: luckyNumber});
}


module.exports = {
    login,
    dashboard
}