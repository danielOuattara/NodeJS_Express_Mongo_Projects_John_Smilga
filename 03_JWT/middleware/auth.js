// const jwt = require('jsonwebtoken');
// const CustomAPIError = require('./../errors/custom-error');


// const authenticationMiddleware =  async (req, res, next) => {    
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer')) {
//             throw new CustomAPIError('No Token Provided ! ', 401)
//         }
//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const { id, username } = decoded;
//         req.user = { id, username };
//         next()
//         } catch (error) {
//             throw new CustomAPIError('Non Authorized', 401);
//         }
//     }

// module.exports = authenticationMiddleware;


//------------------------------------------------------------------------
const jwt = require('jsonwebtoken');
// const UnauthenticatedError = require('./../errors/').Unauthenticated;
const { UnauthenticatedError } = require('./../errors');


const authenticationMiddleware =  async (req, res, next) => {    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthenticatedError('No Token Provided ! ')
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username }
        // req.decoded = decoded
        next()
        } catch (error) {
            throw new UnauthenticatedError('Unauthorized');
        }
    }

module.exports = authenticationMiddleware;