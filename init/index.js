const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

main().
then(()=>{
 console.log("connection sucsessfull");
}).catch((err)=>{
    console.log("Error in DB");
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WondorLust');
}

const initDB = async () =>{
   await listing.deleteMany({}); //delete existing data
   await listing.insertMany(initData.data);
   console.log("data was initialised");
}

initDB();