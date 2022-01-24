const mongoose = require('mongoose');

const connectParams=  { // not required on Mongoose v6
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}; 

exports.connectToDB = (url) => { 
    return mongoose.connect(url, connectParams);
}


// const connectToDB = (url) => { 
//     return mongoose.connect(url, connectParams);
// }

// module.exports = connectToDB;

