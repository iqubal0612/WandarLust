const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
       type : String,
       required : true 
    },
    description:String,
    image : {
        type:String,
        default : "https://unsplash.com/photos/a-grassy-field-with-a-mountain-in-the-background-rys2HKa0DtA",
        set : (v)=> v === "" ? "https://unsplash.com/photos/a-grassy-field-with-a-mountain-in-the-background-rys2HKa0DtA" : v,
    },
    price : Number,
    location :String,
    country : String
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;
