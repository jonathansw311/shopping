class errorHandler extends Error{
    constructor(msg, status){
        super();//needed whenever extending a sublclass
        this.msg = msg;//gets message
        this.status = status;//gets status of server id 400, 404
        console.error(this.stack)

    }
}

module.exports=errorHandler