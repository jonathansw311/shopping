const express = require('express')
const errorHandler = require('./errorHandler.js')
const itemRoutes = require("./items.js")
const app = express();// required to run express
app.use(express.json())//so we can use json

app.use("/items", itemRoutes);//sets up routes under the /items route

app.get('/', function(req, res, next){   //root dir
    return res.send('Grocery List Hompage')
});
//top part of app above
///////////
//bottm part of app below


app.use(function(res,req){//bottom of page, incase route is not found
    throw new errorHandler('page not found', 404)
});

app.use((error, req, res, next)=>{//this goes just above the app listen at the end of file
  console.log(error.msg)
  return res.status(error.status).json({error: error})
})


app.listen(3000, function(){//app listener
    console.log('App on port 3000')
});

module.exports = app//exprts app so we can run it on server.js for supertest