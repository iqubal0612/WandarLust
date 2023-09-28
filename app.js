const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const { title } = require("process");
const  methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


main().
then(()=>{
 console.log("connection sucsessfull");
}).catch((err)=>{
    console.log("Error in DB");
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WondorLust');
}

app.get("/",(req,res)=>{
    res.send("Hi,I am Root");
})

// app.get("/testing", async (req,res)=>{
//     let samplelisting = new listing({
//         title : "My New Villa",
//         description : "By the Beach",
//         price : 1200,
//         location:"muzaffarpur , Bihar",
//         country : "India"
//     });

//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("succesfull testing");
// })


// Index Route
app.get("/listings",async (req,res)=>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs",{allListings});
   
})

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
 //Add Create Route in Index Route
app.post("/listings",(req,res)=>{
    let {title,description,image,price,location,country } = req.body;
    let lists = new listing(
        {
            title:title,
            description:description,
            image : image,
            price : price,
            location : location,
            coutry :country
        } 
    )
    lists.save()
    .then((res)=>console.log("saved successfully"));
    res.redirect("/listings");

})

// Show Route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listings = await listing.findById(id);
    res.render("listings/show.ejs",{listings});
})

//Edit Route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listings = await listing.findById(id);
    res.render("listings/edit.ejs",{listings});
})

// Update Route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let {title,description,image,price,location,country } = req.body;
    await listing.findByIdAndUpdate(id,{title,description,image,price,location,country});
    res.redirect("/listings");
})

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deleteList = await listing.findByIdAndDelete(id);

    res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("Server listening to port 8080");
})