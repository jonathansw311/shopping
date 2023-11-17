
//server moved to this file for supertest
const app = require("./app")

app.listen(3000, function(){
  console.log("Server starting on port 3000")
})