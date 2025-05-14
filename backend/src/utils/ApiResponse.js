

class ApiResponse {

    constructor(
        status, 
        data, 
        message
    ) {

        this.status = status < 400;
        this.data = data;
        this.message = message;
        
    }

};

export { ApiResponse };


