const mongoose = require('mongoose')
require('dotenv').config()

const mongoDB = async() => {
   await mongoose.connect(process.env.DBURL, {useNewUrlParser:true}, async(err,result)=>{
       if(err) 
        console.log("---",err)
        
    else{
            console.log("Connected Succefully");
            const fetched_data = await mongoose.connection.db.collection("foodData");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err)
                    else{ 
                        global.food_items = data;
                        global.categ_items = catData;
                        
                    }
                })
                // if(err) console.log(err);                
                // else {
                //     global.food_items = data;
                //    // console.log(global.food_items)
                    
                // }

            })

        }
        
    });

}

module.exports = mongoDB;