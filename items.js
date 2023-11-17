const express = require("express")
const router = new express.Router()
const errorHandler = require("./errorHandler.js")
const items = require("./fakeDb")
router.use(express.json());
//this is the router route for the "ITEMS" route

//get route, gets all items in the fake DB
router.get('/', function(req, res, next){
   try{
    if(items.length ===0){
        throw new errorHandler('No items found', 404)
    }
    return res.status(201).json({items})//returns array of objects
}catch(e){
    next(e)
}
})

//gets only the items named from the fakeDb
router.get("/:name", function (req, res, next) {
    try{
    const foundItem = items.find(item => item.name === req.params.name)
    console.log(`found item is ${foundItem}`)
    if(foundItem === undefined){
      throw new errorHandler("Specific Item not found", 404)
    }
    res.status(201).json({ items: foundItem })
}catch(e){
    next(e)
}
  })


//puts a new item into the fake DB
router.post('/', function (req, res) {
    try{
    const newItem = req.body
    items.push(newItem)
    res.status(201).json({ items: newItem })
}catch(e){
    next(e)
}
  })

//renames the name of a item in the fake db
  router.patch("/:name", function (req, res, next) {
    try{
    const foundItem = items.find(item => item.name === req.params.name)//looks for the item to find in the URL
    if (foundItem === undefined) {
      throw new errorHandler("Item not found", 404)
    }
    foundItem.name = req.body.name //renames the name of the item in the fakeDb to the name that was passed in
    res.status(201).json({ items: foundItem})
}catch(e){
    next(e)
}
  })
  
  //deletes item in db by name passed in, by slicing it out of the array in the fake DB
  router.delete("/:name", function (req, res, next) {
    try{
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new errorHandler("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.status(201).json({ message: "Deleted" })
}catch(e){
    next(e)
}
  })
  
 



module.exports = router