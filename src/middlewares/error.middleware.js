import {StatusCodes} from 'http-status-codes';

export const errorHandlerMiddleware = (err, req, res,next)=>{
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong with the server"
    };

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
            .map((item)=>item.message).join(',');
    }
    if(err.code && err.code === 11000){
        customError.msg =`Duplicate Value entered for ${Object.keys(err.keyValue)} field, please choose another value!`;
        customError.statusCode = 400;
    }

    if(err.name == 'CastError'){
        customError.msg = `No item found with id :${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({msg: customError.msg});

};