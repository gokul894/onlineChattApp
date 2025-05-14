


class ApiError extends Error {
    constructor (
        statusCode,
        message = "Something went wrong",
        errors = [], 
        stack = ""
    ) {

        super(message)

        this.statusCode = statusCode > 400
        this.message = message
        this.data = null
        this.isOperational = true
        this.errors = errors

        if(stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor);
        }

    }
};

export {ApiError};
