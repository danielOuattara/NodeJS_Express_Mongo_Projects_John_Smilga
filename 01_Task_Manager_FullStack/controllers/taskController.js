
// const Task = require ('./../models/task');


// //---------------------------------------------------------------------
// exports.getAllTasks = async (req, res) => {
//     try{
//         const tasks = await Task.find({}).sort({ createdAt: 1 })
//         res.status(200).send({tasks});
//     } catch(error){
//         res.status(500).json(err.message);
//     }
// }

// //---------------------------------------------------------------------
// exports.createTask = async (req, res) => {
//     try {
//         const { name, completed } = req.body;
//         const task = await Task.create({name, completed});
//         res.status(201).send({task});
//     } catch (error) {
//         res.status(400).json(error.message) ;
//     }
// }

// //---------------------------------------------------------------------
// // exports.getTask = async (req, res) => {
// //     try {
// //         const task = await Task.findOne({_id: req.params.id});
// //        if(!task) {
// //            return res.status(404).json('Task Not Found !')
// //        }
// //         return res.status(200).json(task)
// //     } catch (error) {
// //         return res.status(400).json(error.message) ;
// //     }
// // }

// exports.getTask = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id)
//         if(!task) {
//             return res.status(404).json('Task Not Found !')
//         }
//         return res.status(200).json({task});
//     } catch (error) {
//         return res.status(404).json(error.name) ;
//     }
// }
 
// //---------------------------------------------------------------------
// exports.patchTask = async (req, res) => {
//     try {
//         const task = await Task.findOneAndUpdate(req.params.id, req.body, {
//             new:true,
//             runValidators: true
//         });
//         if(!task) {
//             return res.status(404).json('Task Not Found !')
//         }
//         console.log("task = ", task)
//         return res.status(200).json({task});
//     } catch (error) {
//         return res.status(404).json(error.name) ;
//     }
// }

// //---------------------------------------------------------------------
// // exports.deleteTask = async (req, res) => {
// //     try {
// //         const task = await Task.findOneAndDelete({_id: req.params.id})
// //         if(!task) {
// //             return res.status(404).json('Task Not Found !')
// //         }
// //         const tasks = await Task.find({}).sort({ createdAt: 1 })
// //         res.status(200).send({tasks});

// //     } catch (error) {
// //         return res.status(500).json(error.message)
// //     }
// // }

// exports.deleteTask = async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete (req.params.id);
//         if(!task) {
//             return res.status(404).json('Task Not Found !');
//         }
//         return res.status(200).send();

//     } catch (error) {
//         return res.status(500).json(error.message)
//     }
// }



//=======================================================================


/*  asyncWrapper function to reduce repetition in controller function 
------------------------------------------------------------------------*/
const Task = require ('./../models/task');
const asyncWrapper = require('./../middlewares/asyncWrapper');
const { createCustomError }  = require('./../errors/customError');


//---------------------------------------------------------------------
exports.getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({}).sort({ createdAt: 1 })
        res.status(200).send({tasks});
        // res.status(500).json(err.message);
})

//---------------------------------------------------------------------
exports.createTask =  asyncWrapper(async (req, res) => {
        const { name, completed } = req.body;
        const task = await Task.create({name, completed});
        res.status(201).send({task});
        // res.status(400).json(error.message);
})

//---------------------------------------------------------------------

exports.getTask = asyncWrapper( async (req, res, next ) => {
        const task = await Task.findById(req.params.id)
        if(!task) {
            return next(createCustomError('Task Not Found !'))
        }
        return res.status(200).json({task});
        // return res.status(404).json(error.name) ;
})
 
//---------------------------------------------------------------------
exports.patchTask =  asyncWrapper( async (req, res) => {
        const task = await Task.findOneAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        });
        if(!task) {
            return next(createCustomError('Task Not Found !'))
        }
        console.log("task = ", task)
        return res.status(200).json({task});
        // return res.status(404).json(error.name) ;
})

//---------------------------------------------------------------------


exports.deleteTask = asyncWrapper( async (req, res) => {
        const task = await Task.findByIdAndDelete (req.params.id);
        if(!task) {
            return next(createCustomError('Task Not Found !'))
        }
        return res.status(200).send();
        // return res.status(500).json(error.message)
})

//---------------------------------------------------------------------