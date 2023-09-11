const express = require("express");
const router = express.Router();


router.post('/displayData', (req,res) =>{

    try {
       // console.log(global.food_items)
        res.send([global.food_items,global.categ_items])

    }
    catch(error){

        console.error(error.message);
        res.send("Server Error")

    }

})

module.exports = router;